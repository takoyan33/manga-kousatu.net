import { createContext, useState, useContext, useEffect } from 'react'
import { auth } from '../../firebaseConfig'

// Firebase認証の状態を管理するコンテキストを作成
const AuthContext = createContext()

/**
 * カスタムフック: 認証コンテキストを使用するためのフック
 * @returns {Object} 認証に関する状態とメソッド
 */
export function useAuthContext() {
  return useContext(AuthContext)
}

/**
 * 認証状態を提供するプロバイダーコンポーネント
 * @param {Object} props
 * @param {React.ReactNode} props.children - 子コンポーネント
 */
export function AuthProvider({ children }) {
  // ユーザー状態の管理
  const [user, setUser] = useState('')
  // ローディング状態の管理（認証状態の確認中かどうか）
  const [loading, setLoading] = useState(true)

  // コンテキストで共有する値
  const value = {
    user, // 現在のユーザー情報
    loading, // ローディング状態
  }

  useEffect(() => {
    // Firebase Authの認証状態監視
    const unsubscribed = auth.onAuthStateChanged((user) => {
      setUser(user) // ユーザー情報を更新
      setLoading(false) // ローディング完了
    })

    // クリーンアップ関数：コンポーネントのアンマウント時に購読を解除
    return () => {
      unsubscribed()
    }
  }, [children])

  // ローディング中は子コンポーネントをレンダリングしない
  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
