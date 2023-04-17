/* eslint-disable jsx-a11y/alt-text */
import { useRouter } from 'next/router'
import React from 'react'
import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { database } from '../../firebaseConfig'
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
} from 'firebase/firestore'
import { TextField, Box, FormLabel, Button, Avatar } from '@mui/material'
import { getAuth } from 'firebase/auth'
import Image from 'react-image-resizer'
import { SiteButton } from '../../layouts/components/button'
import { SiteCategory } from '../../layouts/components/text'
import { CommonHead, Cardpost } from '../../layouts/components/ui'
import FavoriteIcon from '@mui/icons-material/Favorite'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import { query, orderBy, where } from 'firebase/firestore'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { notify, signupmissnotify } from '../../layouts/components/text/SiteModal'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import parse from 'html-react-parser'
import Categori from '../../layouts/components/text/Categori'

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
          <div className='lg:w-full my-4'>
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
                      <SiteButton href='' text='更新する' className=' my-2 m-4' />
                    </Link>

                    <SiteButton
                      href=''
                      text='削除する'
                      className=' my-2 m-4'
                      onClick={deleteDocument}
                    />
                  </div>
                )}
              </>
            )}
            <div className='border p-10 rounded-xl '>
              <div>
                <Link href='/top'>トップ</Link>　＞　投稿記事　＞　
                {recfiredata.title}
              </div>
              <div className='flex justify-center my-6'>
                <Image
                  className='m-auto text-center max-w-sm'
                  height={400}
                  width={400}
                  src={recfiredata.downloadURL}
                />
              </div>
              <div className='text-2xl my-4 font-semibold'>{recfiredata.title}</div>
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
                            <div className='my-4 flex m-auto  px-2'>
                              <div key={user.id}>
                                <div>
                                  <Avatar
                                    className='m-auto text-center max-w-sm border'
                                    alt='プロフィール'
                                    sx={{ width: 60, height: 60 }}
                                    src={user.profileimage}
                                  />
                                </div>
                              </div>
                              <div className='ml-6 mt-1'>
                                <span className='text-sm'>{user.username}</span>
                                <div className='text-sm mt-2 pb-2 text-gray-500'>{user.bio}</div>
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
                    className='text-cyan-700 border border-cyan-700 rounded-xl py-1 px-2 text-center'
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
                    }-700 p-1 inline-block font-bold  border rounded-xl text-center  hover:text-white my-4`}
                    text={recfiredata.categori}
                    href={`/post/categories/${recfiredata.categori}`}
                  />
                )}
                {/* <Categori categori={recfiredata.categori} /> */}

                {recfiredata.netabare == 'ネタバレ有' ? (
                  <span className='text-red-500 border border-red-500 rounded-xl mx-1 mt-1 p-1 inline-block text-center'>
                    {recfiredata.netabare}
                  </span>
                ) : (
                  <span className='text-gray-500 border border-gray-700 rounded-xl mx-1 mt-1 p-1 inline-block text-center'>
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
                    className='m-auto text-center max-w-sm'
                    height={300}
                    width={300}
                    src={recfiredata.contextimage}
                  />
                </div>
              )}
              <div className='my-4'>
                <FavoriteIcon />
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
                      className='inline my-2 m-4'
                      onClick={() => LikeAdd(routerid, recfiredata.likes)}
                    >
                      いいねする
                    </button>
                  )
                ) : (
                  <p></p>
                ))}
              {user && (
                <section className='bg-white py-8 lg:py-16'>
                  <div className='max-w-2xl mx-auto px-4'>
                    <div className='flex justify-between items-center mb-6'>
                      <h2 className='text-lg lg:text-2xl font-bold text-gray-900 '>
                        コメント ({comments.length})
                      </h2>
                    </div>
                    <form className='mb-6'>
                      <div className='py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200  dark:border-gray-700'>
                        <label for='comment' className='sr-only'>
                          あなたのコメント
                        </label>
                        <textarea
                          id='comment'
                          rows='6'
                          className='px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none  dark:placeholder-gray-400 '
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
                        className='py-2.5 px-4 text-xs font-medium text-center rounded-lg focus:ring-4 focus:ring-primary-200  hover:bg-primary-800 m-auto'
                      >
                        コメントする
                      </button>
                    </form>
                  </div>
                </section>
              )}

              {!user && (
                <>
                  <p className='my-6'>ログインするといいねできます</p>
                  <div className='flex justify-between items-center mb-6'>
                    <h2 className='text-lg lg:text-2xl font-bold text-gray-900 '>
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
                      className='p-6 mb-6 text-base border bg-white rounded-lg'
                      key={comment.id}
                    >
                      <footer className='flex justify-between items-center mb-2'>
                        <div className='flex items-center'>
                          <p className='inline-flex items-center mr-3 text-sm text-gray-900 '>
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
                              <div className='border my-8 py-8 flex m-auto  px-2'>
                                <div key={user.id}>
                                  <div>
                                    <Avatar
                                      className='m-auto text-center max-w-sm border'
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
