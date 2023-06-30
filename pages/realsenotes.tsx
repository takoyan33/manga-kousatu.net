import React from 'react'
import { CommonHead } from 'layouts/components/ui'

const RELEASE_NOTES = [
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

function RealseNotes() {
  return (
    <div>
      <CommonHead />
      <h1 className='m-5 my-12 text-center text-2xl font-semibold'>Manga Study - 更新履歴</h1>
      {RELEASE_NOTES.map(({ version, date, features }) => (
        <div key={version}>
          <h2 className='my-4 mt-8 text-xl font-semibold'>Manga Study {version}</h2>
          <p>{date}</p>
          <h4 className='my-2 text-lg'>変更点</h4>
          {features.map((feature, index) => (
            <p key={index}>{feature}</p>
          ))}
        </div>
      ))}
      <h3 className='my-4'>Github</h3>
      <p className='mb-8 font-semibold'>
        <a href='https://github.com/takoyan33/manga-kousatu.net'>
          https://github.com/takoyan33/manga-kousatu.net
        </a>
      </p>
    </div>
  )
}

export default RealseNotes
