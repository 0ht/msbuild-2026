# GitHub Copilot App

エディタに依存しないエージェントネイティブのデスクトップアプリ GitHub Copilot App を Preview で発表。 My Work ビューでリポジトリ横断のセッション・Issue・PR・バックグラウンド自動化を一元管理し、 エージェントの作業過程と判断根拠を透明化する Trace 機能を搭載。 Agent Mode の進化として、開発者のワークフロー全体をカバーする新しいサーフェスを提供する。

## 概要

GitHub Copilot App は、Build 2026 で発表されたエージェントネイティブのデスクトップアプリケーションである。エディタに依存せず、エージェントの作業を統合管理する新しいサーフェスとして設計されている。

従来の Agent Mode がエディタ内でのタスク実行に焦点を当てていたのに対し、Copilot App は開発者のワークフロー全体—Issue からプルリクエスト、レビューフィードバックからマージまで—をエージェントと協調して進める体験を提供する。

## 主な変更点

- **GitHub Copilot App**: エディタ非依存のエージェントネイティブ・デスクトップアプリ（**Preview**）
- **My Work ビュー**: 接続リポジトリ横断でアクティブセッション、Issue、PR、バックグラウンド自動化を一元表示
- **Trace 機能**: エージェントが何を試み、何を検証し、どこで人間の判断が必要かを可視化
- **Agent Mode 改善**: マルチファイル編集の精度向上、ターミナル統合の強化

## 技術的詳細

Copilot App は Agent Mode と同じランタイム基盤上で動作する。タスクの実行計画を内部的に構築し、各ステップでファイルシステムの読み書き、ターミナルコマンドの実行と出力解析、ビルドエラー・テスト失敗の自動検出と修正ループ、MCP サーバー経由の外部ツール連携を行う。

## 応用シナリオ

- Issue からプルリクエストまでのワークフローをエージェントが自律的に実行し、開発者はレビューに集中
- 複数リポジトリにまたがるバックグラウンド自動化の進捗を My Work ビューで一元監視
- Trace 機能でエージェントの意思決定過程を確認し、コードレビューの品質を向上

## 制約・注意点

- **GitHub Copilot App** は **Preview**。対応 OS やサポート範囲は公式ブログを参照
- Agent Mode の自律的なファイル操作・ターミナル実行にはユーザーの承認が必要

## 公式ソース

- [https://github.blog/news-insights/product-news/github-copilot-app-the-agent-native-desktop-experience](https://github.blog/news-insights/product-news/github-copilot-app-the-agent-native-desktop-experience)
