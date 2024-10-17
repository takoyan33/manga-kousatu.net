# Manga Study

## 目次
- [システムの特徴](#system-feature)
- [使用技術について](#technology-used)
- [ディレクトリ構成](#directory-structure)
- [ブランチについて](#technology-used)


- [URL](https://manga-study.vercel.app/)

<h2 id="system-feature">システムの特徴</h2>
Manga Studyでは、漫画の考察などを自由に投稿・閲覧できる web サイトです。<br>
2022年の6月頃から制作を始めました。<br>
実装した機能としては、記事投稿・編集・削除機能と会員登録・編集・削除機能を実装しています。

<h2 id="technology-used">使用言語、環境</h2>

### nodeバージョン

- node v18.18.0
- npm v9.8.1

### フロントエンド

- [Next.js](https://nextjs.org/) 12.1.6
- [React](https://ja.reactjs.org/) 18.2.0
- [typescript](https://www.typescriptlang.org/) 4.7.4

### バックエンド

- [Firebase](https://firebase.google.com/) 9.8.4


### 認証

- [Firebase Authentication](https://firebase.google.com/docs/auth) 9.6.0

### リンター
- [ESLint](https://eslint.org/) 9.9.0
- [Prettier](https://prettier.io/) 3.3.3
- [Stylelint](https://stylelint.io/) 16.8.2
- [husky](https://typicode.github.io/husky/)9.1.4
- [lint-staged](https://github.com/lint-staged/lint-staged) 

### ホスティング

Vercel

### テスト
- [Jest]() 2.1.1
- [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/) 10.4.0

### 状態管理

- [Zustand](https://zustand.surge.sh/) 3.8.0

### コンポーネント管理

-[Storybook](https://storybook.js.org/) 6.4.9

### ライブラリ

moment.js,Tailwind CSS,Material-UI,Swiper

<h2 id="technology-used">ディレクトリ構成</h2>

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

# Author
 
* 作成者 阿部 舜平
* E-mail harrier2070@gmail.com