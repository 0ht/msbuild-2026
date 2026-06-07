---
name: session-summary
description: 'Build 2026 セッションの一次素材（VTT字幕・スライド・メタデータ）を取得し、content/sessions/ 形式の Markdown を生成する。Use when: セッションまとめ、session summary、セッション追加、セッション作成、BRK/DEM/LTG/OD のコンテンツ化'
---

# セッションまとめスキル

Build 2026 セッションの一次素材を取得・キャッシュし、`content/sessions/{id}.md` を生成する再利用可能なワークフロー。

## When to Use

- 新しいセッションのコンテンツを作成するとき
- 既存セッションコンテンツをトランスクリプトで洗練するとき
- セッションの一次素材をローカルキャッシュに取得するとき

## 前提知識

- 調査方法論は `research` スキルに従う（ツール使い分け、ソース探索深さ、例外ハンドリング、バリデーション）
- `docs/content-guide.md` の session テンプレートに従う
- `AGENTS.md` のゴールデンルール（正確性 > 網羅性、ソース引用必須）を遵守
- `.cache/sessions/{SESSION-CODE}/` にローカルキャッシュを保存（gitignore 対象、コミットしない）

## Procedure

### Step 1: セッション特定とメタデータ取得

[fetch-session-meta スクリプト](./scripts/fetch-session-meta.sh) を使用:

```bash
.github/skills/session-summary/scripts/fetch-session-meta.sh "{検索キーワード}" {SESSION-CODE}
```

または手動で:
```bash
npx -y @microsoft/events-cli sessions --query "{検索キーワード}" --event build-2026 --json
```

確認すべきフィールド:
- `sessionCode` — ファイル ID に使用（小文字に変換）
- `title`, `description`, `speakers`, `level`, `type`, `topic`
- `onDemand` — 動画 URL（VTT 取得に使用）
- `slideDeck` — スライド URL

### Step 2: トランスクリプト取得

[fetch-transcript スクリプト](./scripts/fetch-transcript.sh) を使用:

```bash
.github/skills/session-summary/scripts/fetch-transcript.sh {SESSION-CODE}
```

これにより以下が `.cache/sessions/{CODE}/` に保存される:
- `transcript.vtt` — 英語字幕（VTT 原本）
- `transcript.txt` — プレーンテキスト変換（NOTE/タイムスタンプ除去、段落分割済み）

**キーノートの場合**: PDF トランスクリプトを使用:
```bash
curl -sL "{PDF URL}" -o .cache/sessions/{CODE}/transcript.pdf
pdftotext -layout .cache/sessions/{CODE}/transcript.pdf .cache/sessions/{CODE}/transcript.txt
```

### Step 3: スライドデッキ取得

**MUST**: `meta.json` の `slideDeck` が空でなければ**必ず取得する**。これは、スライドにはトランスクリプトにない情報が含まれるため。

#### ダウンロード

```bash
SLIDE_URL=$(curl -sI "{slideDeck URL}" | grep -i location | sed 's/location: //' | tr -d '\r\n')
curl -sL "$SLIDE_URL" -o .cache/sessions/{CODE}/slides.pptx
```

#### テキスト抽出

以下のいずれかの方法でスライドのテキストを抽出し、`.cache/sessions/{CODE}/slides.md` に保存する:

- **python-pptx**: `python3 -c "from pptx import Presentation; ..."` でスライドごとにテキスト抽出
- **markitdown**: `markitdown slides.pptx > slides.md`
- **unzip + grep**: `unzip -qc slides.pptx "ppt/slides/slide*.xml" | grep -oP '(?<=<a:t>).*?(?=</a:t>)'`

環境に応じて使えるツールを選ぶ。抽出後の `slides.md` はスライド番号付きで、ノイズ（`style.visibility` 等）を除去した読みやすい形にする。

### Step 4: コンテンツ生成

`.cache/sessions/{CODE}/transcript.txt` **と** `.cache/sessions/{CODE}/slides.md` の両方を読み、以下の構造で `content/sessions/{id}.md` を生成。トランスクリプトからはプレゼンの流れ・口頭補足・デモ手順を、スライドからは構造化データ（ステータス表、リンク、図のラベル）を取得し統合する。

**id 命名規則**: セッションコードをそのまま小文字にする（例: `BRK206` → `brk206`）

#### frontmatter

```yaml
---
id: {session-code-lowercase}
title: "{セッションタイトル}"
summary: {200-300文字。何が語られたか・何が学べるかを直接記述。1行文字列}
tags:
  - {content/tags.json に存在するスラッグ}
content_type: session
topic: {content/topics.json に存在するスラッグ}
official_sources:
  - https://build.microsoft.com/sessions/{CODE}
  - {関連する公式ブログ URL}
---
```

#### 本文構造

```markdown
## セッション情報

| 項目 | 値 |
|------|------|
| コード | {CODE} |
| タイプ | {type} |
| レベル | {level} |
| スピーカー | {speakers（役職付き）} |
| 日時 | {startDateTime} |
| 会場 | {location} |
| 録画 | [オンデマンド]({onDemand URL}) |
| スライド | [PPTX]({slideDeck URL}) |

## 概要

2-3 段落でセッションの要約。

## キーポイント

1. **要点**: 説明（ステータスラベル明記）
2. ...

## 詳細

プレゼンの進行順に ### で分割。スライド・デモ・口頭補足を統合し、
セッション視聴と同等の情報をこのセクションから得られることを目指す。

### セクションタイトル（スピーカー名）

内容。デモがあれば具体的手順を記載。

## 関連セッション
## 参考リンク
## 関連エントリ
```

### Step 5: コンテンツモデレーション

#### 相互リンク

- 関連する `content/announcements/` エントリがあれば「関連エントリ」にリンク
- 既存エントリ側への逆リンクは大幅変更を避ける

#### タグ追加の判断

セッションの主要テーマに対応するタグが `content/tags.json` に存在しない場合、タグの追加を検討する:

1. セッションの主題となる製品・サービスを特定する
2. `tags.json` の既存タグで吸収できないか確認する（`aka` フィールドでカバーされる場合は不要）
3. 吸収できない場合、`tags.json` に新規タグを追加する:
   - `slug`: kebab-case、Microsoft の正式製品名に準拠
   - `name`: 公式表記
   - `aka`: 略称・旧名称・サブプロダクト名を含める（例: `azure-devops` の aka に `azure-boards`, `azure-pipelines` 等）
4. 追加したタグをエントリの frontmatter に反映する

### Step 6: バリデーション

`npm run validate` を実行してエラー・警告を確認する。

バリデーションスクリプト（`scripts/lib/validate.mts`）が session に対して検査する内容:

- [ ] frontmatter チェック（タグ・トピック・ドメイン等） — **エラー**
- [ ] 必須セクション存在確認（`## セッション情報`、`## 概要`、`## キーポイント`、`## 詳細`、`## 参考リンク`） — **警告**
- [ ] 「参考リンク」の URL が生存しているか（2XX / 3XX レスポンス） — **警告**

## トランスクリプト読解のポイント

VTT 自動字幕は固有名詞の誤認識が多い:

| よくある誤認識 | 正しい表記 |
|---------------|-----------|
| Patrick Neglected | Patrick Nikoletich |
| get up copilot | GitHub Copilot |
| copy lot | Copilot |
| azure a I foundry | Azure AI Foundry |

- `meta.json` の `speakers` フィールドで正式名を確認
- 技術用語は公式ドキュメントの表記に合わせる
- 不確実な固有名詞は `content/tags.json` の `name` / `aka` で照合

## セッションタイプ別ガイダンス

| タイプ | 時間 | 詳細の深さ | 注意点 |
|--------|------|-----------|--------|
| Keynote | 2-3h | 流れと文脈に焦点。個別発表の詳細は announcements/ に委譲 | 複数スピーカー・ゲスト対談の口頭コメントがセッション固有の価値 |
| Breakout | 45min | 最も深い。デモのステップバイステップとコードパターンを記載 | メインの技術セッション |
| Demo | 25min | デモ中心。操作手順と「なぜ重要か」の両方 | 短いが密度が高い |
| Lightning Talk | 15min | キーポイント 3-5 個 + 短い概要で十分 | 詳細セクションは簡潔に |
| Pre-recorded (OD) | 可変 | Breakout と同じ深さ | オンライン限定セッション |
