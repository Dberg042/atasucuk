#!/usr/bin/env python3
"""Deterministic smoke checks for Ata Sucuk v1/v2/v3 static variants."""
from __future__ import annotations

from html.parser import HTMLParser
from pathlib import Path
import re
import sys

ROOT = Path(__file__).resolve().parents[1]
LEAD_ENDPOINT = "https://mcp.gentic.co/api/leads/socialdock/666ab854-c5e2-4add-b1a2-adfdf4851070"
REQUIRED_COPY = [
    "Norges første",
    "autentiske",
    "lokalproduserte halal sucuk",
    "Tradisjonelt fermentert",
    "Ferske norske råvarer",
    "rettferdig pris",
    "Hvorfor betale overpris",
    "370 kr/kg",
    "Dagens marked",
    "Ata-metoden",
    "Kompromissløs kvalitet",
    "Langtidsfermentert",
    "Premium Norsk Kjøtt",
    "Autentisk Krydder",
    "Hjelp oss å bringe Ata Sucuk til live",
]
FORBIDDEN_CLAIMS = [
    "kundeuttalelse",
    "testimonial",
    "5 stjerner",
    "4.9",
    "10 000",
    "10000",
    "nedtelling",
    "countdown",
]
ALLOWED_EXTERNAL_PREFIXES = (
    "https://fonts.googleapis.com",
    "https://fonts.gstatic.com",
    LEAD_ENDPOINT,
)

class PageParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self.forms: list[dict[str, str]] = []
        self.inputs: list[dict[str, str]] = []
        self.links: list[dict[str, str]] = []
        self.scripts: list[dict[str, str]] = []
        self.images: list[dict[str, str]] = []
        self.stylesheets: list[str] = []
        self.svg_count = 0
        self.h1_count = 0
        self.title_text = ""
        self._in_title = False

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        data = {k: (v or "") for k, v in attrs}
        if tag == "form":
            self.forms.append(data)
        elif tag == "input":
            self.inputs.append(data)
        elif tag == "link":
            self.links.append(data)
            if data.get("rel") == "stylesheet" and data.get("href"):
                self.stylesheets.append(data["href"])
        elif tag == "script":
            self.scripts.append(data)
        elif tag == "img":
            self.images.append(data)
        elif tag == "svg":
            self.svg_count += 1
        elif tag == "h1":
            self.h1_count += 1
        elif tag == "title":
            self._in_title = True

    def handle_endtag(self, tag: str) -> None:
        if tag == "title":
            self._in_title = False

    def handle_data(self, data: str) -> None:
        if self._in_title:
            self.title_text += data

def local_url_exists(page_dir: Path, url: str) -> bool:
    if not url or url.startswith(("#", "mailto:", "tel:", "data:")):
        return True
    if url.startswith(("http://", "https://")):
        return url.startswith(ALLOWED_EXTERNAL_PREFIXES)
    clean = url.split("?", 1)[0].split("#", 1)[0]
    return (page_dir / clean).resolve().exists()

def css_urls(css: str) -> list[str]:
    return re.findall(r"url\((?:['\"])?([^)'\"]+)(?:['\"])?\)", css)

def check_variant(name: str) -> list[str]:
    errors: list[str] = []
    page_dir = ROOT / name
    html_path = page_dir / "index.html"
    css_path = page_dir / "styles.css"
    if not html_path.exists():
        return [f"{name}: missing index.html"]
    if not css_path.exists():
        errors.append(f"{name}: missing styles.css")

    html = html_path.read_text(encoding="utf-8")
    css = css_path.read_text(encoding="utf-8") if css_path.exists() else ""
    lower = html.lower()
    parser = PageParser()
    parser.feed(html)

    if "<html lang=\"no\"" not in lower and "<html lang='no'" not in lower:
        errors.append(f"{name}: html lang must be no")
    if "viewport" not in lower:
        errors.append(f"{name}: missing viewport meta")
    if "ata sucuk" not in parser.title_text.lower():
        errors.append(f"{name}: title should mention Ata Sucuk")
    if parser.h1_count != 1:
        errors.append(f"{name}: expected exactly one h1, found {parser.h1_count}")

    for snippet in REQUIRED_COPY:
        if snippet.lower() not in lower:
            errors.append(f"{name}: missing required copy snippet: {snippet}")
    for claim in FORBIDDEN_CLAIMS:
        if claim.lower() in lower:
            errors.append(f"{name}: forbidden/unverified claim appears: {claim}")

    if len(parser.forms) < 2:
        errors.append(f"{name}: expected at least two waitlist forms")
    for i, form in enumerate(parser.forms, 1):
        if form.get("action") != LEAD_ENDPOINT:
            errors.append(f"{name}: form {i} action changed")
        if form.get("method", "").lower() != "post":
            errors.append(f"{name}: form {i} should use POST")

    email_inputs = [x for x in parser.inputs if x.get("type") == "email"]
    if len(email_inputs) < 2:
        errors.append(f"{name}: expected at least two email inputs")
    for i, inp in enumerate(email_inputs, 1):
        if "required" not in inp:
            errors.append(f"{name}: email input {i} missing required")
        if inp.get("autocomplete") != "email":
            errors.append(f"{name}: email input {i} missing autocomplete=email")

    hidden_sources = [x.get("value", "") for x in parser.inputs if x.get("type") == "hidden" and x.get("name") == "source"]
    if not hidden_sources:
        errors.append(f"{name}: missing hidden source inputs")
    elif not all(src.startswith(f"{name}_") for src in hidden_sources):
        errors.append(f"{name}: hidden source values should start with {name}_")

    if parser.svg_count < 6:
        errors.append(f"{name}: expected several inline SVG icons, found {parser.svg_count}")
    if parser.scripts:
        errors.append(f"{name}: avoid scripts/CDNs; found {len(parser.scripts)} script tag(s)")
    if "cdn.tailwindcss.com" in lower or "unpkg.com" in lower or "lucide" in lower:
        errors.append(f"{name}: avoid Tailwind/Lucide/icon CDN references")
    if "prefers-reduced-motion" not in css:
        errors.append(f"{name}: CSS missing prefers-reduced-motion handling")
    if "@media" not in css:
        errors.append(f"{name}: CSS missing responsive media queries")
    if "cursor: pointer" not in css:
        errors.append(f"{name}: CSS should define pointer cursor for clickable controls")
    if ":focus-visible" not in css:
        errors.append(f"{name}: CSS missing visible focus states")

    for href in parser.stylesheets:
        if not local_url_exists(page_dir, href):
            errors.append(f"{name}: stylesheet href does not resolve or is not allowed: {href}")
    for img in parser.images:
        src = img.get("src", "")
        if not local_url_exists(page_dir, src):
            errors.append(f"{name}: image src does not resolve: {src}")
        if not img.get("alt"):
            errors.append(f"{name}: image missing alt: {src}")
    for url in css_urls(css):
        if not local_url_exists(page_dir, url):
            errors.append(f"{name}: CSS url() does not resolve: {url}")

    return errors

def main() -> int:
    all_errors: list[str] = []
    for name in ("v1", "v2", "v3"):
        errors = check_variant(name)
        if errors:
            all_errors.extend(errors)
        else:
            print(f"✅ {name}: smoke checks passed")
    if all_errors:
        print("\n❌ Variant verification failed:")
        for err in all_errors:
            print(f"- {err}")
        return 1
    print("\n✅ All Ata Sucuk variants passed deterministic smoke checks.")
    return 0

if __name__ == "__main__":
    sys.exit(main())
