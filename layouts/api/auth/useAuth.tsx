import {
  getAuth,
  sendPasswordResetEmail,
  signInWithPopup,
  GoogleAuthProvider,
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  UserCredential,
} from 'firebase/auth'
import { useRouter } from 'next/router'
import { useState } from 'react'
import { successNotify, errorNotify } from '../../components/text'

type AuthError = {
  message: string
}

//新規登録
export function useAuth() {
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const router = useRouter()
  const auth = getAuth()

  const signup = async (email: string, password: string): Promise<UserCredential | void> => {
    setLoading(true)
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      successNotify('ユーザー登録完了しました')
      return result
    } catch (err) {
      const authError = err as AuthError
      setError(authError.message)
      errorNotify('ユーザー登録に失敗しました')
      throw err
    } finally {
      setLoading(false)
    }
  }

  //ログイン
  const login = async (email: string, password: string): Promise<UserCredential | void> => {
    setLoading(true)
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      successNotify('ログインしました')
      return result
    } catch (err) {
      const authError = err as AuthError
      setError(authError.message)
      errorNotify('ログインに失敗しました')
      throw err
    } finally {
      setLoading(false)
    }
  }

  //ログアウト
  const logout = async (): Promise<void> => {
    setLoading(true)
    try {
      await signOut(auth)
      successNotify('ログアウトしました')
    } catch (err) {
      const authError = err as AuthError
      setError(authError.message)
      errorNotify('ログアウトに失敗しました')
    } finally {
      setLoading(false)
    }
  }

  //パスワードリセット
  const resetPassword = async (email: string): Promise<void> => {
    setLoading(true)
    try {
      await sendPasswordResetEmail(auth, email)
      successNotify('パスワードリセットメールを送信しました')
      setTimeout(() => router.push('/login'), 2000)
    } catch (err) {
      const authError = err as AuthError
      setError(authError.message)
      errorNotify('パスワードリセットに失敗しました')
    } finally {
      setLoading(false)
    }
  }

  //Googleログイン
  const googleSignIn = async (): Promise<void> => {
    setLoading(true)
    const provider = new GoogleAuthProvider()
    try {
      await signInWithPopup(auth, provider)
      successNotify('ログインしました')
      router.push('/top')
    } catch (err) {
      const authError = err as AuthError
      setError(authError.message)
      errorNotify('Googleログインに失敗しました')
    } finally {
      setLoading(false)
    }
  }

  //記事の投稿
  //記事の修正
  //投稿の削除

  //いいねの追加

  //コメントの追加

  //コメントの削除

  return {
    signup,
    login,
    logout,
    googleSignIn,
    resetPassword,
    error,
    loading,
  }
}
