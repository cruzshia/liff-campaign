# Healthya LINE Campaign Front-end

# 開発環境

## ローカル実行

レポジトリのトップレベルのディレクトリで以下を実行

```bash
$ npm install --no-save
$ npm start # 別のシェル
$ HTTPS=true npm start # for create https localhost url
```

### 動作確認

- http://localhost:9000

## フロントエンドのディレクトリ構成

```
client/
├ public/          index.html のみ。画像等は /priv/static/app/ 以下に配置する
├ src/
│ ├ appConfig/     API_PATH などの定数と routePath の定義
│ ├ containers/    container components, which access reducer states
│ ├ reducers/
│ ├ epic/          redux-observable epics, inclding api calls
│ ├ store/
│ ├ translations/  currently support ja and en only
│ ├ types/         global typing define
│ ├ utils/
│ ├ libs/          external sample codes, e.g. Camera utils
│ └ index.tsx
```

### NET::ERR_CERT_INVALID

For localhost only:
Simply paste this in your chrome:

```
chrome://flags/#allow-insecure-localhost
```
