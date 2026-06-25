#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

if [ -f "$ROOT/.env.local" ]; then
  set -a
  # shellcheck disable=SC1091
  source "$ROOT/.env.local"
  set +a
fi

: "${FTP_HOST:?Set FTP_HOST in .env.local}"
: "${FTP_USER:?Set FTP_USER in .env.local}"
: "${FTP_PASS:?Set FTP_PASS in .env.local}"

FTP_REMOTE_DIR="${FTP_REMOTE_DIR:-/www/firecalc.ru}"
SITE_URL="${NEXT_PUBLIC_SITE_URL:-https://firecalc.ru}"
YM_ID="${NEXT_PUBLIC_YM_ID:-109655149}"

if ! command -v lftp >/dev/null 2>&1; then
  echo "lftp not found. Install: brew install lftp" >&2
  exit 1
fi

echo "→ Building (NEXT_PUBLIC_SITE_URL=$SITE_URL)..."
NEXT_PUBLIC_SITE_URL="$SITE_URL" NEXT_PUBLIC_YM_ID="$YM_ID" npm run build

echo "→ Uploading out/ to $FTP_HOST:$FTP_REMOTE_DIR via lftp..."
lftp -c "
set ftp:passive-mode true;
set net:max-retries 3;
set net:reconnect-interval-base 5;
set cmd:fail-exit yes;
set ssl:verify-certificate no;
open ftp://${FTP_USER}:${FTP_PASS}@${FTP_HOST};
cd ${FTP_REMOTE_DIR};
rm -rf _next;
mirror -R --delete --parallel=1 --no-perms --verbose '${ROOT}/out' .;
quit
"

echo "→ Verifying asset sizes on production..."
check_size() {
  local rel="$1"
  local local_size
  local_size=$(wc -c < "$ROOT/out/$rel" | tr -d ' ')
  local prod_size
  prod_size=$(curl -sI "$SITE_URL/$rel" | grep -i content-length | awk '{print $2}' | tr -d '\r')
  if [ "$local_size" = "$prod_size" ]; then
    echo "  OK  $rel ($local_size bytes)"
  else
    echo "  FAIL $rel local=$local_size prod=${prod_size:-?}" >&2
    return 1
  fi
}

check_size "_next/static/css/0db5d968f33a85cd.css"
check_size "_next/static/chunks/23-451a83d29e70c758.js"

echo "→ Done: $SITE_URL"
