import { deleteUser } from 'firebase/auth'
import { getDocs, query, where } from 'firebase/firestore'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { COLORS } from '../../layouts/components/ui'
import { useAuthContext } from '../../layouts/context/AuthContext'
import { useGetMyPosts, useGetMyUser } from '../../layouts/hooks'
import { postsRef } from '../../utils/post'
// import { SiteButton } from 'layouts/components/button'
import { GetPost } from 'types/post'
import { GetUser } from 'types/user'

// eslint-disable-next-line react/display-name
export const DisplayChart = React.memo(() => {
  const router = useRouter()
  const { user } = useAuthContext()
  const [users, setUsers] = useState<GetUser>()
  const [postsData, setPostData] = useState<Array<GetPost>>([])
  const [onePiece, setOnePiece] = useState<any>([])
  const [kingdom, setKingdom] = useState<any>([])
  const [tokyo, setTokyo] = useState<any>([])
  const [kaisen, setKaisen] = useState<any>([])

  const myOnePosts = query(
    postsRef,
    where('email', '==', user.email),
    where('category', '==', 'ONEPIECE'),
  )
  const myKaisenPosts = query(
    postsRef,
    where('email', '==', user.email),
    where('category', '==', '呪術廻戦'),
  )
  const myTokyoPosts = query(
    postsRef,
    where('email', '==', user.email),
    where('category', '==', '東京リベンジャーズ'),
  )
  const MyKingPosts = query(
    postsRef,
    where('email', '==', user.email),
    where('category', '==', 'キングダム'),
  )

  // onepieceのpostの取得
  const getOnePosts = async () => {
    //firestoreからデータ取得
    await getDocs(myOnePosts).then((querySnapshot) => {
      //コレクションのドキュメントを取得
      setOnePiece(
        querySnapshot.docs.map((data) => {
          //配列なので、mapで展開する
          return { ...data.data(), id: data.id }
          //スプレッド構文で展開して、新しい配列を作成
        }),
      )
      console.log(onePiece)
    })
  }

  // onepieceのpostの取得
  const getKaisenPosts = async () => {
    //firestoreからデータ取得
    await getDocs(myKaisenPosts).then((querySnapshot) => {
      //コレクションのドキュメントを取得
      setKaisen(
        querySnapshot.docs.map((data) => {
          //配列なので、mapで展開する
          return { ...data.data(), id: data.id }
          //スプレッド構文で展開して、新しい配列を作成
        }),
      )
    })
  }

  // onepieceのpostの取得
  const getTokyoPosts = async () => {
    //firestoreからデータ取得
    await getDocs(myTokyoPosts).then((querySnapshot) => {
      //コレクションのドキュメントを取得
      setTokyo(
        querySnapshot.docs.map((data) => {
          //配列なので、mapで展開する
          return { ...data.data(), id: data.id }
          //スプレッド構文で展開して、新しい配列を作成
        }),
      )
    })
  }

  // onepieceのpostの取得
  const getKingPosts = async () => {
    //firestoreからデータ取得
    await getDocs(MyKingPosts).then((querySnapshot) => {
      //コレクションのドキュメントを取得
      setKingdom(
        querySnapshot.docs.map((data) => {
          //配列なので、mapで展開する
          return { ...data.data(), id: data.id }
          //スプレッド構文で展開して、新しい配列を作成
        }),
      )
    })
  }

  useEffect(() => {
    if (!user) {
      router.push('/register')
    } else {
      useGetMyPosts(setPostData, user.email)
      useGetMyUser(setUsers, user.uid)
      console.log(users)
      getOnePosts()
      getKaisenPosts()
      getTokyoPosts()
      getKingPosts()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // userの削除
  const deleteuser = async () => {
    //userを削除する
    if (user) {
      deleteUser(user)
        //user削除
        .then(() => {
          localStorage.removeItem('Token')
          //tokenを削除
          alert('退会しました。TOP画面に戻ります。')
          router.push('/top')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  }

  type MangaData = {
    name: 'ONEPIECE' | '呪術廻戦' | '東京リベンジャーズ' | 'キングダム'
    value: number
  }

  const MANGA_DATA: MangaData[] = [
    { name: 'ONEPIECE', value: onePiece.length },
    { name: '呪術廻戦', value: kaisen.length },
    { name: 'キングダム', value: kingdom.length },
    { name: '東京リベンジャーズ', value: tokyo.length },
  ]

  type LabelProps = {
    cx: number
    cy: number
    midAngle: number
    innerRadius: number
    outerRadius: number
    percent: number
  }

  const RADIAN = Math.PI / 180
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
  }: LabelProps) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return (
      <text x={x} y={y} fill='white' textAnchor='middle' dominantBaseline='central'>
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    )
  }
  return (
    <ResponsiveContainer height={256}>
      <PieChart margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
        <Pie
          dataKey='value'
          data={MANGA_DATA}
          cx='50%'
          cy='50%'
          outerRadius={80}
          labelLine={false}
          label={renderCustomizedLabel}
          isAnimationActive={true}
        >
          {MANGA_DATA.map((entry, index) => (
            <Cell fill={COLORS[index % COLORS.length]} key={index} />
          ))}
        </Pie>
        <Legend verticalAlign='bottom' wrapperStyle={{ bottom: 18 }} />
      </PieChart>
    </ResponsiveContainer>
  )
})
