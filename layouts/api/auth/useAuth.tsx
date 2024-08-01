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
import { useState } from 'react'
import { useRouter } from 'next/router'
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  query,
  orderBy,
  where,
} from 'firebase/firestore'
import { successNotify, errorNotify } from 'layouts/components/text'
import { database } from 'firebaseConfig'
import useUserStore from '../../../stores/login'

//新規登録
export const useSignup = () => {
  const [error, setError] = useState(null)
  const auth = getAuth()

  const signup = (email: string, password: string) => {
    setError(null)
    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        console.log(res.user)
      })
      .catch((err) => {
        console.log(err.message)
        setError(err.message)
      })
  }

  return { error, signup }
}

//ログイン
export const useLogin = () => {
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const auth = getAuth()

  const login = async (email: string, password: string): Promise<UserCredential> => {
    setError(null)
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      setSuccess(true)
      return userCredential
    } catch (err) {
      console.log(err.message)
      setError(err.message)
      throw err
    }
  }

  return { success, error, login }
}

//ログアウト
export const useLogOut = () => {
  const auth = getAuth()
  const logout = () => {
    signOut(auth)
      .then(() => {
        console.log('Sign-out successful.')
      })
      .catch((err) => {
        console.log(err.message)
      })
  }

  return { logout }
}

//パスワードリセット
export const usePasswordReset = () => {
  const router = useRouter()
  const auth = getAuth()
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState(null)

  const passwordReset = (email: string) => {
    sendPasswordResetEmail(auth, email)
      .then(() => {
        setSuccess(true)
        setTimeout(() => {
          router.push('/login')
        }, 2000)
      })
      .catch((err) => {
        console.log(err.message)
        setError(err.message)
      })
  }

  return { success, error, passwordReset }
}

//Googleログイン
export const SignInWithGoogle = () => {
  const googleProvider = new GoogleAuthProvider()
  const router = useRouter()
  const auth = getAuth()

  signInWithPopup(auth, googleProvider)
    .then(() => {
      setTimeout(() => {
        router.push('/top')
      }, 2000)
    })
    .catch((err) => {
      console.log(err.message)
    })
  return { SignInWithGoogle }
}

//アカウント削除

//記事の投稿
//記事の修正
//投稿の削除
export const deletePost = (routerid) => {
  const router = useRouter()
  //data.idを送っているのでidを受け取る
  let deletePost = doc(database, 'posts', routerid)
  let checkSaveFlg = window.confirm('削除しても大丈夫ですか？')
  //確認画面を出す
  if (checkSaveFlg) {
    deleteDoc(deletePost)
      //記事を削除する
      .then(() => {
        successNotify('記事を削除しました')
        setTimeout(() => {
          router.push('/top')
        }, 2000)
      })
      .catch((err) => {
        errorNotify('失敗しました')
      })
  } else {
    setTimeout(() => {
      router.push('/top')
    }, 2000)
  }
}

//いいねの追加

//コメントの追加

//コメントの削除
