# Healthya LINE Campaign Front-end

# 開発環境

## ローカル実行

レポジトリのトップレベルのディレクトリで以下を実行

```bash
$ docker network create lambda-local # for the first time only
$ docker-compose up
$ npm install -g sequelize # for the first time only
$ sequelize db:create # for the first time only
$ sequelize db:migrate --env development
$ npm run build # サーバーのビルド
$ sam local start-api --env-vars env.json --docker-network lambda-local
$ npm install --no-save
$ npm start # 別のシェル
```

### 動作確認

- http://localhost:9000

## フロントエンドのディレクトリ構成

```
client/
├ public/        index.html のみ。画像等は /priv/static/app/ 以下に配置する
├ src/
│ ├ appConfig/   API_PATH などの定数と routePath の定義
│ ├ containers/  container components, which access reducer states
│ ├ reducers/
│ ├ epic/        redux-observable epics, inclding api calls
│ ├ store/
│ └ index.tsx
```
