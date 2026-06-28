#!/usr/bin/env bash
# Worker production secret'larını .env'den okuyup Cloudflare'e set eder.
# Kullanım:  bash scripts/set-prod-secrets.sh
# Gerekli:   .env dosyası (repo kökünde) + wrangler (api/ içinde kurulu)
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
ENV_FILE="$ROOT/.env"
[ -f "$ENV_FILE" ] || { echo ".env bulunamadı"; exit 1; }

# .env'den değer çek
val() { grep "^$1=" "$ENV_FILE" | head -1 | cut -d= -f2-; }

SECRETS=(SUPABASE_URL SUPABASE_SERVICE_ROLE_KEY TURNSTILE_SECRET_KEY RESEND_API_KEY MAIL_FROM CONFIRM_TOKEN_SECRET)

cd "$ROOT/api"
for name in "${SECRETS[@]}"; do
  v="$(val "$name")"
  if [ -z "$v" ]; then echo "ATLA: $name boş"; continue; fi
  echo "set: $name"
  printf '%s' "$v" | npx wrangler secret put "$name" --env production
done
echo "Tüm secret'lar set edildi (env: production)."
