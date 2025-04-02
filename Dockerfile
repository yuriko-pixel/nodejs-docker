FROM node:18

# 作業ディレクトリの設定
WORKDIR /usr/src/app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# アプリケーションのコードをコピー
COPY . .

# アプリを実行
CMD ["node", "server.js"]
