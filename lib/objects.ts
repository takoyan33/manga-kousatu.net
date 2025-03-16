// マンガカテゴリーの定数型
export const enum MangaCategory {
  ONEPIECE = 'ONEPIECE',
  JUJUTSU = '呪術廻戦',
  TOKYO = '東京リベンジャーズ',
  KINGDOM = 'キングダム',
}

// 投稿カテゴリの型定義
type PostCategory = Readonly<{
  id: number
  className: string
  title: MangaCategory
  link: `/post/categories/${MangaCategory}`
}>

// カラーの型定義
type HexColor = `#${string}`

// 表示データの型定義
type DisplayData = Readonly<{
  id: number
  label: '公開' | '下書き'
  value: boolean
}>

// リリースノートの型定義
type ReleaseNote = Readonly<{
  version: `${number}.${number}`
  date: `${number}年${number}月${number}日`
  features: readonly string[]
}>

// データ定義
export const POST_CATEGORIES: readonly PostCategory[] = [
  {
    id: 1,
    className: 'border-cyan-500 bg-cyan-100 hover:bg-cyan-500',
    title: MangaCategory.ONEPIECE,
    link: '/post/categories/ONEPIECE',
  },
  {
    id: 2,
    className: 'border-purple-500 bg-purple-100 hover:bg-purple-500',
    title: MangaCategory.JUJUTSU,
    link: '/post/categories/呪術廻戦',
  },
  {
    id: 3,
    className: 'border-rose-500 bg-rose-100 hover:bg-rose-500',
    title: MangaCategory.TOKYO,
    link: '/post/categories/東京リベンジャーズ',
  },
  {
    id: 4,
    className: 'border-yellow-500 bg-yellow-100 hover:bg-yellow-500',
    title: MangaCategory.KINGDOM,
    link: '/post/categories/キングダム',
  },
] as const

export const COLORS: readonly HexColor[] = [
  '#0088FE',
  '#00C49F',
  '#FFBB28',
  '#FF8042',
  '#ff6361',
  '#8884d8',
  '#C1C1C1',
] as const

export const DISPLAY_DATA: readonly DisplayData[] = [
  {
    id: 1,
    label: '公開',
    value: true,
  },
  {
    id: 2,
    label: '下書き',
    value: false,
  },
] as const

export const RELEASE_NOTES: readonly ReleaseNote[] = [
  {
    date: '2024年7月30日',
    features: ['TypeScriptで型定義の追加、UIの大幅改良、カルーセルの追加'],
    version: '2.0',
  },
  {
    date: '2023年7月1日',
    features: [
      'コードのリファクタリング（変数名をキャメルケースに、定数名をアッパースネークケースに変更）',
    ],
    version: '1.9',
  },
  {
    date: '2023年2月22日',
    features: ['更新履歴ページの作成'],
    version: '1.8',
  },
  {
    date: '2023年1月3日',
    features: ['modalコンポーネント化により、処理速度向上'],
    version: '1.7',
  },
  {
    date: '2023年1月1日',
    features: ['ダイナミックルーティングの対応'],
    version: '1.6',
  },
  {
    date: '2022年12月30日',
    features: [
      '登録や投稿時にポップアップ（トースト）が出るように追加',
      'パスワードの再設定が可能に',
    ],
    version: '1.5',
  },
  {
    date: '2022年11月3日',
    features: ['プロフィールに投稿と投稿数やカテゴリグラフの表示'],
    version: '1.4',
  },
  {
    date: '2022年10月30日',
    features: ['投稿記事の編集日時の追加'],
    version: '1.3',
  },
  {
    date: '2022年10月15日',
    features: ['画像投稿といいね機能の追加', 'ロゴの追加'],
    version: '1.2',
  },
  {
    date: '2022年10月2日',
    features: [
      'プロフィールページにてメールアドレスやパスワードが編集可能に',
      'リロードエラーの不具合解消',
    ],
    version: '1.1',
  },
  {
    date: '2022年9月30日',
    features: ['MangaStudyの正式リリース'],
    version: '1.0',
  },
] as const

export const COPY_WRITES: readonly string[] = [
  '© 尾田栄一郎／集英社・フジテレビ・東映アニメーション',
  '© 和久井健・講談社／アニメ「東京リベンジャーズ」',
  '©原泰久／集英社・キングダム製作委員会',
  '©芥見下々／集英社・呪術廻戦製作委員会',
] as const

// ユーティリティ型
export type ValueOf<T> = T[keyof T]
export type MangaCategoryType = ValueOf<typeof MangaCategory>
