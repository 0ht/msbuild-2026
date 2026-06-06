---
id: microsoft-foundry
title: Microsoft Foundry
summary: >-
  Agent Framework の GA、Hosted Agents、Toolboxes、メモリ、Foundry IQ など、
  エージェント開発・運用基盤の大幅強化。
tags:
  - azure-ai-foundry
  - agent-framework
content_type: announcement
topic: agents-and-apps
official_sources:
  - https://devblogs.microsoft.com/foundry/whats-new-in-microsoft-foundry-build-2026
deliveries:
  site: true
  llms: true
  skills: true
---

## 概要

Microsoft Foundry は、エージェントの開発からデプロイ・運用までをカバーするプラットフォームである。Build 2026 では、ランタイム、ツール連携、メモリ、ナレッジ、ガバナンスの各レイヤーに大幅なアップデートが加わった。

## 主な変更点

- **Microsoft Agent Framework**: エージェント・オーケストレーションの安定した構成要素を提供（**GA**）
- **Foundry Toolkit for VS Code**: エージェント開発用の VS Code 拡張（**GA**）
- **Hosted Agents**: サンドボックス付きのエージェントホスティング。ファイルシステムアクセスやフレームワーク柔軟性を備える（**GA 予定: 2026年7月**）
- **Toolboxes in Foundry**: エージェントが利用するツールの管理・公開基盤（**Public Preview**）
- **Voice Live**: リアルタイム音声パスの追加（**Public Preview**）
- **Memory in Foundry Agent Service**: 手続き型・ユーザー・セッションメモリの3種を提供（**Public Preview**）
- **Foundry IQ**: サーバーレス検索とナレッジ統合（**Public Preview**）

## 技術的詳細

Agent Framework は、複数の AI フレームワーク（Semantic Kernel、LangChain、AutoGen 等）と統合可能な抽象レイヤーとして機能する。Hosted Agents はサンドボックス環境でコード実行を安全に行い、Toolboxes は MCP 準拠のツール登録・発見メカニズムを提供する。

Foundry IQ はベクトル検索とグラフベースのナレッジを統合し、エージェントに構造化されたコンテキストを供給する。

## 応用シナリオ

- 社内ナレッジベースと連携したカスタマーサポートエージェントの構築（Foundry IQ + Memory）
- 複数の外部 API をツールとして登録し、タスク自動化エージェントを公開（Toolboxes + Teams 連携）
- ローカル環境でのエージェント開発・テスト（Foundry Toolkit for VS Code + Foundry Local）

## 参考リンク

- [What's new in Microsoft Foundry | Build Edition](https://devblogs.microsoft.com/foundry/whats-new-in-microsoft-foundry-build-2026)
