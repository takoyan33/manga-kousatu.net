//投稿のcategoriesのデータ
export const POST_CATEGORIES = [
  {
    id: 1,
    className: 'border-cyan-500 text-cyan-500 hover:bg-cyan-700',
    title: 'ONEPIECE',
    link: '/post/categories/ONEPIECE',
  },
  {
    id: 2,
    className: 'border-purple-500 text-purple-500 hover:bg-purple-700',
    title: '呪術廻戦',
    link: '/post/categories/呪術廻戦',
  },
  {
    id: 3,
    className: 'border-rose-500 text-rose-500 hover:bg-rose-700',
    title: '東京リベンジャーズ',
    link: '/post/categories/東京リベンジャーズ',
  },
  {
    id: 4,
    className: 'border-yellow-500 text-yellow-500 hover:bg-yellow-700',
    title: 'キングダム',
    link: '/post/categories/キングダム',
  },
]

export const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#ff6361', '#8884d8', '#C1C1C1']

export const DISPLAY_DATA = [
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
]

export const RELEASE_NOTES = [
  {
    version: '1.9',
    date: '2023年7月1日',
    features: [
      'コードのリファクタリング（変数名をキャメルケースに、定数名をアッパースネークケースに変更）',
    ],
  },
  {
    version: '1.8',
    date: '2023年2月22日',
    features: ['更新履歴ページの作成'],
  },
  {
    version: '1.7',
    date: '2023年1月3日',
    features: ['modalコンポーネント化により、処理速度向上'],
  },
  {
    version: '1.6',
    date: '2023年1月1日',
    features: ['ダイナミックルーティングの対応'],
  },
  {
    version: '1.5',
    date: '2022年12月30日',
    features: [
      '登録や投稿時にポップアップ（トースト）が出るように追加',
      'パスワードの再設定が可能に',
    ],
  },
  {
    version: '1.4',
    date: '2022年11月3日',
    features: ['プロフィールに投稿と投稿数やカテゴリグラフの表示'],
  },
  {
    version: '1.3',
    date: '2022年10月30日',
    features: ['投稿記事の編集日時の追加'],
  },
  {
    version: '1.2',
    date: '2022年10月15日',
    features: ['画像投稿といいね機能の追加', 'ロゴの追加'],
  },
  {
    version: '1.1',
    date: '2022年10月2日',
    features: [
      'プロフィールページにてメールアドレスやパスワードが編集可能に',
      'リロードエラーの不具合解消',
    ],
  },
  {
    version: '1.0',
    date: '2022年9月30日',
    features: ['MangaStudyの正式リリース'],
  },
]
