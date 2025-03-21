import { render, screen } from '@testing-library/react'
import Top from '../../../pages/top/index'
import '@testing-library/jest-dom'
import { getAuth } from 'firebase/auth'

// Firebaseのauthをモック
jest.mock('firebase/auth', () => ({
  getAuth: jest.fn(),
}))

describe('Top Page', () => {
  // 各テストの前にモックをリセット
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('未ログイン時に新規登録とログインボタンが表示される', () => {
    // 未ログインユーザーの状態をモック
    getAuth.mockImplementation(() => ({
      currentUser: null,
    }))

    const { container, debug } = render(<Top />)

    // 新規登録ボタンの確認
    expect(screen.getByRole('link', { name: '新規登録' })).toHaveAttribute('href', '/register')

    // ログインボタンの確認
    expect(screen.getByRole('link', { name: 'ログイン' })).toHaveAttribute('href', '/login')

    // 記事を見るボタンの確認
    expect(screen.getByRole('link', { name: '記事を見る' })).toHaveAttribute('href', '/')
  })

  it('ログイン時に新規登録とログインボタンが表示されない', () => {
    // ログインユーザーの状態をモック
    getAuth.mockImplementation(() => ({
      currentUser: {
        uid: 'test-uid',
        email: 'test@example.com',
      },
    }))

    const { container, debug } = render(<Top />)
    // debug()

    // 新規登録ボタンが表示されないことを確認
    expect(screen.queryByRole('link', { name: '新規登録' })).not.toBeInTheDocument()

    // ログインボタンが表示されないことを確認
    expect(screen.queryByRole('link', { name: 'ログイン' })).not.toBeInTheDocument()

    // 記事を見るボタンは表示されることを確認
    expect(screen.getByRole('link', { name: '記事を見る' })).toBeInTheDocument()
  })

  it('ページタイトルが正しく表示される', () => {
    getAuth.mockImplementation(() => ({
      currentUser: null,
    }))

    render(<Top />)
    expect(screen.getByText('Manga Study')).toBeInTheDocument()
  })

  it('機能説明セクションが表示される', () => {
    getAuth.mockImplementation(() => ({
      currentUser: null,
    }))

    render(<Top />)
    expect(screen.getByText('機能')).toBeInTheDocument()
    expect(screen.getByText('記事の投稿')).toBeInTheDocument()
    expect(screen.getByText('記事の閲覧')).toBeInTheDocument()
    expect(screen.getByText('コメント機能')).toBeInTheDocument()
  })
})
