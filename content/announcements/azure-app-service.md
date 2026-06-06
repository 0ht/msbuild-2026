---
id: azure-app-service
title: Azure App Service
summary: Azure App Service の Build 2026 更新として、エージェンティックワークロード対応の強化、Easy Auth によるエージェント認証の簡素化、パフォーマンス改善を含む複数の機能更新を発表。AI エージェントのホスティング基盤としての App Service の位置づけを強化する。
tags:
  - azure-app-service
content_type: announcement
topic: cloud-platform-and-data
official_sources:
  - https://techcommunity.microsoft.com/blog/appsonazureblog/whats-new-in-azure-app-service-at-msbuild-2026/4524078
deliveries:
  site: true
  llms: true
  skills: true
---

## 概要

Azure App Service は Build 2026 で、エージェンティックワークロードのホスティング基盤としての機能を大幅に強化した。MCP サーバーのホスティングと認証が主要テーマであり、Easy Auth（App Service Authentication）が MCP 認可仕様に準拠し、リモート MCP サーバーの認証をワンクリックで構成できるようになった。

.NET、Python、Node.js の各言語向けに MCP サーバーサンプルが提供され、SSE から Streamable HTTP への移行、OAuth 2.1 + Microsoft Entra ID による認証フローが標準化された。

## 主な発表

- **MCP サーバー認証の Easy Auth 統合**: App Service Authentication が MCP 認可仕様に準拠。Protected Resource Metadata（PRM）の自動公開、401 チャレンジの実装（**GA**）
- **MCP サーバーホスティングサンプル**: .NET、Python、Node.js 向けの Streamable HTTP 対応サンプル提供
- **エージェンティックワークロード対応**: AI エージェントのホスティング基盤としてのパフォーマンス・セキュリティ強化

## 詳細

### MCP サーバーの Easy Auth 統合

App Service Authentication は MCP 認可仕様の要件を実装し、MCP クライアントからのトークン検証と認可ポリシーの適用を MCP 初期化リクエストの前に実行する。Microsoft Entra ID プロバイダーを使用した場合、`WEBSITE_AUTH_PRM_DEFAULT_WITH_SCOPES` アプリケーション設定でスコープを構成する。セキュリティ上、MCP サーバー認可用のトークンをダウンストリームリソースにパススルーすることは禁止されており、On-Behalf-Of フロー等で別トークンを取得する必要がある。

### Streamable HTTP 対応

従来の SSE（Server-Sent Events）は MCP 仕様で非推奨となり、Streamable HTTP に移行。App Service 上の MCP サーバーサンプルはすべて Streamable HTTP に更新され、プラットフォーム間の互換性とパフォーマンスが向上した。Azure Developer CLI（azd）テンプレートにより数分でデプロイ可能。

### エージェンティックアーキテクチャにおける位置づけ

Azure のエージェンティックアーキテクチャでは、App Service はアプリケーションレイヤーのホスティングを担う。AI Agent Service → API Management → Service Bus/Event Grid → Logic Apps → API Center → Entra ID のスタックにおいて、App Service は MCP サーバーやエージェント駆動アプリの実行環境として機能する。

## 応用シナリオ

- 既存の Web アプリに MCP サーバーエンドポイントを追加し、AI エージェントからのツール呼び出しを Easy Auth で認証
- Streamable HTTP 対応の MCP サーバーを App Service にデプロイし、Azure API Management 経由でガバナンスを適用
- エージェント駆動のカスタマーサポートアプリを App Service でホストし、Foundry Agent Service と連携

## 参考リンク

- [What's new in Azure App Service at MSBuild 2026](https://techcommunity.microsoft.com/blog/appsonazureblog/whats-new-in-azure-app-service-at-msbuild-2026/4524078)
- [Configure MCP server authorization - Azure App Service](https://learn.microsoft.com/azure/app-service/configure-authentication-mcp)
- [Host Remote MCP Servers on App Service: Updated samples](https://techcommunity.microsoft.com/blog/appsonazureblog/host-remote-mcp-servers-on-app-service-updated-samples-now-with-new-languages-an/4420607)
- [Azure App Service ドキュメント](https://learn.microsoft.com/azure/app-service/)
