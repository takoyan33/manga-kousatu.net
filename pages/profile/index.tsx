/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { database } from '../../firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { deleteUser } from 'firebase/auth'
import TextField from '@mui/material/TextField'
import Grid from '@material-ui/core/Grid'
import { CommonHead } from '../../layouts/components/ui'
import { Profileid } from '../../layouts/components/ui/Profileid'
import { Cardpost } from '../../layouts/components/ui/Cardpost'
import ListSubheader from '@mui/material/ListSubheader'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import DraftsIcon from '@mui/icons-material/Drafts'
import SendIcon from '@mui/icons-material/Send'
import { query, where } from 'firebase/firestore'
import { Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { useAuthContext } from '../../layouts/context/AuthContext'

export default function Profile() {
  let router = useRouter()
  const { user } = useAuthContext()
  const databaseRef = collection(database, 'posts')
  const usersRef = collection(database, 'users')
  const [users, setUsers] = useState(null)
  //データベースを取得
  const [firedata, setFiredata] = useState([])
  const [likefiredata, setLikeFiredata] = useState([])
  const [searchName, setSearchName] = useState('')
  const [onpiece, setOnpiece] = useState([])
  const [kingdom, setKingdom] = useState([])
  const [tokyo, setTokyo] = useState([])
  const [kaisen, setKaisen] = useState([])

  const q = query(databaseRef, where('email', '==', user.email))
  const my = query(usersRef, where('email', '==', user.email))

  const o = query(
    databaseRef,
    where('email', '==', user.email),
    where('categori', '==', 'ONEPIECE'),
  )
  const z = query(
    databaseRef,
    where('email', '==', user.email),
    where('categori', '==', '呪術廻戦'),
  )
  const t = query(
    databaseRef,
    where('email', '==', user.email),
    where('categori', '==', '東京リベンジャーズ'),
  )
  const k = query(
    databaseRef,
    where('email', '==', user.email),
    where('categori', '==', 'キングダム'),
  )

  const likes = query(databaseRef, where("likes_email", "array-contains", user.email))

  const getData = async () => {
    //firestoreからデータ取得
    await getDocs(q).then((querySnapshot) => {
      //コレクションのドキュメントを取得
      setFiredata(
        querySnapshot.docs.map((data) => {
          //配列なので、mapで展開する
          return { ...data.data(), id: data.id }
          //スプレッド構文で展開して、新しい配列を作成
        }),
      )
    })
  }

  const getlikeData = async () => {
    //firestoreからデータ取得
    await getDocs(likes).then((querySnapshot) => {
      //コレクションのドキュメントを取得
      setLikeFiredata(
        querySnapshot.docs.map((data) => {
          //配列なので、mapで展開する
          return { ...data.data(), id: data.id }
          //スプレッド構文で展開して、新しい配列を作成
        }),
      )
    })
  }
  console.log(likefiredata)

  const getDataone = async () => {
    //firestoreからデータ取得
    await getDocs(o).then((querySnapshot) => {
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

  const getDatzyu = async () => {
    //firestoreからデータ取得
    await getDocs(z).then((querySnapshot) => {
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

  const getDatatokyo = async () => {
    //firestoreからデータ取得
    await getDocs(t).then((querySnapshot) => {
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

  const getDataking = async () => {
    //firestoreからデータ取得
    await getDocs(k).then((querySnapshot) => {
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
  const usersData = async () => {
    //firestoreからデータ取得
    await getDocs(my).then((querySnapshot) => {
      //コレクションのドキュメントを取得
      setUsers(
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
      getData()
      usersData()
      getDataone()
      getDatzyu()
      getDatatokyo()
      getlikeData()
      getDataking()
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
          router.push('/')
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

  const sample_data = [
    { name: 'ONE PIECE', value: onpiece.length },
    { name: '呪術廻戦', value: kaisen.length },
    { name: 'キングダム', value: kingdom.length },
    { name: '東京リベンジャーズ', value: tokyo.length },
  ]

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#ff6361', '#8884d8', '#C1C1C1']
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
          users.map((data) => {
            return (
              <>
                <Profileid
                  key={data.id}
                  profileimage={data.profileimage}
                  username={data.username}
                  bio={data.bio}
                  favorite={data.favarite}
                  id={0}
                />
              </>
            )
          })}
      </>

      <p className='my-12 text-center text-2xl font-semibold'>過去の投稿</p>
      <p className='text-1xl text-center'>投稿数　{firedata.length}件</p>
      <div>
        <ResponsiveContainer height={256}>
          <PieChart margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
            <Pie
              dataKey='value'
              data={sample_data}
              cx='50%'
              cy='50%'
              outerRadius={80}
              labelLine={false}
              label={renderCustomizedLabel}
              isAnimationActive={true}
            >
              {sample_data.map((entry, index) => (
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
        {firedata
          .filter((data) => {
            if (searchName === '') {
              return data
              //そのまま返す
            } else if (
              data.title.toLowerCase().includes(searchName.toLowerCase())
              //valのnameが含んでいたら小文字で返す　含んでいないvalは返さない
            ) {
              return data
            }
          })
          .map((data) => {
            return (
              <>
                <Cardpost
                  key={data.id}
                  downloadURL={data.downloadURL}
                  title={data.title}
                  categori={data.categori}
                  netabare={data.netabare}
                  context={data.context}
                  createtime={data.createtime}
                  displayname={data.displayname}
                  email={data.email}
                  id={data.id}
                  photoURL={data.photoURL}
                  likes={data.likes}
                  selected={data.selected}
                />
              </>
            )
          })}
      </Grid>

      <p className='my-12 text-center text-2xl font-semibold'>いいねした投稿</p>
      <p className='text-1xl text-center'>投稿数　{likefiredata.length}件</p>
      <Grid container className='m-auto'>
        {likefiredata.map((data) => {
          return (
            <>
              <Cardpost
                key={data.id}
                downloadURL={data.downloadURL}
                title={data.title}
                categori={data.categori}
                netabare={data.netabare}
                context={data.context}
                createtime={data.createtime}
                displayname={data.displayname}
                email={data.email}
                id={data.id}
                photoURL={data.photoURL}
                likes={data.likes}
                selected={data.selected}
              />
            </>
          )
        })}
      </Grid>
    </>
  )
}
