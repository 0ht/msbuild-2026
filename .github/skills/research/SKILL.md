---
name: research
description: 'Build 2026 コンテンツの調査方法論。ツールの使い分け、ソース探索の深さ基準、例外ハンドリング、バリデーションチェックリスト。Use when: 調査、リサーチ、ソース探索、ファクト検証、investigate、research'
---

# 調査スキル（共通基盤）

Build 2026 ナレッジベースのすべてのコンテンツ作成・更新に共通する調査方法論。

**最重要原則: 正確性 > 網羅性。** 検証できない事実は書かない。

## When to Use

- announcement / session / resource のいずれかを新規作成するとき
- 既存エントリを再調査・更新するとき
- ファクトの検証が必要なとき

## 準備（毎回の作業開始前に確認）

1. `docs/content-guide.md` — frontmatter 仕様、テンプレート、ソース階層、品質基準、引用・文体ルール
2. `content/tags.json` — 使用可能なタグスラッグ
3. `content/topics.json` — 使用可能なトピックスラッグ
4. `content/allowed-domains.json` — `official_sources` に記載可能なドメイン
5. `content/` 配下の既存エントリ — 重複チェックと相互参照

## 調査ツールの優先順位

| 優先度 | ツール | 用途 |
|--------|--------|------|
| 1 | `microsoft_docs_search` / `microsoft_docs_fetch` | Microsoft Learn のドキュメント、What's New、リリースノート。**最初にここを探す** |
| 2 | `tavily_search` / `tavily_extract` | Microsoft Learn 以外の発見と全文取得。Build サイト、公式ブログ、プレスカバレッジ |
| 3 | `web_fetch` | URL が既知の場合のみ使用。発見ツールではない |
| 4 | `msevents` CLI | セッションカタログ検索: `npx -y @microsoft/events-cli sessions --query "..." --event build-2026 --json` |
| 5 | リポジトリ検索 | 新規追加前の重複確認。既存エントリとの相互参照 |

**注意**: LLM 生成のサマリー、AI アンサーボックス、未検証の SNS 投稿はエビデンスとして扱わない。ソースの手がかりとして使い、一次ソースを開いて読むこと。

## ソース探索の深さ基準

各エントリについて以下の **8 カテゴリすべて** を探索する。見つからないカテゴリはスキップしてよいが、探索自体を省略してはならない。

| カテゴリ | 探索方法 | `official_sources` 対象 |
|----------|----------|------------------------|
| Build ニュースハブ | `news.microsoft.com/build-2026/` とライブブログ。スコープの正として最初に参照 | Yes |
| 公式ブログ記事 | `tavily_search` で github.blog, devblogs, techcommunity を検索 | Yes |
| Microsoft Learn ドキュメント | `microsoft_docs_search` で製品名を検索。What's New、概要、クイックスタート | Yes |
| Build セッション | `msevents` CLI で製品名を検索。ブログ記事内のセッションコードから逆引き | Yes |
| GitHub リポジトリ | `tavily_search` で `github.com {製品名}` を検索。SDK、サンプル | Yes（Microsoft/GitHub などの所有 org のみ） |
| YouTube / セッション動画 | `tavily_search` で `{製品名} Build 2026 site:youtube.com` | No（参考リンクのみ） |
| API リファレンス / SDK ドキュメント | `microsoft_docs_search` で `{製品名} API` | Yes |
| Changelog / リリースノート | `tavily_search` で `{製品名} changelog OR release notes` | Yes |

## 例外ハンドリング

| 状況 | 対処 |
|------|------|
| `web_fetch` が空 / JS のみ / ログイン壁 | `tavily_extract`（`extract_depth: "advanced"`）→ `microsoft_docs_fetch` → ロケール除去で再試行 |
| `aka.ms` 短縮リンク | リダイレクト先の正規 URL を解決して引用。解決できなければ未検証扱い |
| 検索結果なし / 矛盾 | 引用符囲みで再クエリ。英語↔日本語で交差検索。見つからなければ未検証の旨を記載 |
| ソース間で矛盾 | 最新の、最も製品固有のブログを優先。矛盾が重要なら本文に注記 |
| レート制限 / ネットワークエラー | 待ってリトライ。スニペット要約で代替しない |
| 合理的努力で検証不能 | 止める。検証済みフィールドのみ記載し、未解決の疑問を本文に残す |

## セルフバリデーション（共通チェックリスト）

- [ ] `tags` が `content/tags.json` に存在する
- [ ] `topic` が `content/topics.json` に存在する
- [ ] `official_sources` が `content/allowed-domains.json` のドメインに属する
- [ ] `official_sources` がすべて一次ソース（二次・三次が混入していない）
- [ ] `id` がファイル名と一致し kebab-case
- [ ] `summary` が 200-300 文字の 1 行文字列
- [ ] ステータスラベル（GA / Preview 等）が一次ソースの記述と一致
- [ ] 参考リンクが 3 件以上
- [ ] 既存エントリとの重複がない
- [ ] `npm run validate` でエラーなし

## 再調査ポリシー

ゼロから書き直さず、差分更新する。

**トリガー**: 一次ソース更新、ステージ変更（Preview→GA）、リネーム、価格変更、読者指摘

**方法**:
1. `official_sources` の URL を再度開き同じ主張が維持されるか確認
2. 新しい一次ソースを検索
3. 差分のみ更新。正確な記述はそのまま
4. 重要な変更は本文に注記（例: 「YYYY-MM-DD に GA 到達」）

**禁止**: 履歴を黙って書き換えない。小さなフォローアップを新規エントリにしない。

## 調査チェックリスト

エントリごとに以下を確認:

- **何が** — 正式名称と一文の要約
- **ステータス** — Preview / GA / 非推奨（ソースの記述と一致させる）
- **誰/何に影響** — 対象製品、SDK、リージョン、ユーザー層
- **詳細情報** — 公式ドキュメント、リリースノート、セッション録画
- **分類** — 適切な `content_type`、`topic`、`tags`

一次ソースから回答できないフィールドは空のままにする。

## 探索方針

- **一次ハブから始める**: セッションカタログと公式アナウンスページから製品ブログ・ドキュメントへ展開
- **ソースチェーンを内側に辿る**: 二次メディア → 一次ブログ → 公式ドキュメント。一次ソース到達で停止
- **深さより広さを先に**: 主要アナウンスの短い確認済みエントリを先に揃え、深掘りは後
- **タイムボックス**: 一次ソースで検証できなければ未検証を記載して次へ
- **相互参照**: 既存エントリを検索し、関連があればクロスリファレンス
