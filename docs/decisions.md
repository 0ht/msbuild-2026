# 設計判断

このドキュメントは、プロジェクトの設計過程で行われた判断とその理由を記録する。

## アーキテクチャ

| 判断 | 選択 | 理由 |
|------|------|------|
| サイトスタック | VitePress | 内蔵検索（MiniSearch）あり、日本語対応良好、public/ でルートに静的ファイル配置可能 |
| コンテンツ管理 | Single Source → 変換パイプライン | 人間向け/AI 向け/skills を別管理するとドリフトする |
| VitePress 入力ディレクトリ | `site/`（`docs/` ではなく） | `docs/` はプロジェクト内部ドキュメント用と名前が被るため |
| スクリプト言語 | TypeScript (.mts) + tsx | frontmatter の型定義を共有できる。ビルド不要で即実行 |
| Node.js バージョン | 24 | `import.meta.dirname` 利用。.nvmrc + engines で固定 |

## コンテンツモデル

| 判断 | 選択 | 理由 |
|------|------|------|
| content_type | `announcement` / `session` / `resource` の 3 種 | `topic` は廃止（自動集約で十分） |
| topic 別・tag 別ページ | build-site が自動生成 | 手書きの俯瞰ページは MVP で不要。frontmatter + 自動集約に委ねる |
| アナウンス粒度 | 製品・サービス単位で 1 ファイル | 公式ブログの粒度は組織で異なるため、ハブ側で統一 |
| 対象範囲 | `news.microsoft.com/build-2026` 掲載リストを正とする | 際限なく広がるのを防止 |
| title の役割 | ID の人間用表示名（製品名のみ） | summary と役割を分離。hub 一覧では `title: summary` 形式で表示 |
| summary の役割 | 何が変わったかの直接記述 | 冗長な文脈（「Build 2026 アップデート」等）は排除 |
| frontmatter 必須項目 | 全項目必須（deliveries のみ省略可） | CI で早期検出。省略時のデフォルトは全 true |
| summary と本文の関係 | frontmatter 専属で本文と独立 | hub の一覧とページ本文で役割が異なるため |
| 画像/アセット | MVP ではなし | テキストとリンクのみで開始 |
| 記事間リンク | content/ 内の相対パス | 変換スクリプトがパスを解決 |

## メタデータ管理

| 判断 | 選択 | 理由 |
|------|------|------|
| topic 管理 | `topics.json`（スラッグ↔公式名） | 公式名がファイル名/URL に使えないため（例: "Agents & apps"） |
| tag 管理 | `tags.json`（スラッグ↔表示名＋aka） | "copilot" が GHCP か M365 Copilot か曖昧なため |
| URL ドメイン制限 | `allowed-domains.json` | unofficial な外部リンクの混入防止 |
| date フィールド | 廃止 | Build 2026 は 6/2-3 でほぼ同日。作成日・更新日は git で追跡 |
| importance フィールド | 廃止 | 表示順は date で十分。必要時に後から追加可能 |
| skill_triggers フィールド | 廃止 | SKILL.md は 1 つだけなので個別記事に不要 |

## 配信

| 判断 | 選択 | 理由 |
|------|------|------|
| Pages デプロイ | GitHub Actions artifact → deploy-pages | branch デプロイより安全 |
| llms.txt リンク形式 | 絶対 URL（`https://domain/path`） | llms.txt 仕様準拠 |
| llms.txt 粒度 | hub + content_type/id 別 detail | hub で探索、detail で深掘り |
| skills 配布方式 | リポジトリクローン（`/plugin install`） | Pages 非公開。git コミットでインストール時にビルド不要 |
| plugin.json | GitHub Copilot / Claude Code デュアルマニフェスト対応 | 両エコシステムに配布 |
| site/ と public/ の git 管理 | .gitignore（CI で毎回生成） | リポジトリサイズ削減。差分レビューは不要と判断 |
| skills/ の git 管理 | コミット | プラグインインストール時にビルド不要にするため |
| pre-commit hook | `.githooks/` + `core.hooksPath` | husky 等の追加依存なし。`npm install` の `prepare` で自動設定 |
| 本文深さバリデーション | announcement のみ CI 検査 | セクション存在・項目数・行数を決定論的に検証。session/resource は別テンプレートで対象外 |
| ナビ/サイドバー | build-site が nav.json を生成、config.ts が import | 手書き config とパイプライン生成を分離 |
| ライセンス | MIT（コード）+ CC-BY-4.0（コンテンツ） | コードの再利用性とコンテンツの帰属表示を両立 |

## 不採用にしたもの

| 候補 | 不採用理由 |
|------|-----------|
| Jekyll | 検索機能が弱い。日本語との相性が悪い |
| Astro + Starlight | VitePress で十分。追加の複雑さが不要 |
| `content/meta/` サブディレクトリ | ネストが深くなるだけ。content/ 直下にフラット配置で十分 |
| `content/topics/` 手書き | topic 別ページは自動集約で十分。手書きの俯瞰解説は MVP で不要 |
| session の完全自動同期 | カタログ API からの完全同期は粒度が合わない。シード + 手書き補足が現実的 |
| llms-ctx.txt / llms-ctx-full.txt | MVP では llms.txt 単体で開始。必要になったら追加 |
| 画像サポート | テキストとリンクで十分な情報密度が得られる |

## 参考にしたプロジェクト

| プロジェクト | 参考にした点 |
|------------|------------|
| vuejs/docs | VitePress の IA とナビ・サイドバー運用 |
| github/docs | llms.txt 生成運用、frontmatter 検証の発想 |
| GitHub の .github/skills 慣習 | SKILL.md メタの最小セット、name + description の役割 |
| llms.txt 仕様（llmstxt.org） | H1, blockquote, H2 セクション, リンク一覧の形式 |
| Build 2026 セッションカタログ | 公式 Topic 6 分類の採用 |
