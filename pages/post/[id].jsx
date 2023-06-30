/* eslint-disable jsx-a11y/alt-text */
import { useRouter } from 'next/router'
import React from 'react'
import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { database } from 'firebaseConfig'
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
import { Avatar } from '@mui/material'
import { getAuth } from 'firebase/auth'
import Image from 'react-image-resizer'
import { SiteButton } from 'layouts/components/button'
import { SiteCategory } from 'layouts/components/text'
import { CommonHead, CardPost } from 'layouts/components/ui'
import FavoriteIcon from '@mui/icons-material/Favorite'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import { } from 'firebase/firestore'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { notify, signupmissnotify } from 'layouts/components/text/SiteModal'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import parse from 'html-react-parser'

// バリデーションルール
const schema = yup.object({
  comment: yup.string().required('必須です'),
})

const Post = () => {
  const [comments, setComments] = useState('')
  const [users, setUsers] = useState(null)
  const databaseRef = collection(database, 'posts')
  //データベースを取得
  const [recfiredata, setRecfiredata] = useState([])
  const [likecount, setLikecount] = useState(0)
  const usersRef = collection(database, 'users')
  const [userid, setUserid] = useState(null)

  const router = useRouter()
  const routerid = router.query.id
  const auth = getAuth()
  const user = auth.currentUser
  const styles = { whiteSpace: 'pre-line' }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const getPost = async () => {
    try {
      const ref = await doc(database, 'posts', routerid)
      const snap = await getDoc(ref)
      setRecfiredata(snap.data())
      console.log('recfiredata', recfiredata)
    } catch (error) {
      console.log(error)
    }
  }

  const getallComment = async () => {
    const commentseRef = collection(database, 'comments')
    const c = await query(commentseRef, where('postid', '==', routerid))
    try {
      const querySnapshot = await getDocs(c)
      const allcomments = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      console.log('allcomments', allcomments)
      await setComments(allcomments)
    } catch (error) {
      console.log('Error fetching user data', error)
    }
  }

  // const categoriFiredata = async () => {
  //   //firestoreからデータ取得
  //   await getDocs(q).then((querySnapshot) => {
  //     //コレクションのドキュメントを取得
  //     setRecfiredata(
  //       querySnapshot.docs.map((data) => {
  //         //配列なので、mapで展開する
  //         return { ...data.data(), id: data.id }
  //         //スプレッド構文で展開して、新しい配列を作成
  //       }),
  //     )
  //   })
  // }

  // const yourprofile = query(usersRef, where('userid', '==', userid))

  // const fetchUserProfile = async () => {
  //   //firestoreからデータ取得
  //   try {
  //     const querySnapshot = await getDocs(yourprofile)
  //     const userData = querySnapshot.docs.map((doc) => ({
  //       ...doc.data(),
  //       id: doc.id,
  //     }))
  //     setUsers(userData)
  //   } catch (error) {
  //     console.log('Error fetching user data', error)
  //   }
  // }

  const usersData = async () => {
    //firestoreからデータ取得
    await getDocs(usersRef).then((response) => {
      //コレクションのドキュメントを取得
      setUsers(
        response.docs.map((data) => {
          //配列なので、mapで展開する
          return { ...data.data(), id: data.id }
          //スプレッド構文で展開して、新しい配列を作成
        }),
      )
    })
  }

  useEffect(() => {
    // categoriFiredata();
    getPost()
    usersData()
    getallComment()
  }, [router])

  const deleteDocument = () => {
    //data.idを送っているのでidを受け取る
    let deletepost = doc(database, 'posts', routerid)
    let checkSaveFlg = window.confirm('削除しても大丈夫ですか？')
    //確認画面を出す
    if (checkSaveFlg) {
      deleteDoc(deletepost)
        //記事を削除する
        .then(() => {
          notify('記事を削除しました')
          setTimeout(() => {
            router.push('/top')
          }, 2000)
          getallPost()
        })
        .catch((err) => {
          signupmissnotify('失敗しました')
        })
    } else {
      setTimeout(() => {
        router.push('/top')
      }, 2000)
    }
  }

  const LikeAdd = (routerid, likes) => {
    console.log(routerid)
    let fieldToEdit = doc(database, 'posts', routerid)
    updateDoc(fieldToEdit, {
      likes: likes + 1,
      likes_email: arrayUnion(user.email),
    })
      .then(() => {
        console.log(user.email)
        setLikecount(0)
        notify('成功しました')
        getPost()
      })
      .catch((err) => {
        signupmissnotify('失敗しました')
        console.log(err)
      })
  }
  const addComment = async (data) => {
    const newdate = new Date().toLocaleString('ja-JP')
    const postRef = await doc(database, 'comments', routerid + (comments.length + 1).toString())

    await setDoc(postRef, {
      comment: data.comment,
      userid: user.uid,
      postid: recfiredata.id,
      username: user.displayName,
      createtime: newdate,
      id: routerid + (comments.length + 1).toString(),
    })
      .then(() => {
        notify('コメントを投稿しました')
        getallComment()
      })
      .catch((err) => {
        notify('コメントを投稿しました')
      })
  }

  return (
    <>
      <CommonHead />
      <ToastContainer />
      <div>
        <div>
          <div className='my-4 lg:w-full'>
            {user && (
              <>
                {user.email == recfiredata.email && (
                  <div>
                    <Link
                      href={{
                        pathname: `/post/edit/${recfiredata.id}`,
                        state: { data: recfiredata },
                      }}
                    >
                      <SiteButton href='' text='更新する' className=' m-4 my-2' />
                    </Link>

                    <SiteButton
                      href=''
                      text='削除する'
                      className=' m-4 my-2'
                      onClick={deleteDocument}
                    />
                  </div>
                )}
              </>
            )}
            <div className='rounded-xl border p-10 '>
              <div>
                <Link href='/top'>トップ</Link>　＞　投稿記事　＞　
                {recfiredata.title}
              </div>
              <div className='my-6 flex justify-center'>
                <Image
                  className='m-auto max-w-sm text-center'
                  height={400}
                  width={400}
                  src={recfiredata.downloadURL}
                />
              </div>
              <div className='my-4 text-2xl font-semibold'>{recfiredata.title}</div>
              <br></br>
              <div>
                <span className='text-gray-500'>
                  <AccessTimeIcon /> {recfiredata.createtime}
                </span>
                <span>
                  　<FavoriteIcon />
                  {recfiredata.likes}
                </span>
              </div>
              {users &&
                users.map((user) => {
                  return (
                    <>
                      {recfiredata.email === user.email && (
                        <Link href={`/profile/${user.userid}`}>
                          <div key={user.userid}>
                            <div className='m-auto my-4 flex  px-2'>
                              <div key={user.id}>
                                <div>
                                  <Avatar
                                    className='m-auto max-w-sm border text-center'
                                    alt='プロフィール'
                                    sx={{ width: 60, height: 60 }}
                                    src={user.profileimage}
                                  />
                                </div>
                              </div>
                              <div className='ml-6 mt-1'>
                                <span className='text-sm'>{user.username}</span>
                                <div className='mt-2 pb-2 text-sm text-gray-500'>{user.bio}</div>
                              </div>
                            </div>
                          </div>
                        </Link>
                      )}
                    </>
                  )
                })}
              {recfiredata.edittime && (
                <div>
                  <AccessTimeIcon />
                  編集日時：{recfiredata.edittime}
                </div>
              )}
              <br></br>
              {recfiredata.selected &&
                recfiredata.selected.map((tag, i) => (
                  <span
                    className='rounded-xl border border-cyan-700 py-1 px-2 text-center text-cyan-700'
                    key={i}
                  >
                    #{tag}
                  </span>
                ))}
              <div variant='body2' color='text.secondary'>
                {['ONEPIECE', '呪術廻戦', '東京リベンジャーズ', 'キングダム'].includes(
                  recfiredata.categori,
                ) && (
                  <SiteCategory
                    className={`border-${
                      {
                        ONEPIECE: 'cyan',
                        呪術廻戦: 'purple',
                        東京リベンジャーズ: 'rose',
                        キングダム: 'yellow',
                      }[recfiredata.categori]
                    }-500 text-${
                      {
                        ONEPIECE: 'cyan',
                        呪術廻戦: 'purple',
                        東京リベンジャーズ: 'rose',
                        キングダム: 'yellow',
                      }[recfiredata.categori]
                    }-500 hover:bg-${
                      {
                        ONEPIECE: 'cyan',
                        呪術廻戦: 'purple',
                        東京リベンジャーズ: 'rose',
                        キングダム: 'yellow',
                      }[recfiredata.categori]
                    }-700 my-4 inline-block rounded-xl  border p-1 text-center  font-bold hover:text-white`}
                    text={recfiredata.categori}
                    href={`/post/categories/${recfiredata.categori}`}
                  />
                )}

                {recfiredata.netabare == 'ネタバレ有' ? (
                  <span className='mx-1 mt-1 inline-block rounded-xl border border-red-500 p-1 text-center text-red-500'>
                    {recfiredata.netabare}
                  </span>
                ) : (
                  <span className='mx-1 mt-1 inline-block rounded-xl border border-gray-700 p-1 text-center text-gray-500'>
                    {recfiredata.netabare}
                  </span>
                )}

                {recfiredata.context && (
                  <p className='text-left' style={styles}>
                    {parse(recfiredata.context)}
                  </p>
                )}
              </div>
              <br></br>
              {recfiredata.contextimage && (
                <div className='flex justify-center'>
                  <Image
                    className='m-auto max-w-sm text-center'
                    height={300}
                    width={300}
                    src={recfiredata.contextimage}
                  />
                </div>
              )}
              <div className='my-4'>
                <span className='text-pink-400'>
                  <FavoriteIcon />
                </span>
                {recfiredata.likes}
              </div>
              {user &&
                (recfiredata.likes_email ? (
                  recfiredata.likes_email.includes(user.email) ? (
                    <p>すでにいいね済みです</p>
                  ) : (
                    <button
                      href=''
                      text='いいねする'
                      className='m-4 my-2 inline'
                      onClick={() => LikeAdd(routerid, recfiredata.likes)}
                    >
                      <span className='p-4 text-pink-400 hover:text-pink-700'>
                        <FavoriteIcon />
                        いいね
                      </span>
                    </button>
                  )
                ) : (
                  <p></p>
                ))}
              {user && (
                <section className='bg-white py-8 lg:py-16'>
                  <div className='mx-auto max-w-2xl px-4'>
                    <div className='mb-6 flex items-center justify-between'>
                      <h2 className='text-lg font-bold text-gray-900 lg:text-2xl '>
                        コメント ({comments.length})
                      </h2>
                    </div>
                    <form className='mb-6'>
                      <div className='mb-4 rounded-lg rounded-t-lg border border-gray-200 bg-white py-2 px-4  dark:border-gray-700'>
                        <label for='comment' className='sr-only'>
                          あなたのコメント
                        </label>
                        <textarea
                          id='comment'
                          rows='6'
                          className='w-full border-0 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0  dark:placeholder-gray-400 '
                          placeholder='コメントを入力してください'
                          required
                          {...register('comment')}
                          error={'comment' in errors}
                          helperText={errors.comment?.message}
                          label='コメント*（最大100文字)'
                        ></textarea>
                      </div>
                      <button
                        type='submit'
                        onClick={handleSubmit(addComment)}
                        className='focus:ring-primary-200 hover:bg-primary-800 m-auto rounded-lg py-2.5 px-4 text-center text-xs  font-medium focus:ring-4'
                      >
                        コメントする
                      </button>
                    </form>
                  </div>
                </section>
              )}

              {!user && (
                <>
                  <button
                    href=''
                    text='いいねする'
                    className='m-4 my-2 inline'
                    onClick={() => notify('ログインするといいねができます')}
                  >
                    <span className='p-4 text-pink-400 hover:text-pink-700'>
                      <FavoriteIcon />
                      いいね
                    </span>
                  </button>
                  <div className='mb-6 flex items-center justify-between'>
                    <h2 className='text-lg font-bold text-gray-900 lg:text-2xl '>
                      コメント ({comments.length})
                    </h2>
                    <p className='my-6'>ログインするとコメントできます</p>
                  </div>
                </>
              )}

              {comments &&
                comments.map((comment) => {
                  return (
                    <article
                      className='mb-6 rounded-lg border bg-white p-6 text-base'
                      key={comment.id}
                    >
                      <footer className='mb-2 flex items-center justify-between'>
                        <div className='flex items-center'>
                          <p className='mr-3 inline-flex items-center text-sm text-gray-900 '>
                            {comment.username}
                          </p>
                          <p className='text-sm text-gray-600 dark:text-gray-400'>
                            <time pubdate datetime='2022-02-08' title='February 8th, 2022'>
                              {comment.createtime}
                            </time>
                          </p>
                        </div>
                      </footer>
                      <p className='text-gray-500 dark:text-gray-400'>{comment.comment}</p>
                    </article>
                  )
                })}
              <hr className='mt-10'></hr>
              <div className='cursor-pointer'>
                {users &&
                  users.map((user) => {
                    return (
                      <>
                        {recfiredata.email === user.email && (
                          <Link href={`/profile/${user.userid}`}>
                            <div key={user.userid}>
                              <div className='m-auto my-8 flex border py-8  px-2'>
                                <div key={user.id}>
                                  <div>
                                    <Avatar
                                      className='m-auto max-w-sm border text-center'
                                      alt='プロフィール'
                                      sx={{ width: 80, height: 80 }}
                                      src={user.profileimage}
                                    />
                                  </div>
                                </div>
                                <div className='ml-6 mt-4'>
                                  <span className=''>
                                    <AccountBoxIcon /> {user.username}
                                  </span>
                                  <div className=' mt-2 pb-2 text-gray-500'>
                                    <BorderColorIcon />
                                    {user.bio}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        )}
                      </>
                    )
                  })}
              </div>
            </div>
          </div>
          <>
            {/* <h2 className="text-2xl">こちらもおすすめ</h2>
              <div className="max-w-7xl m-auto">
                <Grid container spacing={1}>
                  {recfiredata.map((data) => {
                    return (
                      <CardPost
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
                        selected={data.selected}
                      />
                    );
                  })}
                  {recfiredata.length == 0 && (
                    <p className="text-center m-auto my-6 text-2xl">
                      まだ投稿されていません
                    </p>
                  )}
                </Grid>
              </div> */}
          </>
        </div>
      </div>
    </>
  )
}

export default Post
