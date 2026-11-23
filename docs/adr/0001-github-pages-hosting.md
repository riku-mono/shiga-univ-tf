# ADR-0001: 静的サイト構成と GitHub Pages によるホスティング採用

* **ステータス**: 承認済み
* **決定日**: 2026-11-23
* **対象**: デプロイメント・インフラ構成（`index.html`, `recruit.html`, `members.html`, `records.html`, `style.css`, `app.js`, `data.js`, `assets/`, `.github/workflows/deploy-pages.yml`）

---

## コンテキスト（背景と課題）

[滋賀大陸上部ホームページ構成案.pdf](../../滋賀大陸上部ホームページ構成案.pdf) では、部活の Google アカウントを活用して GitHub 上でサイトを管理し、Google スプレッドシートをデータベースとして更新する方針が定められている。

大学部活動の公式 Web サイトとして、以下の制約と要件を満たすホスティング環境が必要である。

1. **ランニングコストが無料であること**：サーバー契約費やドメイン維持費などの継続的負担を避けたい（卒業・引き継ぎ時に支払いトラブルを起こさない）。
2. **引き継ぎ・保守が容易であること**：専門のエンジニアが常駐しない年度でも、HTML/CSS/JS と設定ファイルの基本構成だけで管理でき、Node.js や複雑なフレームワークのバージョンアップ保守を不要にしたい。
3. **公開アカウントとの整合性**：部の GitHub アカウント（`https://github.com/shiga-univ-tf`）でソース管理と公開を一元化したい。
4. **公開ファイルと管理資料の分離**：リポジトリには構成案 PDF・ADR・README・スプレッドシートのテンプレート CSV などが含まれるため、本番 Web サイト側にはページ表示に必要なファイルだけを公開したい。

---

## 決定事項

1. **ビルド不要の静的 Web サイト構成を継続採用する**
   * HTML（4ページ）・CSS（`style.css`）・Vanilla JavaScript（`data.js`, `app.js`）・画像（`assets/`）の純粋な静的ファイルで構成し、サイト内リンクやアセット参照はすべて相対パスを用いる。
   * これにより、ユーザーサイト（`https://shiga-univ-tf.github.io/`）およびプロジェクトサイト（`https://shiga-univ-tf.github.io/<repo>/`）のどちらのリポジトリ名でも変更なしで動作する。

2. **GitHub Pages ＋ GitHub Actions による選択的デプロイを採用する**
   * `.github/workflows/deploy-pages.yml` を配置し、`main` ブランチへのプッシュ時（および手動実行 `workflow_dispatch` 時）に自動デプロイを行う。
   * ワークフロー内で公開に必要なファイル（`index.html`, `recruit.html`, `members.html`, `records.html`, `style.css`, `app.js`, `data.js`, `assets/` および `.nojekyll`）のみを `_site/` にステージングして `actions/deploy-pages` へ渡す。

---

## 検討した代替案と不採用理由

| 選択肢 | メリット | デメリット・不採用理由 |
| :--- | :--- | :--- |
| **GitHub Pages（`Deploy from a branch` で `main` 直公開）** | ワークフローファイル不要で初期設定が最小限 | リポジトリ内の `滋賀大陸上部ホームページ構成案.pdf`・`docs/adr/`・`spreadsheet_templates/`・`README.md` 等もそのまま Web 上に公開されてしまう。また将来的にビルドチェックや静的生成を組み込みにくい。 |
| **Netlify / Vercel / Cloudflare Pages** | プレビュー環境やフォーム連携機能などが充実 | GitHub とは別サービスのアカウント・権限引き継ぎが発生し、構成案の「GitHub で管理」から運用箇所が分散する。将来の移行は静的サイトのためいつでも可能。 |
| **WordPress / レンタルサーバー** | 管理画面から記事更新が可能 | 年間のサーバー費用、PHP・プラグインの脆弱性対応やバックアップ保守が必要となり、部活動の引き継ぎ負荷が高い。 |

---

## 影響・運用上の注意点

* **GitHub 側の設定が必要**：初回リポジトリ作成後、GitHub の `Settings > Pages > Build and deployment > Source` を **`GitHub Actions`** に設定する必要がある。
* **新規公開ファイル追加時のルール**：今後、新たに公開 HTML や `404.html`、`favicon.ico`、別ディレクトリのアセットなどを追加した場合は、`.github/workflows/deploy-pages.yml` のステージング処理（`cp` 対象）にも追加すること。
* **リポジトリ名の推奨**：公開 URL を最もシンプルにするため、リポジトリ名は `shiga-univ-tf.github.io`（公開 URL: `https://shiga-univ-tf.github.io/`）を推奨する（ただし別名リポジトリでも相対パスにより動作する）。
