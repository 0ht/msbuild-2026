# Azure API Management

Azure API Management の Build 2026 更新として、エージェンティック API 管理、API スキルの自動品質評価、AI ゲートウェイ機能の強化を発表。エージェントが利用する API・スキルのガバナンスとディスカバリーを統合し、エンタープライズ API エコシステムのエージェンティック時代への対応を推進する。

## 概要

Azure API Management は Build 2026 で、従来の API ゲートウェイからエージェンティック AI 時代の統合ガバナンスプラットフォームへの進化を打ち出した。API だけでなく、エージェント、MCP ツール、プロンプト、スキルといった AI アセット全体のディスカバリー・ガバナンス・品質評価を統合管理する方向性を明確にした。

AI Gateway 機能の拡張により、エージェント間通信（A2A）のガバナンスとコンテンツセーフティ制御が GA に到達し、Azure API Center は MCP サーバーのエンタープライズディスカバリーエンドポイントとして機能する。

## 主な発表

- **Azure API Center GA 拡張**: API・エージェント・MCP ツール・スキルの統合ディスカバリーとガバナンス（**GA**）
- **API Center データプレーン MCP サーバー**: エージェントや開発ツールから単一の MCP 接続で API・MCP サーバー・AI アセットを発見（**GA**）
- **Agent-to-Agent API とコンテンツセーフティ制御**: エージェント間通信のガバナンスとプロンプトインジェクション防御（**GA**）
- **API スキルの自動品質評価**: 登録されたスキルの品質を自動評価（**Public Preview**）
- **AI Gateway の Microsoft Foundry 統合**: Foundry 環境内から AI モデル・エージェント・ツールのガバナンスを実行

## 詳細

### Azure API Center の拡張

API Center は API だけでなく、エージェント、MCP ツール、プロンプト、スキルといった AI アセットのレジストリとして拡張された。各アセットにはオーナーシップ、ソースリポジトリ、許可されるツールスコープが定義され、Git リポジトリからの GitOps 同期による自動登録もサポートする。データプレーン MCP サーバーにより、エージェントや開発ツールは単一の MCP 接続で登録済みの全アセットにアクセスできる。

### AI Gateway とエージェントガバナンス

AI Gateway はトークンベースのレート制限、セマンティックキャッシュ、サーキットブレーカー、マルチモデルルーティングを提供する。Build 2026 では Agent-to-Agent（A2A）通信のガバナンスが GA に到達し、従来 API ガバナンスの境界外にあったエージェント間のやり取りを可視化・制御できるようになった。コンテンツセーフティ制御によるプロンプトインジェクション検出も統合されている。

### MCP サーバー管理

REST API を MCP サーバーとして公開する機能と、既存の MCP サーバー（LangChain、Azure Functions、Logic Apps 等）をプロキシ経由で公開する機能を提供。認証・レート制限・ポリシー適用を API Management の標準機能で実現する。Microsoft Foundry との統合により、Foundry 環境から直接 AI Gateway のガバナンスを適用できる。

## 応用シナリオ

- エンタープライズ全体の API・MCP ツール・エージェントを API Center に一元登録し、開発者が単一のエンドポイントから検索・利用
- エージェント間通信を AI Gateway 経由でガバナンスし、プロンプトインジェクション防御とコンテンツセーフティを自動適用
- 既存の REST API を MCP サーバーとして公開し、AI エージェントからのツール利用を認証付きで提供

## 制約・注意点

- API スキルの自動品質評価は **Public Preview**
- MCP サーバー機能はワークスペース内での利用には未対応
- AI Gateway の新機能は AI Gateway リリースチャネル経由で早期アクセス可能

## 公式ソース

- [https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-at-build-2026-update/4524577](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-api-management-at-build-2026-update/4524577)
