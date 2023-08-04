/* eslint-disable jsx-a11y/alt-text */
import { useRouter } from 'next/router'
import React, { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { database } from 'firebaseConfig'
import {
  collection,
  getDocs,
  doc,
  setDoc,
  updateDoc,
  deleteDoc,
  arrayUnion,
  query,
  arrayRemove,
  orderBy,
  serverTimestamp,
  where,
  onSnapshot,
} from 'firebase/firestore'
import { Avatar } from '@mui/material'
import { getAuth } from 'firebase/auth'
import Image from 'react-image-resizer'
import {
  getPost,
  getUsers,
  getMyUser,
  LikeDelete,
  getCategoriPosts,
} from 'layouts/components/hooks'
import { SiteButton } from 'layouts/components/button'
import { SiteCategory } from 'layouts/components/text'
import { CommonHead, CardPost } from 'layouts/components/ui'
import { deletePost } from 'layouts/api/auth'
import FavoriteIcon from '@mui/icons-material/Favorite'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { successNotify, errorNotify } from 'layouts/components/text'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import parse from 'html-react-parser'
import ListSubheader from '@mui/material/ListSubheader'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import SendIcon from '@mui/icons-material/Send'
import {
  FacebookShareButton,
  HatenaShareButton,
  LineShareButton,
  TwitterShareButton,
  FacebookIcon,
  HatenaIcon,
  LineIcon,
  TwitterIcon,
} from 'react-share'
import { FavoriteIconAnim } from 'layouts/components/ui/FavoriteIconAnim'

// バリデーションルール
const schema = yup.object({
  comment: yup.string().required('必須です'),
})

const Post = () => {
  const [comments, setComments] = useState('')
  const [users, setUsers] = useState(null)
  const [singlePost, setSinglePost] = useState([])
  const [likecount, setLikecount] = useState(0)
  const [userEmail, setUserEmail] = useState(null)
  const [categoriPosts, setCategoriPosts] = useState(null)
  const router = useRouter()
  const routerid = router.query.id
  const auth = getAuth()
  const user = auth.currentUser
  const styles = { whiteSpace: 'pre-line' }

  const URL = `http://localhost:8080/post/${routerid}`
  const QUOTE = `記事をシェアしました。　${singlePost.title}　漫画考察.net`

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const getComments = async () => {
    const commentsRef = collection(database, 'comments')
    const postComments = await query(commentsRef, where('postid', '==', routerid))
    onSnapshot(postComments, (querySnapshot) => {
      setComments(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })
  }

  useEffect(() => {
    // categoriFiredata();
    getPost(setSinglePost, routerid)
    setUserEmail(singlePost.email)
    getUsers(setUsers)
    // getMyUser(setUsers,)
    getComments()
    // getCategoriPosts(setCategoriPosts, singlePost.categori)
  }, [router])

  const deletePost = () => {
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
          getallPost()
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

  const LikeAdd = (routerid, likes) => {
    let fieldToEdit = doc(database, 'posts', routerid)
    updateDoc(fieldToEdit, {
      likes: likes + 1,
      likes_email: arrayUnion(user.email),
    })
      .then(() => {
        setOn((prev) => !prev)
        setLikecount(0)
        setTimeout(() => {
          getPost(setSinglePost, routerid)
        }, 2000)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  const LikeDelete = (routerid, likes) => {
    let fieldToEdit = doc(database, 'posts', routerid)
    updateDoc(fieldToEdit, {
      likes: likes - 1,
      likes_email: arrayRemove(user.email),
    })
      .then(() => {
        setLikecount(0)
        getPost(setSinglePost, routerid)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  //コメントの追加
  const addComment = async (data) => {
    const newDate = new Date().toLocaleString('ja-JP')
    const postRef = await doc(database, 'comments', routerid + (comments.length + 1).toString())

    await setDoc(postRef, {
      comment: data.comment,
      userid: user.uid,
      postid: singlePost.id,
      username: user.displayName,
      createtime: newDate,
      timestamp: serverTimestamp(),
      userEmail: user.email,
      userPhoto: user.photoURL,
      id: routerid + (comments.length + 1).toString(),
    })
      .then(() => {
        successNotify('コメントを投稿しました')
        getComments()
      })
      .catch((err) => {
        errorNotify('コメントの投稿に失敗しました')
      })
  }

  //コメントの削除
  const deleteComment = async (commentId) => {
    let deleteComment = doc(database, 'comments', commentId)
    deleteDoc(deleteComment)
      .then(() => {
        successNotify('コメントを削除しました')
      })
      .catch((err) => {
        errorNotify('失敗しました')
      })
  }

  const [on, setOn] = useState(false)

  return (
    <>
      <CommonHead />
      <ToastContainer />
      <div>
        <div>
          <div className='my-4 lg:w-full'>
            {user && (
              <>
                {user.email == singlePost.email && (
                  <>
                    <List
                      sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper' }}
                      component='nav'
                      aria-labelledby='nested-list-subheader'
                      subheader={
                        <ListSubheader component='div' id='nested-list-subheader'>
                          投稿編集
                        </ListSubheader>
                      }
                    >
                      <ListItemButton>
                        <ListItemIcon>
                          <SendIcon />
                        </ListItemIcon>
                        <Link
                          href={{
                            pathname: `/post/edit/${singlePost.id}`,
                            state: { data: singlePost },
                          }}
                        >
                          記事を編集する
                        </Link>
                      </ListItemButton>
                      <ListItemButton>
                        <ListItemIcon>
                          <SendIcon />
                        </ListItemIcon>
                        <button onClick={deletePost}>記事を削除する</button>
                      </ListItemButton>
                    </List>
                  </>
                )}
              </>
            )}
            <div className='rounded-xl border p-10 '>
              <div>
                <Link href='/top'>トップ</Link>　＞　投稿記事　＞　
                {singlePost.title}
              </div>
              <div className='my-6 flex justify-center'>
                <Image
                  className='m-auto max-w-sm text-center'
                  height={400}
                  width={400}
                  src={singlePost.downloadURL}
                />
              </div>
              <div className='my-4 text-2xl font-semibold'>{singlePost.title}</div>
              <br />
              <div>
                <span className='text-gray-500'>
                  <AccessTimeIcon /> {singlePost.createtime}
                </span>
                <span>
                  　<FavoriteIcon />
                  {singlePost.likes}
                </span>
              </div>
              {users &&
                users.map((user) => {
                  return (
                    <>
                      {singlePost.email === user.email && (
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
              {singlePost.edittime && (
                <div>
                  <AccessTimeIcon />
                  編集日時：{singlePost.edittime}
                </div>
              )}
              <br />
              {singlePost.selected &&
                singlePost.selected.map((tag, i) => (
                  <span
                    className='rounded-xl border border-cyan-700 py-1 px-2 text-center text-cyan-700'
                    key={i}
                  >
                    #{tag}
                  </span>
                ))}
              <div variant='body2' color='text.secondary'>
                {['ONEPIECE', '呪術廻戦', '東京リベンジャーズ', 'キングダム'].includes(
                  singlePost.categori,
                ) && (
                  <SiteCategory
                    className={`border-${
                      {
                        ONEPIECE: 'cyan',
                        呪術廻戦: 'purple',
                        東京リベンジャーズ: 'rose',
                        キングダム: 'yellow',
                      }[singlePost.categori]
                    }-500 text-${
                      {
                        ONEPIECE: 'cyan',
                        呪術廻戦: 'purple',
                        東京リベンジャーズ: 'rose',
                        キングダム: 'yellow',
                      }[singlePost.categori]
                    }-500 hover:bg-${
                      {
                        ONEPIECE: 'cyan',
                        呪術廻戦: 'purple',
                        東京リベンジャーズ: 'rose',
                        キングダム: 'yellow',
                      }[singlePost.categori]
                    }-700 my-4 inline-block rounded-xl  border p-1 text-center  font-bold hover:text-white`}
                    text={singlePost.categori}
                    href={`/post/categories/${singlePost.categori}`}
                  />
                )}

                {singlePost.netabare == 'ネタバレ有' ? (
                  <span className='mx-1 mt-1 inline-block rounded-xl border border-red-500 p-1 text-center text-red-500'>
                    {singlePost.netabare}
                  </span>
                ) : (
                  <span className='mx-1 mt-1 inline-block rounded-xl border border-gray-700 p-1 text-center text-gray-500'>
                    {singlePost.netabare}
                  </span>
                )}

                <div className='mt-2 mb-8'>
                  <FacebookShareButton url={URL} quote={QUOTE}>
                    <FacebookIcon size={24} round />
                  </FacebookShareButton>
                  <TwitterShareButton url={URL} title={QUOTE}>
                    <TwitterIcon size={24} round />
                  </TwitterShareButton>
                  <LineShareButton url={URL} title={QUOTE}>
                    <LineIcon size={24} round />
                  </LineShareButton>
                </div>

                {singlePost.context && (
                  <p className='text-left' style={styles}>
                    {parse(singlePost.context)}
                  </p>
                )}
              </div>
              <br />
              {singlePost.contextimage && (
                <div className='flex justify-center'>
                  <Image
                    className='m-auto max-w-sm text-center'
                    height={300}
                    width={300}
                    src={singlePost.contextimage}
                  />
                </div>
              )}
              <div className='my-4'>
                <span className='text-pink-400'>
                  <FavoriteIcon />
                </span>
                {singlePost.likes}
              </div>

              {singlePost.likes_email && user ? (
                singlePost.likes_email.includes(user.email) ? (
                  <>
                    <p>いいね済み</p>
                    <button
                      text='いいね解除する'
                      className='my-2 inline'
                      onClick={() => LikeDelete(routerid, singlePost.likes)}
                    >
                      <span className='py-4 text-pink-400 hover:text-pink-700'>
                        <FavoriteIcon />
                        いいね解除する
                      </span>
                    </button>
                  </>
                ) : (
                  <button onClick={() => LikeAdd(routerid, singlePost.likes)}>
                    <FavoriteIconAnim on={on} />
                    <span>いいねする</span>
                  </button>
                )
              ) : (
                <></>
              )}

              {!user && (
                <>
                  <Link href='/login'>
                    <span className='p-4 text-pink-400 hover:text-pink-700'>
                      <FavoriteIcon />
                      ログインするといいねができます
                    </span>
                  </Link>
                  <div className='mb-6 flex items-center justify-between'>
                    <h2 className='text-lg font-bold text-gray-900 lg:text-2xl '>
                      コメント ({comments.length})
                    </h2>
                    <Link href='/login'>
                      <p className='my-6 hover:text-gray-600'>ログインするとコメントできます</p>
                    </Link>
                  </div>
                </>
              )}
              {user && (
                <section className='bg-white py-8 lg:py-16'>
                  <div className='mx-auto max-w-2xl px-4'>
                    <div className='mb-6 flex items-center justify-between'>
                      <h2 className='text-lg font-bold text-gray-900 lg:text-2xl '>
                        コメント ({comments.length})
                      </h2>
                    </div>
                    <form className='mb-6' id='aa'>
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
                          {...register('comment', { required: 'コメントは必須です' })}
                          error={'comment' in errors}
                          helperText={errors.comment?.message}
                          label='コメント*（最大100文字)'
                        ></textarea>
                      </div>
                      {errors.comment && <p className='text-red-500'>コメントは必須です</p>}
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
                      {user && (
                        <>
                          {user.email == comment.userEmail && (
                            <>
                              <span
                                onClick={() => deleteComment(comment.id)}
                                className='text-primary-500 hover:text-primary-800 cursor-pointer'
                              >
                                削除する
                              </span>
                            </>
                          )}
                        </>
                      )}
                    </article>
                  )
                })}
              <hr className='mt-10'></hr>
              <div className='cursor-pointer'>
                {users?.map((user) => {
                  return (
                    <div className='hover:shadow-2xl'>
                      {singlePost.email === user.email && (
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
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
          <>
            {/* <h2 className="text-2xl">こちらもおすすめ</h2>
              <div className="max-w-7xl m-auto">
                <Grid container spacing={1}>
                  {singlePost.map((data) => {
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
                  {singlePost.length == 0 && (
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
