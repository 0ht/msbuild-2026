#!/usr/bin/env bash
# fetch-transcript.sh — セッションの VTT 字幕を取得しプレーンテキストに変換
# Usage: ./fetch-transcript.sh SESSION_CODE
# Requires: .cache/sessions/{CODE}/meta.json が存在すること
set -euo pipefail

CODE="${1:?Usage: $0 SESSION_CODE}"
export CACHE_DIR=".cache/sessions/${CODE}"
META="${CACHE_DIR}/meta.json"

if [[ ! -f "$META" ]]; then
  echo "✗ ${META} が見つかりません。先に fetch-session-meta.sh を実行してください" >&2
  exit 1
fi

ON_DEMAND=$(python3 -c "import json, os; d=json.load(open(os.environ['CACHE_DIR']+'/meta.json')); print(d.get('onDemand',''))")

if [[ -z "$ON_DEMAND" ]]; then
  echo "✗ onDemand URL が meta.json にありません" >&2
  exit 1
fi

echo "→ VTT URL を抽出中..."
VTT_URL=$(curl -s "$ON_DEMAND" | python3 -c "
import sys, re, json
html = sys.stdin.read()
m = re.search(r'captionsConfiguration\s*=\s*(\{.*?\});', html, re.DOTALL)
if m:
    cfg = json.loads(m.group(1).replace('\\\\\\\\u0026','&').replace('\\\\u0026','&').replace('\\u0026','&'))
    for lang in cfg['languageList']:
        if lang['srclang'] == 'en':
            print(lang['src'].replace('\\\\u0026','&').replace('\\u0026','&'))
            break
")

if [[ -z "$VTT_URL" ]]; then
  echo "✗ VTT URL を抽出できませんでした" >&2
  exit 1
fi

echo "→ VTT ダウンロード中..."
curl -s "$VTT_URL" -o "${CACHE_DIR}/transcript.vtt"
echo "✓ transcript.vtt: $(wc -l < "${CACHE_DIR}/transcript.vtt") lines"

echo "→ プレーンテキストに変換中..."
python3 -c "
import re, os

cache_dir = os.environ['CACHE_DIR']

with open(f'{cache_dir}/transcript.vtt') as f:
    content = f.read()

lines = []
for line in content.split('\n'):
    line = line.strip()
    if not line or line.startswith('WEBVTT') or line.startswith('NOTE') or re.match(r'\d{2}:\d{2}:\d{2}\.\d{3}\s*-->', line):
        continue
    lines.append(line)

deduped = []
for line in lines:
    if not deduped or line != deduped[-1]:
        deduped.append(line)

text = ' '.join(deduped)
text = re.sub(r'  +', ' ', text)

with open(f'{cache_dir}/transcript.txt', 'w') as f:
    words = text.split()
    current = []
    char_count = 0
    for w in words:
        current.append(w)
        char_count += len(w) + 1
        if char_count > 500 and w.endswith(('.', '?', '!')):
            f.write(' '.join(current) + '\n\n')
            current = []
            char_count = 0
    if current:
        f.write(' '.join(current) + '\n')

size = os.path.getsize(f'{cache_dir}/transcript.txt')
line_count = sum(1 for _ in open(f'{cache_dir}/transcript.txt'))
print(f'✓ transcript.txt: {line_count} lines, {size // 1024}KB')
"
