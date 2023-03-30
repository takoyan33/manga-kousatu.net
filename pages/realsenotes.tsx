import React from 'react'
import { CommonHead } from '../layouts/components/ui/CommonHead'

const releases = [
  {
    version: '1.9',
    date: '2023年3月30日',
    features: ['いいね機能実装'],
  },
  {
    version: '1.8',
    date: '2023年2月22日',
    features: ['リリースノートページの作成'],
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
    date: '2023年12月30日',
    features: [
      '登録や投稿時にポップアップ（トースト）が出るように追加',
      'パスワードの再設定が可能に',
    ],
  },
  {
    version: '1.4',
    date: '2023年11月3日',
    features: ['プロフィールに投稿と投稿数やカテゴリグラフの表示'],
  },
  {
    version: '1.3',
    date: '2023年10月30日',
    features: ['投稿記事の編集日時の追加'],
  },
  {
    version: '1.2',
    date: '2023年10月15日',
    features: ['画像投稿といいね機能の追加', 'ロゴの追加'],
  },
  {
    version: '1.1',
    date: '2023年10月2日',
    features: [
      'プロフィールページにてメールアドレスやパスワードが編集可能に',
      'リロードエラーの不具合解消',
    ],
  },
  {
    version: '1.0',
    date: '2023年9月30日',
    features: ['MangaStudyの正式リリース'],
  },
]

function RealseNotes() {
  return (
    <div>
      <CommonHead />
      <h2 className='m-5 my-12 text-center text-2xl font-semibold'>Manga Study - リリースノート</h2>
      {releases.map(({ version, date, features }) => (
        <div key={version}>
          <h3 className='text-xl mt-8 my-4 font-semibold'>Manga Study {version}</h3>
          <p>{date}</p>
          <h4 className='text-lg my-2'>変更点</h4>
          {features.map((feature, index) => (
            <p key={index}>{feature}</p>
          ))}
        </div>
      ))}
      <h3 className='my-4'>Github</h3>
      <p className='font-semibold mb-8'>
        <a href='https://github.com/takoyan33/manga-kousatu.net'>
          https://github.com/takoyan33/manga-kousatu.net
        </a>
      </p>
    </div>
  )
}

export default RealseNotes
