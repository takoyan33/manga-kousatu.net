import { render, screen } from '@testing-library/react'
import { Breadcrumbs } from '../../layouts/components/layout/Breadcrumbs'
import '@testing-library/jest-dom'

describe('[A1_9] Breadcrumbs Component', () => {
  it('正しくレンダリングされる', () => {
    render(<Breadcrumbs secondTitle='ONEPIECE' />)
    expect(screen.getByText('ONEPIECE')).toBeInTheDocument()
  })

  it('[A1_9_1] すべてのタイトルが表示される', () => {
    render(<Breadcrumbs secondTitle='テスト' thirdTitle='詳細' />)
    expect(screen.getByText('トップ')).toBeInTheDocument()
    expect(screen.getByText('テスト')).toBeInTheDocument()
    expect(screen.getByText('詳細')).toBeInTheDocument()
  })

  // it('[A1_9_2] リンクが正しく機能する', () => {
  //   render(<Breadcrumbs secondTitle='テスト' />)
  //   expect(screen.getByRole('link', { name: 'ホーム' })).toHaveAttribute('href', '/')
  // })
})
