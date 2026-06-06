---
id: azure-logic-apps
title: Azure Logic Apps
summary: Azure Logic Apps の Build 2026 更新として、MCP サーバー統合、A2A 標準準拠の会話型エージェント、マルチエージェンティックビジネスプロセス自動化の強化を発表。Logic Apps を MCP サーバーとして公開し、AI エージェントが1400以上のコネクタを活用した既存ワークフローを安全に呼び出せるエージェント基盤としてのシナリオが拡大。
tags:
  - azure-logic-apps
content_type: announcement
topic: cloud-platform-and-data
official_sources:
  - https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-logic-apps-at-build-2026-update/4524575
deliveries:
  site: true
  llms: true
  skills: true
---

## 概要

Azure Logic Apps は Build 2026 でエージェント統合とマルチエージェンティック自動化を中心に機能強化を発表した。MCP サーバーとしての Logic Apps 公開や、A2A（Agent-to-Agent）標準対応の会話型エージェントが主要なテーマである。

## 主な発表

- **MCP サーバーとしての Logic Apps**: AI エージェントから既存ワークフローを再利用（**Public Preview**）
- **A2A 標準準拠の会話型エージェント**: Agent-to-Agent プロトコルによるマルチエージェント連携
- **エージェントループの強化**: Logic Apps 内でのエージェントオーケストレーション改善

## 詳細

### MCP サーバー統合

Logic Apps（Standard）を MCP サーバーとして公開し、AI エージェントが既存の 1400 以上のコネクタを活用したエンタープライズワークフローを安全に呼び出せる。既存のワークフロー資産をそのままエージェントのツールとして再利用でき、API Management 経由でガバナンス（認証、レート制限、ポリシー適用）を適用可能。

### A2A 標準対応

Agent-to-Agent（A2A）プロトコルに準拠した会話型エージェントを Logic Apps 上で構築・ホスト可能。複数のエージェントが標準化されたプロトコルで連携し、それぞれが異なるビジネスドメイン（受注処理、在庫管理、顧客対応等）を担当するマルチエージェントシステムを構成できる。

### エージェンティックアーキテクチャにおける位置づけ

Azure のエージェンティックアーキテクチャでは、Logic Apps は AI Agent Service → API Management → Service Bus/Event Grid → Logic Apps → API Center → Entra ID のスタックにおいて、エンタープライズ統合レイヤーとして機能する。SaaS コネクタ（Office 365、Teams、SharePoint、Salesforce 等）を介してエージェントとエンタープライズシステムを橋渡しする。

## 応用シナリオ

- 既存の Logic Apps ワークフロー（承認フロー、データ連携等）を AI エージェントから MCP 経由でツールとして再利用
- 複数のエージェントが A2A 標準で連携し、受注→在庫確認→出荷手配のエンドツーエンドビジネスプロセスを自動化
- SaaS イベント（メール受信、Teams メッセージ等）をトリガーにエージェントワークフローを起動

## 関連エントリ

- [Azure Functions](azure-functions.md) — サーバーレスエージェントランタイムが同じ 1400+ コネクタを利用
- [Azure API Management](azure-api-management.md) — MCP サーバーのガバナンスと API Center での統合管理

## 参考リンク

- [What's new in Azure Logic Apps at Microsoft Build 2026](https://techcommunity.microsoft.com/blog/integrationsonazureblog/whats-new-in-azure-logic-apps-at-microsoft-build-2026/4524685)
- [Azure Logic Apps: Ushering in the Era of Multi-Agentic Business Process Automation](https://techcommunity.microsoft.com/blog/integrationsonazureblog/azure-logic-apps-ushering-in-the-era-of-multi-agentic-business-process-automa/4452275)
- [Azure Logic Apps ドキュメント](https://learn.microsoft.com/azure/logic-apps/)
