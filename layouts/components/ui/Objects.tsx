// import { useEffect, useState, useCallback } from 'react'
// import Link from 'next/link'
// import { database } from '../../../firebaseConfig'
// import { query, where } from 'firebase/firestore'
// import { collection, getDocs } from 'firebase/firestore'
// import { useAuthContext } from '../../../layouts/context/AuthContext'

//投稿のcategoriesのデータ
export const POST_CATEGORIES = [
  {
    id: 1,
    className: 'border-cyan-500 text-cyan-500 hover:bg-cyan-700',
    title: 'ONEPIECE',
    link: '/post/categories/ONEPIECE',
  },
  {
    id: 2,
    className: 'border-purple-500 text-purple-500 hover:bg-purple-700',
    title: '呪術廻戦',
    link: '/post/categories/呪術廻戦',
  },
  {
    id: 3,
    className: 'border-rose-500 text-rose-500 hover:bg-rose-700',
    title: '東京リベンジャーズ',
    link: '/post/categories/東京リベンジャーズ',
  },
  {
    id: 4,
    className: 'border-yellow-500 text-yellow-500 hover:bg-yellow-700',
    title: 'キングダム',
    link: '/post/categories/キングダム',
  },
]

// const { user } = useAuthContext()
// const databaseRef = collection(database, 'posts')
// const usersRef = collection(database, 'users')
// const [users, setUsers] = useState(null)

// const [onpiece, setOnpiece] = useState([])
// const [kingdom, setKingdom] = useState([])
// const [tokyo, setTokyo] = useState([])
// const [kaisen, setKaisen] = useState([])

// const getDataone = async () => {
//   //firestoreからデータ取得
//   await getDocs(o).then((querySnapshot) => {
//     //コレクションのドキュメントを取得
//     setOnpiece(
//       querySnapshot.docs.map((data) => {
//         //配列なので、mapで展開する
//         return { ...data.data(), id: data.id }
//         //スプレッド構文で展開して、新しい配列を作成
//       }),
//     )
//   })
// }

// const getDatzyu = async () => {
//   //firestoreからデータ取得
//   await getDocs(z).then((querySnapshot) => {
//     //コレクションのドキュメントを取得
//     setKaisen(
//       querySnapshot.docs.map((data) => {
//         //配列なので、mapで展開する
//         return { ...data.data(), id: data.id }
//         //スプレッド構文で展開して、新しい配列を作成
//       }),
//     )
//   })
// }

// const getDatatokyo = async () => {
//   //firestoreからデータ取得
//   await getDocs(t).then((querySnapshot) => {
//     //コレクションのドキュメントを取得
//     setTokyo(
//       querySnapshot.docs.map((data) => {
//         //配列なので、mapで展開する
//         return { ...data.data(), id: data.id }
//         //スプレッド構文で展開して、新しい配列を作成
//       }),
//     )
//   })
// }

// const getDataking = async () => {
//   //firestoreからデータ取得
//   await getDocs(k).then((querySnapshot) => {
//     //コレクションのドキュメントを取得
//     setKingdom(
//       querySnapshot.docs.map((data) => {
//         //配列なので、mapで展開する
//         return { ...data.data(), id: data.id }
//         //スプレッド構文で展開して、新しい配列を作成
//       }),
//     )
//   })
// }

// useEffect(() => {
//   getDataone()
//   getDatzyu()
//   getDatatokyo()
//   getDataking()
//   // eslint-disable-next-line react-hooks/exhaustive-deps
// }, [])

// const o = query(databaseRef, where('email', '==', user.email), where('categori', '==', 'ONEPIECE'))
// const z = query(databaseRef, where('email', '==', user.email), where('categori', '==', '呪術廻戦'))
// const t = query(
//   databaseRef,
//   where('email', '==', user.email),
//   where('categori', '==', '東京リベンジャーズ'),
// )
// const k = query(
//   databaseRef,
//   where('email', '==', user.email),
//   where('categori', '==', 'キングダム'),
// )

// export const sample_data = [
//   { name: 'ONE PIECE', value: onpiece.length },
//   { name: '呪術廻戦', value: kaisen.length },
//   { name: 'キングダム', value: kingdom.length },
//   { name: '東京リベンジャーズ', value: tokyo.length },
// ]
