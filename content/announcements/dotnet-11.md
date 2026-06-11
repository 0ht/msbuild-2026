---
id: dotnet-11
title: .NET 11
summary: .NET 11 Preview で C# に union types を導入し、ワイヤプロトコルやドメインモデリングの閉じたデータ形状を型安全にモデル化可能にした。AI Building Blocks、ASP.NET Core のエージェンティック Web 対応、.NET MAUI でのエッジ AI、新インストーラ dotnetup を発表。ランタイム・ライブラリ・SDK 全体で AI 時代のインテリジェントアプリ開発に最適化。
tags:
  - dotnet
content_type: announcement
topic: developer-tools-and-frameworks
official_sources:
  - https://devblogs.microsoft.com/dotnet/dotnet-at-microsoft-build-2026/
  - https://dotnet.microsoft.com/download/dotnet/11.0
---

## 概要

.NET 11 は AI 時代に向けたメジャーリリースであり、Build 2026 で Preview として公開された。言語レベルでは C# に待望の union types が追加され、フレームワーク全体でエージェンティックアプリケーション構築のための新しいビルディングブロックが導入された。

ランタイム・ライブラリ・SDK のすべてのレイヤーでパフォーマンス、診断、開発者生産性に投資しており、インテリジェントでクラウド接続された、エージェント駆動のアプリケーション開発を支援する。

## 主な発表

- **Union types in C#**: 閉じたデータ形状のセットを型安全にモデル化する言語機能。ワイヤプロトコルやドメインモデリングに最適（**Preview**）
- **AI Building Blocks for .NET**: C# アプリへの AI 機能追加のための実践的ガイドとライブラリ。モデル統合からエージェントパターンまでプロダクション対応コード付き（**Preview**）
- **ASP.NET Core エージェンティック Web 対応**: エージェント、ツール、スキル、コンポーネントの新しいビルディングブロックを .NET 11 と Aspire 統合で提供（**Preview**）
- **.NET MAUI エッジ AI**: ローカルモデルとオンデバイス AI をモバイル・デスクトップで実行（**Preview**）
- **dotnetup**: .NET SDK/Runtime の新しいクロスプラットフォームインストーラ。開発者オンボーディングを簡素化（**Preview**）
- **.NET 11 ランタイム最適化**: パフォーマンス、診断、GC 改善を含む AI 時代向け最適化（**Preview**）

## 詳細

### Union Types in C#

C# で最もリクエストの多かった言語機能がついに実現した。Union types は閉じたデータ形状のセットをモデル化し、型安全に処理できるようにする。

主な用途:
- ワイヤプロトコル（JSON レスポンスの複数の形状を 1 つの型で表現）
- ドメインモデリング（Result<T, E> パターン等）
- パターンマッチングとの組み合わせで網羅性チェックを提供

Mads Torgersen と Dustin Campbell がセッション DEM304 でデモを実施。

### AI Building Blocks

.NET アプリに AI 機能を追加するための意見付きガイドとライブラリセット。以下をカバー:
- LLM モデル統合（Microsoft.Extensions.AI）
- エージェントパターンの実装
- プロダクション対応のコードサンプル
- Microsoft Foundry との統合パス

### エージェンティック Web

ASP.NET Core と Blazor に、エージェンティック Web アプリケーション構築のための新しいプリミティブが追加された:
- エージェント・ツール・スキルの定義と公開
- Aspire との緊密な統合によるオブザーバビリティ
- MCP (Model Context Protocol) サポート

### dotnetup

.NET SDK と Runtime のインストール管理を一元化する新しいクロスプラットフォームツール。従来のプラットフォーム固有のインストーラを置き換え、開発者オンボーディングを大幅に簡素化する。

### .NET MAUI でのエッジ AI

.NET MAUI アプリケーションでローカルモデルとオンデバイス AI 機能を活用可能に。モバイル（iOS/Android）とデスクトップ（Windows/macOS）の両方でローカル推論を実行でき、クラウド接続なしでの AI 機能を実現する。

## 応用シナリオ

- REST API のレスポンス型を union types で安全にモデル化し、クライアント側の分岐処理を網羅的に実装
- AI Building Blocks を使い、既存の C# Web API にエージェント機能を追加して問い合わせ対応を自動化
- ASP.NET Core のエージェンティック Web 機能で、ツールとスキルを MCP 経由で外部エージェントに公開
- .NET MAUI アプリにオンデバイス AI を組み込み、オフライン環境でも動作するインテリジェントモバイルアプリを開発
- dotnetup でチーム全体の .NET 環境を一コマンドでセットアップし、オンボーディング時間を短縮

## 参考リンク

- [.NET at Microsoft Build 2026: Must watch sessions](https://devblogs.microsoft.com/dotnet/dotnet-at-microsoft-build-2026/)
- [.NET 11 Preview ダウンロード](https://dotnet.microsoft.com/download/dotnet/11.0)
- [Union types in C# (DEM304)](https://build.microsoft.com/sessions/DEM304)
- [.NET 11 in depth: Runtime, libraries, and SDK (OD806)](https://build.microsoft.com/sessions/OD806)
- [AI Building Blocks for .NET (OD805)](https://build.microsoft.com/sessions/OD805)
- [Building for the agentic web with .NET 11 (OD802)](https://build.microsoft.com/sessions/OD802)
- [Taking your AI to the edge with .NET MAUI (OD803)](https://build.microsoft.com/sessions/OD803)
- [Simplifying .NET installs with dotnetup (OD804)](https://build.microsoft.com/sessions/OD804)
- [.NET at Build 2026 playlist (YouTube)](https://www.youtube.com/playlist?list=PLdo4fOcmZ0oWTPEY00JVEAE4QyrNHets-)

## 関連エントリ

- [.NET Aspire](dotnet-aspire.md) — Aspire との統合はエージェンティック Web の基盤
- [Microsoft Foundry](microsoft-foundry.md) — AI Building Blocks の実行環境
- [Visual Studio](visual-studio.md) — .NET 11 開発体験の IDE サポート
