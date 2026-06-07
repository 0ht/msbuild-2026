#!/usr/bin/env bash
# fetch-session-meta.sh — セッションメタデータを取得して .cache に保存
# Usage: ./fetch-session-meta.sh "検索キーワード" SESSION_CODE
set -euo pipefail

QUERY="${1:?Usage: $0 QUERY SESSION_CODE}"
CODE="${2:?Usage: $0 QUERY SESSION_CODE}"
CACHE_DIR=".cache/sessions/${CODE}"

mkdir -p "$CACHE_DIR"

npx -y @microsoft/events-cli sessions --query "$QUERY" --event build-2026 --json 2>/dev/null | \
  python3 -c "
import json, sys, os
code = os.environ['CODE']
cache_dir = os.environ['CACHE_DIR']
data = json.load(sys.stdin)
for s in data:
    if s['sessionCode'] == code:
        with open(f'{cache_dir}/meta.json', 'w') as f:
            json.dump(s, f, indent=2)
        print(f'✓ {code} meta.json saved to {cache_dir}/')
        print(f'  title: {s[\"title\"]}')
        print(f'  speakers: {s[\"speakers\"]}')
        print(f'  type: {s[\"type\"]}')
        print(f'  onDemand: {bool(s.get(\"onDemand\"))}')
        print(f'  slideDeck: {bool(s.get(\"slideDeck\"))}')
        sys.exit(0)
print(f'✗ {code} not found in results', file=sys.stderr)
sys.exit(1)
"
