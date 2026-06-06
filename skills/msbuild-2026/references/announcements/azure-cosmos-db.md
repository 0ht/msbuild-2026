# Azure Cosmos DB

Azure Cosmos DB の Build 2026 更新として、MCP Toolkit、セマンティック再ランキング（Public Preview）、グローバルセカンダリインデックス、Backup サポート、エージェンティック検索/メモリツールキットを発表。エージェント向けのデータアクセスと検索基盤を強化。

## 概要

Azure Cosmos DB は Build 2026 でエージェンティック AI ワークロード向けの機能を中心に複数の更新を発表した。MCP Toolkit によるエージェントからのデータアクセス、セマンティック再ランキングによる検索品質向上、Agent Memory Toolkit によるエージェントメモリの永続化が主要な柱である。

## 主な発表

- **Azure Cosmos DB MCP Toolkit**: エージェントから Cosmos DB にアクセスするための MCP 準拠ツール
- **セマンティック再ランキング**: AI ベースの検索結果再ランキング（**Public Preview**）
- **グローバルセカンダリインデックス**: グローバル分散での二次インデックス
- **Azure Backup サポート**: Cosmos DB のバックアップ（**Public Preview**）
- **Agent Memory Toolkit**: エージェントの永続的メモリパターンを Cosmos DB 上に実装（**Public Preview**）
- **Agent Kit**: 100+ のルールによる AI コーディングアシスタント向けスキル（**GA**）
- **Linux Emulator**: ローカル開発用エミュレータ

## 詳細

### MCP Toolkit

Azure Cosmos DB MCP Toolkit はエージェントから Cosmos DB にアクセスするための MCP 準拠ツールキット。エージェントが自然言語でデータベースにクエリを発行し、リアルタイムで結果を取得できる。GitHub リポジトリとしてオープンソースで提供され、コミュニティ貢献を受け付ける。

### セマンティック再ランキング

ベクトル検索の結果を AI モデルで再ランキングし、クエリの意図により適合した順序で返す。RAG（Retrieval-Augmented Generation）パイプラインにおいて、検索段階の精度を向上させることで、LLM への入力コンテキストの質を改善する。初期取得は高速なベクトル検索で行い、上位結果のみを再ランキングする二段階方式。

### Agent Memory Toolkit

エージェントの永続的メモリパターンを Cosmos DB 上に実装するツールキット。3 種類のメモリパターンを提供する:

- **セッションメモリ**: 単一セッション内の会話コンテキスト
- **ユーザーメモリ**: セッション間で持続するユーザー固有の情報
- **手続き型メモリ**: エージェントが学習した手順やルール

## 応用シナリオ

- AI エージェントが MCP 経由で Cosmos DB のデータにアクセスし、リアルタイムで推論
- セマンティック再ランキングによる RAG パイプラインの検索品質向上
- Agent Memory Toolkit によるエージェントの永続的メモリ実装
- Agent Kit による AI コーディングアシスタントでの Cosmos DB ベストプラクティスの自動適用

## 公式ソース

- [https://devblogs.microsoft.com/cosmosdb/announced-at-ms-build-2026-azure-cosmos-db-mcp-toolkit-semantic-reranking-global-secondary-indexes-and-more](https://devblogs.microsoft.com/cosmosdb/announced-at-ms-build-2026-azure-cosmos-db-mcp-toolkit-semantic-reranking-global-secondary-indexes-and-more)
