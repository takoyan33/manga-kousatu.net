## プロジェクトのタイトル

Manga Study

https://manga-kousatu-net.vercel.app/

## プロジェクトの概要説明

Manga Study では、漫画の考察などを自由に投稿・閲覧できる web サイトです。

2022 年の 6 月頃から制作を始めました。

実装した機能としては、記事投稿・編集・削除機能と会員登録・編集・削除機能を実装しています。

## 使用言語、環境

- 使用言語：TypeScript

- フレームワーク：React,Next.js

- 認証：Firebase Authentication

- リンター：ESLint, Prettier, husky, lint-staged

- サーバー：Vercel

- データベース：Cloud Firestore (NoSQL)

- 状態管理： Zustand

- コンポーネント管理： Storybook

- ライブラリ：moment.js,Tailwind CSS,Material-UI,Swiper

## 使い方

git clone

npm install

yarn dev

## デプロイ方法

git add .
git commit -m " "
git push

### ディレクトリ構成

```
.
├── layouts
│   ├── api        #firestoreのCRUD処理
│   ├── assets     #アニメーション素材
│   ├── components #コンポーネントの記載
│   ├── types      #型定義
│   ├── utils      #共通関数
├── pages
│   ├── about      #Aboutページ
│   ├── login      #loginページ
│   ├── post       #投稿の表示と更新と削除
│   ├── profile    #プロフィールの表示と更新と削除
│   ├── register   #registerページ
│   ├── top        #topページ
├── public          #写真
├── stories         #storybook
├── styles          #cssの設定
```

### こだわりポイント

・firestore でクラッド処理を行なっている点

・ユーザーの名前変更やプロフ画像の変更

### 今後の計画

・全ファイルを TypeScript 化する

・投稿の個別ページの作成

・投稿検索機能実装
