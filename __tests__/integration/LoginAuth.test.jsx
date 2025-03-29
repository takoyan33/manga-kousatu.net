import { act, render, screen, fireEvent } from '@testing-library/react'
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
    expect(screen.getByLabelText(/メールアドレス/i)).toBeVisible()
    expect(screen.getByLabelText(/パスワード/i)).toBeVisible()
    expect(screen.getByRole('button', { name: 'login-button' })).toBeVisible()
  })

  it('Googleログインボタンが表示される', () => {
    render(<LoginAuth />)
    expect(screen.getByRole('button', { name: 'google-login-button' })).toBeVisible()
    expect(screen.getByText(/パスワードをお忘れの方はこちら/i)).toBeVisible()
  })

  it('バリデーションエラーが正しく表示される', async () => {
    const { container, debug } = render(<LoginAuth />)

    // 空のフォームを送信
    const submitButton = screen.getByRole('button', { name: 'login-button' })

    await act(async () => {
      fireEvent.click(submitButton)
    })

    // エラーメッセージが表示されるのを待つ
    const elements = await screen.findAllByText('必須です')

    expect(elements).toHaveLength(2)
    elements.forEach((element) => {
      expect(element).toBeVisible()
    })
  })

  it('パスワードの表示/非表示が切り替えられる', async () => {
    const { container, debug } = render(<LoginAuth />)

    // パスワードの表示切り替えボタンをクリック
    const visibilityToggle = screen.getByRole('button', { name: 'display the password' })

    await act(async () => {
      fireEvent.click(visibilityToggle)
    })

    debug()

    // パスワードフィールドの type 属性が変更されることを確認
    const passwordInput = screen.getByLabelText(/パスワード/i)
    expect(passwordInput).toHaveAttribute('type', 'text')
  })
})
