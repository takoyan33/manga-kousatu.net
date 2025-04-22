import { render, screen } from '@testing-library/react'
import { Breadcrumbs } from '../../layouts/components/layout/Breadcrumbs'
import '@testing-library/jest-dom'

describe('[A1_9] Breadcrumbs Component', () => {
  it('正しくレンダリングされる', () => {
    render(<Breadcrumbs items={[{ title: 'カテゴリ', url: '/top/all' }]} />)
    expect(screen.getByText('カテゴリ')).toBeVisible()
  })

  // it('[A1_9_1] すべてのタイトルが表示される', () => {
  //   render(
  //     <Breadcrumbs
  //       items={[
  //         { title: 'トップ', url: '/top/all' },
  //         { title: 'テスト', url: '/top/all' },
  //         { title: '詳細', url: '/top/all' },
  //       ]}
  //     />,
  //   )
  //   expect(screen.getByText('トップ')).toBeVisible()
  //   expect(screen.getByText('テスト')).toBeVisible()
  //   expect(screen.getByText('詳細')).toBeVisible()
  // })

  it('[A1_9_2] リンクが正しく機能する', () => {
    render(
      <Breadcrumbs items={[{ title: 'カテゴリ', url: 'https://manga-study-net.vercel.app/' }]} />,
    )
    expect(screen.getByRole('link', { name: 'カテゴリ' })).toHaveAttribute(
      'href',
      'https://manga-study-net.vercel.app/',
    )
  })
})
