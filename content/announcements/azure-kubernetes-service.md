---
id: azure-kubernetes-service
title: Azure Kubernetes Service
summary: AKS の Build 2026 更新として、Anyscale on Azure（Ray on AKS）の Public Preview を発表。Ray フレームワークを AKS 上でフルマネージドに実行し、AI トレーニング・推論・データ処理のスケーラブルな分散処理基盤を提供する。エージェンティック AI ワークロード向けのクラウドネイティブスケーリングを強化。
tags:
  - azure-kubernetes-service
content_type: announcement
topic: cloud-platform-and-data
official_sources:
  - https://techcommunity.microsoft.com/blog/appsonazureblog/whats-new-in-aks-at-microsoft-build-2026/4524082
deliveries:
  site: true
  llms: true
  skills: true
---

## 概要

Azure Kubernetes Service（AKS）は Build 2026 で複数の機能更新を発表した。最も注目される発表は Anyscale on Azure の Public Preview で、Ray フレームワークを AKS 上でマネージドに実行可能となる。

## 主な発表

- **Anyscale on Azure**: Ray on AKS によるマネージド分散 AI/ML 処理基盤（**Public Preview**）
- **AKS プラットフォーム強化**: AI ワークロードのスケーリングとオペレーション改善
- **GPU クラスタ管理の改善**: AI トレーニング・推論向けの GPU リソース管理

## 詳細

### Anyscale on Azure

Ray は分散 AI/ML ワークロードのためのオープンソースフレームワーク。Anyscale on Azure は Ray を AKS 上でフルマネージドに実行し、AI トレーニング、推論、データ処理のスケーラブルな基盤を提供する。Ray の分散コンピューティングプリミティブにより、単一ノードのコードを変更なしで分散環境にスケールアウトできる。

### エージェンティック AI ワークロードへの対応

AKS はエージェンティック AI アプリケーションのコンテナオーケストレーション基盤として、GPU ノードプールの管理、自動スケーリング、ネットワーク分離を提供する。KEDA（Kubernetes Event-driven Autoscaling）との連携により、イベント駆動のエージェント実行をスケーラブルに管理できる。

### 開発者体験の改善

AKS の運用ツールチェーンが改善され、AI ワークロードのモニタリング・デバッグ・デプロイが効率化された。Azure Developer CLI（azd）テンプレートにより、AI アプリケーションの AKS デプロイをテンプレート化できる。

## 応用シナリオ

- Ray on AKS で大規模言語モデルの分散推論・ファインチューニングをフルマネージド実行
- GPU ノードプールとスポットインスタンスを活用した AI トレーニングのコスト最適化
- KEDA 連携によるイベント駆動のエージェントオーケストレーションの自動スケーリング

## 参考リンク

- [What's new in AKS at Microsoft Build 2026](https://techcommunity.microsoft.com/blog/appsonazureblog/whats-new-in-azure-kubernetes-service-at-microsoft-build-2026/4524862)
- [Announcing Anyscale on Azure public preview: Powered by Ray on AKS](https://techcommunity.microsoft.com/blog/appsonazureblog/announcing-anyscale-on-azure-public-preview-powered-by-ray-on-aks/4523704)
- [Anyscale on Azure ドキュメント](https://learn.microsoft.com/azure/anyscale-on-azure/overview)
- [Azure Kubernetes Service ドキュメント](https://learn.microsoft.com/azure/aks/)
