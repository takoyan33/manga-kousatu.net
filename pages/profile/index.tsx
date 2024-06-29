import React, { useEffect, useState, useCallback } from 'react'
import { database } from 'firebaseConfig'
import Link from 'next/link'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { deleteUser } from 'firebase/auth'
import TextField from '@mui/material/TextField'
import { CommonHead, ProfileId, CardPost, COLORS, AccountMenu } from 'layouts/components/ui'
import { useGetMyPosts, useGetMyUser } from 'layouts/components/hooks'
import { Legend, PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { useAuthContext } from 'layouts/context/AuthContext'

export default function Profile() {
  let router = useRouter()
  const { user } = useAuthContext()
  const databaseRef = collection(database, 'posts')
  const [users, setUsers] = useState(null)
  //データベースを取得
  const [posts, setPostData] = useState([])
  const [searchName, setSearchName] = useState('')
  const [onePiece, setOnePiece] = useState([])
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
    })
  }

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
      useGetMyPosts(setPostData, user.email)
      useGetMyUser(setUsers, user.email)
      getOnePosts()
      getKaisenPosts()
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

  const MANGA_DATA = [
    { name: 'ONE PIECE', value: onePiece.length },
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
      <AccountMenu onClick={deleteuser} />
      <>
        {users &&
          users.map((user) => {
            return (
              <>
                <ProfileId
                  key={user.id}
                  profileImage={user.profileimage}
                  username={user.username}
                  bio={user.bio}
                  favorite={user.favorite}
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

      <div className='relative my-10 overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-left text-sm text-gray-500 '>
          <thead className='bg-gray-50 text-xs uppercase text-gray-700 '>
            <tr>
              <th scope='col' className='px-6 py-3'>
                タイトル
              </th>
              <th scope='col' className='px-6 py-3'>
                <div className='flex items-center'>
                  カテゴリ
                  <a href='#'>
                    <svg
                      className='ml-1.5 h-3 w-3'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z' />
                    </svg>
                  </a>
                </div>
              </th>
              <th scope='col' className='px-6 py-3'>
                <div className='flex items-center'>
                  投稿日時
                  <a href='#'>
                    <svg
                      className='ml-1.5 h-3 w-3'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z' />
                    </svg>
                  </a>
                </div>
              </th>
              <th scope='col' className='px-6 py-3'>
                <div className='flex items-center'>
                  いいね数
                  <a href='#'>
                    <svg
                      className='ml-1.5 h-3 w-3'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z' />
                    </svg>
                  </a>
                </div>
              </th>
              <th scope='col' className='px-6 py-3'>
                <div className='flex items-center'>
                  公開状態
                  <a href='#'>
                    <svg
                      className='ml-1.5 h-3 w-3'
                      aria-hidden='true'
                      xmlns='http://www.w3.org/2000/svg'
                      fill='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path d='M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z' />
                    </svg>
                  </a>
                </div>
              </th>
              <th scope='col' className='px-6 py-3'>
                <span className='sr-only'>Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
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
                    <tr className='border-b bg-white' key={post.id}>
                      <Link href={`/post/${post.id}`}>
                        <th
                          scope='row'
                          className='whitespace-nowrap px-6 py-4 font-medium text-gray-900  hover:text-blue-600'
                        >
                          {post.title}
                        </th>
                      </Link>
                      <td className='px-6 py-4'>{post.categori}</td>
                      <td className='px-6 py-4'> {post.createtime}</td>
                      <td className='px-6 py-4'> {post.likes}</td>
                      <td className='px-6 py-4'>{post.display ? <p>公開</p> : <p>下書き</p>}</td>
                      <td className='px-6 py-4 text-right'>
                        <a href='#' className='font-medium text-blue-600 hover:underline'>
                          <Link href={`/post/edit/${post.id}`}>編集する</Link>
                        </a>
                      </td>
                    </tr>
                  </>
                )
              })}
          </tbody>
        </table>
      </div>
    </>
  )
}
