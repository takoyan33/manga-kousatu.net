import { render, screen } from '@testing-library/react'
import CommonAvatar from 'layouts/components/text/CommonAvatar'
import '@testing-library/jest-dom'

// モックの設定
jest.mock('next/router', () => ({
  useRouter: () => ({
    push: jest.fn(),
  }),
}))

// Lottieアニメーションのモック
jest.mock('@lottiefiles/react-lottie-player', () => ({
  Player: () => <div data-testid='mock-lottie-player' />,
}))

describe('CommonAvatar Component', () => {
  // テスト用のプロップス
  const mockProps = {
    photoURL: 'https://example.com/avatar.jpg',
    displayname: 'Test User',
  }

  beforeEach(() => {
    // 各テスト前にモックをクリア
    jest.clearAllMocks()
  })

  it('アバターが正しくレンダリングされる', () => {
    render(<CommonAvatar {...mockProps} />)
  })

  it('表示名が正しく表示される', () => {
    render(<CommonAvatar {...mockProps} />)
    expect(screen.getByText(mockProps.displayname)).toBeVisible()
  })

  // it('デフォルト画像が表示される（画像URLが無い場合）', () => {
  //   render(<CommonAvatar displayname='Test User' />)
  //   const avatar = screen.getByRole('img', { name: /avatar/i })
  //   expect(avatar).toHaveAttribute('src', '/images/default-avatar.png') // デフォルト画像のパスに応じて変更
  // })
})
