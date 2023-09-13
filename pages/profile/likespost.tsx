/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, useCallback } from 'react'
import { database } from 'firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useRouter } from 'next/router'
import TextField from '@mui/material/TextField'
import Grid from '@material-ui/core/Grid'
import { CommonHead, ProfileId, CardPost, COLORS, AccountMenu } from 'layouts/components/ui'
import { useGetLikedPosts, useGetMyUser } from 'layouts/components/hooks'
import { Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { useAuthContext } from 'layouts/context/AuthContext'

export default function Profile() {
  let router = useRouter()
  const { user } = useAuthContext()
  const databaseRef = collection(database, 'posts')
  const [users, setUsers] = useState(null)
  //データベースを取得
  const [posts, setPostData] = useState([])
  const [likedPosts, setLikedPosts] = useState([])
  const [searchName, setSearchName] = useState('')
  const [onpiece, setOnpiece] = useState([])
  const [kingdom, setKingdom] = useState([])
  const [tokyo, setTokyo] = useState([])
  const [kaisen, setKaisen] = useState([])

  const myOnePosts = query(
    databaseRef,
    where('email', '==', user.email),
    where('categori', '==', 'ONEPIECE'),
  )
  const myKaisenPosts = query(
    databaseRef,
    where('email', '==', user.email),
    where('categori', '==', '呪術廻戦'),
  )
  const myTokyoPosts = query(
    databaseRef,
    where('email', '==', user.email),
    where('categori', '==', '東京リベンジャーズ'),
  )
  const MyKingPosts = query(
    databaseRef,
    where('email', '==', user.email),
    where('categori', '==', 'キングダム'),
  )

  const getDataone = async () => {
    //firestoreからデータ取得
    await getDocs(myOnePosts).then((querySnapshot) => {
      //コレクションのドキュメントを取得
      setOnpiece(
        querySnapshot.docs.map((data) => {
          //配列なので、mapで展開する
          return { ...data.data(), id: data.id }
          //スプレッド構文で展開して、新しい配列を作成
        }),
      )
    })
  }

  const getKaisenPost = async () => {
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
      useGetLikedPosts(setLikedPosts, user.email)
      useGetMyUser(setUsers, user.email)
      getDataone()
      getKaisenPost()
      getTokyoPosts()
      getKingPosts()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const MANGA_DATA = [
    { name: 'ONE PIECE', value: onpiece.length },
    { name: '呪術廻戦', value: kaisen.length },
    { name: 'キングダム', value: kingdom.length },
    { name: '東京リベンジャーズ', value: tokyo.length },
  ]

  const RADIAN = Math.PI / 180
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
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
    <>
      <CommonHead />
      <h2 className='m-5 my-12 text-center text-2xl font-semibold'>いいねした投稿</h2>

      <div>
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
      </div>

      <TextField
        type='text'
        id='outlined-basic'
        label='考察記事を検索する'
        variant='outlined'
        onChange={(event) => {
          setSearchName(event.target.value)
        }}
      />
      <p className='text-1xl text-center'>投稿数　{likedPosts.length}件</p>
      <Grid container className='m-auto'>
        {likedPosts.map((post) => {
          return (
            <>
              <CardPost
                key={post.id}
                downloadURL={post.downloadURL}
                title={post.title}
                categori={post.categori}
                netabare={post.netabare}
                context={post.context}
                createtime={post.createtime}
                displayname={post.displayname}
                email={post.email}
                id={post.id}
                photoURL={post.photoURL}
                likes={post.likes}
                selected={post.selected}
              />
            </>
          )
        })}
      </Grid>
    </>
  )
}
