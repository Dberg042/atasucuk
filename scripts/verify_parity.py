#!/usr/bin/env python3
"""Ata Sucuk parity smoke-check.

Starts from an already-served local URL (default http://127.0.0.1:8099/) and
captures mobile/desktop screenshots plus computed acceptance metrics.

Usage:
  python3 -m http.server 8099
  python3 scripts/verify_parity.py
"""
from __future__ import annotations

import json
import sys
from pathlib import Path
from typing import cast

from playwright.sync_api import sync_playwright
from playwright._impl._api_structures import ViewportSize

URL = sys.argv[1] if len(sys.argv) > 1 else "http://127.0.0.1:8099/"
OUT = Path("audit-artifacts")
OUT.mkdir(exist_ok=True)

with sync_playwright() as p:
    browser = p.chromium.launch()
    results = {}
    for name, vp in [("mobile", {"width": 390, "height": 844}), ("desktop", {"width": 1280, "height": 720})]:
        page = browser.new_page(viewport=cast(ViewportSize, vp), device_scale_factor=2)
        messages: list[str] = []
        page.on("console", lambda msg: messages.append(f"{msg.type}: {msg.text}"))
        page.on("pageerror", lambda err: messages.append(f"pageerror: {err}"))
        page.goto(URL, wait_until="networkidle")
        page.screenshot(path=str(OUT / f"clone-{name}-after-eli.png"), full_page=True)
        data = page.evaluate(
            """() => {
              const cs = (e, p) => getComputedStyle(e)[p];
              const h1 = document.querySelector('h1');
              const mid = document.querySelector('.showcase img, img');
              const cta = document.querySelector('.cta');
              const quality = document.querySelector('.quality');
              return {
                bodyHeight: Math.round(document.body.getBoundingClientRect().height),
                bodyBg: cs(document.body, 'backgroundColor'),
                bodyFont: cs(document.body, 'fontFamily'),
                h1: {size: cs(h1, 'fontSize'), line: cs(h1, 'lineHeight'), font: cs(h1, 'fontFamily'), align: cs(h1, 'textAlign')},
                middleImg: mid ? {w: Math.round(mid.getBoundingClientRect().width), h: Math.round(mid.getBoundingClientRect().height), src: mid.getAttribute('src')} : null,
                ctaBg: cta ? cs(cta, 'backgroundColor') : null,
                qualityBg: quality ? cs(quality, 'backgroundColor') : null,
                forms: [...document.querySelectorAll('form')].map(f => ({
                  action: f.action, method: f.method,
                  inputs: [...f.querySelectorAll('input')].map(i => ({type: i.type, name: i.name, value: i.value, placeholder: i.placeholder, required: i.required}))
                })),
                iconCount: document.querySelectorAll('svg').length,
              }
            }"""
        )
        data["console"] = messages
        results[name] = data
        page.close()
    browser.close()

(OUT / "computed-clone-after-eli.json").write_text(json.dumps(results, indent=2), encoding="utf-8")
print(json.dumps(results, indent=2))

checks = [
    ("mobile body height", abs(results["mobile"]["bodyHeight"] - 5039) <= 250, results["mobile"]["bodyHeight"]),
    ("desktop body height", abs(results["desktop"]["bodyHeight"] - 3523) <= 150, results["desktop"]["bodyHeight"]),
    ("mobile h1 48px", results["mobile"]["h1"]["size"] == "48px", results["mobile"]["h1"]),
    ("desktop h1 72px", results["desktop"]["h1"]["size"] == "72px", results["desktop"]["h1"]),
    ("mobile middle 342x400", results["mobile"]["middleImg"]["w"] == 342 and results["mobile"]["middleImg"]["h"] == 400, results["mobile"]["middleImg"]),
    ("no console messages", not results["mobile"]["console"] and not results["desktop"]["console"], (results["mobile"]["console"], results["desktop"]["console"])),
]
failed = False
for label, ok, detail in checks:
    print(("PASS" if ok else "FAIL"), label, detail)
    failed = failed or not ok
sys.exit(1 if failed else 0)
