import { render, screen, fireEvent } from '@testing-library/react'
import LoginAuth from '../../layouts/api/auth/LoginAuth'
import '@testing-library/jest-dom'

// Firebaseのモック
jest.mock('firebase/auth', () => ({
  getAuth: () => ({
    currentUser: null,
  }),
  GoogleAuthProvider: jest.fn(() => ({})),
  signInWithPopup: jest.fn(),
}))

// useAuthのモック
jest.mock('../../layouts/api/auth/useAuth', () => ({
  useAuth: () => ({
    login: jest.fn(),
    loading: false,
    error: null,
  }),
}))

jest.mock('@lottiefiles/react-lottie-player', () => ({
  Player: () => <div data-testid='mock-lottie-player' />,
}))

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { id: 'test-post-id' },
    push: jest.fn(),
  }),
}))

describe('LoginAuth Component', () => {
  beforeEach(() => {
    // 各テスト前にモックをリセット
    jest.clearAllMocks()
  })

  it('ログインフォームが正しくレンダリングされる', () => {
    render(<LoginAuth />)

    // 必須フィールドの存在確認
    expect(screen.getByLabelText(/メールアドレス/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/パスワード/i)).toBeInTheDocument()
    //expect(screen.getByRole('button', { name: /ログイン/i })).toBeInTheDocument()
  })

  // it('バリデーションエラーが正しく表示される', async () => {
  //   render(<LoginAuth />)

  //   // 空のフォームを送信
  //   const submitButton = screen.getByRole('button', { name: /ログイン/i })
  //   fireEvent.click(submitButton)

  //   // エラーメッセージの確認
  //   expect(await screen.findByText('必須です')).toBeInTheDocument()
  // })

  // it('Googleログインボタンが表示される', () => {
  //   render(<LoginAuth />)
  //   expect(screen.getByRole('button', { name: /Googleでログイン/i })).toBeInTheDocument()
  // })

  // it('パスワードの表示/非表示が切り替えられる', () => {
  //   render(<LoginAuth />)

  //   // パスワードの表示切り替えボタンをクリック
  //   const visibilityToggle = screen.getByRole('button', { name: /toggle password visibility/i })
  //   fireEvent.click(visibilityToggle)

  //   // パスワードフィールドの type 属性が変更されることを確認
  //   const passwordInput = screen.getByLabelText(/パスワード/i)
  //   expect(passwordInput).toHaveAttribute('type', 'text')
  // })

  // it('パスワードリセットリンクが表示される', () => {
  //   render(<LoginAuth />)
  //   expect(screen.getByText(/パスワードを忘れた方/i)).toBeInTheDocument()
  // })
})
