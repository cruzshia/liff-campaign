Healthya LINE Campaign Front-end
=========

# 開発環境

## ローカル実行

レポジトリのトップレベルのディレクトリで以下を実行

```bash
$ npm run build # サーバーのビルド
$ sam local start-api # ローカルサーバーの起動(http://localhost:3000/)

$ npm install --no-save
$ npm run watch # 別のシェル
```

### 動作確認

- http://localhost:9000


## コードフォーマッタの実行(prettier, tslint, stylelint)

```bash
$ npm run lint
$ npm run format
```

## フロントエンドのディレクトリ構成

```
ui/
├ public/        index.html のみ。画像等は /priv/static/app/ 以下に配置する
├ src/
│ ├ appConfig/   API_PATH などの定数と routePath の定義
│ ├ locale/      i18n のためのコード、文言はここに配置
│ ├ models/      各リソース、リクエスト、レスポンスの型定義
│ ├ actions/
│ ├ reducers/
│ ├ store/
│ ├ schemas/     Table, Form 用の JSON schema
│ ├ utils/       http.ts などのライブラリ的なコードはここに配置
│ ├ App/         ログイン後のページ全体の component
│ └ index.tsx
└ types/
  └ module.declaration.d.ts
```
