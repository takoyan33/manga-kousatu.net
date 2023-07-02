/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { database } from 'firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { deleteUser } from 'firebase/auth'
import TextField from '@mui/material/TextField'
import Grid from '@material-ui/core/Grid'
import { CommonHead, ProfileId, CardPost, COLORS } from 'layouts/components/ui'
import { getMyPosts, getLikedPosts, getMyUser } from 'layouts/components/hooks'
import ListSubheader from '@mui/material/ListSubheader'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import DraftsIcon from '@mui/icons-material/Drafts'
import SendIcon from '@mui/icons-material/Send'
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
      getMyPosts(setPostData, user.email)
      getLikedPosts(setLikedPosts, user.email)
      getMyUser(setUsers, user.email)
      getDataone()
      getKaisenPost()
      getTokyoPosts()
      getKingPosts()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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

  // const deleteDocument = useCallback((id) => {
  //   let fieldToEdit = doc(database, "posts", id);
  //   let checkSaveFlg = window.confirm("削除しても大丈夫ですか？");

  //   if (checkSaveFlg) {
  //     deleteDoc(fieldToEdit)
  //       .then(() => {
  //         alert("記事を削除しました");
  //         getData();
  //       })
  //       .catch((err) => {
  //         alert("記事の削除に失敗しました");
  //       });
  //   } else {
  //     router.push("/profile");
  //   }
  // }, []);

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
      <h2 className='m-5 my-12 text-center text-2xl font-semibold'>プロフィール</h2>

      <List
        sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}
        component='nav'
        aria-labelledby='nested-list-subheader'
        subheader={
          <ListSubheader component='div' id='nested-list-subheader'>
            アカウントメニュー
          </ListSubheader>
        }
      >
        <ListItemButton>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <Link href='/profile/edit'> プロフィールを変更する</Link>
        </ListItemButton>
        <ListItemButton>
          <ListItemIcon>
            <DraftsIcon />
          </ListItemIcon>
          <button className='' onClick={deleteuser}>
            アカウントを退会する
          </button>
        </ListItemButton>
        {/* <button className="m-5">
          <Link href="/profile/emailedit">メールアドレスを変更する</Link>
        </button> */}
        <ListItemButton>
          <ListItemIcon>
            <SendIcon />
          </ListItemIcon>
          <Link href='/profile/edit/password'>パスワードを変更する</Link>
        </ListItemButton>
      </List>

      <>
        {users &&
          users.map((user) => {
            return (
              <>
                <ProfileId
                  key={user.id}
                  profileimage={user.profileimage}
                  username={user.username}
                  bio={user.bio}
                  favorite={user.favarite}
                  id={0}
                />
              </>
            )
          })}
      </>

      <p className='my-12 text-center text-2xl font-semibold'>過去の投稿</p>
      <p className='text-1xl text-center'>投稿数　{posts.length}件</p>
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

      <Grid container className='m-auto'>
        {posts
          .filter((post) => {
            if (searchName === '') {
              return post
              //そのまま返す
            } else if (
              post.title.toLowerCase().includes(searchName.toLowerCase())
              //valのnameが含んでいたら小文字で返す　含んでいないvalは返さない
            ) {
              return post
            }
          })
          .map((post) => {
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

      <p className='my-12 text-center text-2xl font-semibold'>いいねした投稿</p>
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
