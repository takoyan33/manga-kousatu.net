/* eslint-disable jsx-a11y/alt-text */
import { useRouter } from 'next/router'
import React, { useEffect, useState, useCallback } from 'react'
import { Stack, FormLabel } from '@mui/material'
import { SiteButton } from 'layouts/components/button'
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
  useGetPost,
  useGetUsers,
  useGetMyUser,
  useGetCategoryPosts,
  useGetOtherUser,
  deleteComment,
  getComments,
} from 'layouts/components/hooks'
import { SiteCategory } from 'layouts/components/text'
import { CommonHead, RecommendCardPost } from 'layouts/components/ui'
// import { deletePost } from 'layouts/api/auth'
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
// import {
//   FacebookShareButton,
//   TwitterShareButton,
//   FacebookIcon,
//   LineShareButton,
//   LineIcon,
//   TwitterIcon,
// } from 'react-share'
import { FavoriteIconAnim } from 'layouts/components/ui/FavoriteIconAnim'
import Modal from 'react-modal'
import { GetPost } from 'types/post'
import { GetUser } from 'types/user'
import { GetComment } from 'types/comment'

// バリデーションルール
const schema = yup.object({
  comment: yup.string().required('必須です'),
})

const Post = () => {
  const [comment, setComment] = useState<string>('')
  const [comments, setComments] = useState<Array<GetComment>>([])
  const [users, setUsers] = useState<Array<GetUser>>([])
  const [singlePost, setSinglePost] = useState<GetPost>(null)
  const [likecount, setLikecount] = useState<number>(0)
  const [categoryPosts, setCategoryPosts] = useState([])
  const [on, setOn] = useState<boolean>(false)
  const router = useRouter()
  const routerid = router.query.id
  const auth = getAuth()
  const user = auth.currentUser

  // const URL = `http://localhost:8080/post/${routerid}`
  // const QUOTE = `記事をシェアしました。　${singlePost.title}　漫画考察.net`

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  useEffect(() => {
    useGetPost(setSinglePost, routerid)
    useGetUsers(setUsers)
    getComments(setComments, routerid)
  }, [routerid])

  useEffect(() => {
    if (singlePost && singlePost.category) {
      useGetCategoryPosts(setCategoryPosts, singlePost.category, routerid)
    }
  }, [singlePost])

  //記事の削除
  const deletePost = (routerId) => {
    //data.idを送っているのでidを受け取る
    let deletePost = doc(database, 'posts', routerId.toString())
    let checkSaveFlg = window.confirm('削除しても大丈夫ですか？')
    //確認画面を出す
    if (checkSaveFlg) {
      deleteDoc(deletePost)
        .then(() => {
          successNotify('記事を削除しました')
          setTimeout(() => {
            router.push('/top')
          }, 2000)
        })
        .catch(() => {
          errorNotify('失敗しました')
        })
    } else {
    }
  }

  //いいねの追加
  const LikeAdd = (routerId, likes: number, email: string) => {
    let post = doc(database, 'posts', routerId)
    updateDoc(post, {
      likes: likes + 1,
      likesEmail: arrayUnion(email),
    })
      .then(() => {
        setOn((prev) => !prev)
        setLikecount(0)
        setTimeout(() => {
          useGetPost(setSinglePost, routerId)
        }, 2000)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  //いいねの削除
  const LikeDelete = (routerId, likes: number, email: string) => {
    let post = doc(database, 'posts', routerId)
    updateDoc(post, {
      likes: likes - 1,
      likesEmail: arrayRemove(email),
    })
      .then(() => {
        setLikecount(0)
        useGetPost(setSinglePost, routerId)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  //コメントの追加
  const addComment = async (data) => {
    const newDate = new Date().toLocaleString('ja-JP')
    const postRef = await doc(database, 'comments', routerid + (comments.length + 2).toString())

    await setDoc(postRef, {
      comment: data.comment,
      userid: user.uid,
      postid: routerid,
      username: user.displayName,
      createTime: newDate,
      timestamp: serverTimestamp(),
      userEmail: user.email,
      isEdit: false,
      userPhoto: user.photoURL,
      id: routerid + (comments.length + 1).toString(),
    })
      .then(() => {
        successNotify('コメントを投稿しました')
        getComments(setComments, routerid)
      })
      .catch((err) => {
        errorNotify('コメントの投稿に失敗しました')
      })
  }

  //コメントの編集
  const updateComment = (commentId: string) => {
    let commentDate = doc(database, 'comments', commentId)
    console.log(commentDate)
    updateDoc(commentDate, {
      comment: comment,
      userid: user.uid,
      username: user.displayName,
      userEmail: user.email,
      userPhoto: user.photoURL,
      isEdit: true,
    })
      .then(() => {
        successNotify('コメントを更新しました')
        router.push(`/post/${routerid}`)
        setIsCommentModalOpen(false)
      })
      .catch((err) => {
        errorNotify('コメントの更新に失敗しました')
        console.log(err)
      })
  }

  //コメントのいいね
  // const LikeCommentAdd = (routerid, likes) => {
  //   let comment = doc(database, 'comments', routerid)
  //   updateDoc(comment, {
  //     likes: likes + 1,
  //     likes_email: arrayUnion(user.email),
  //   })
  //     .then(() => {
  //       setOn((prev) => !prev)
  //       setLikecount(0)
  //       setTimeout(() => {
  //         useGetPost(setSinglePost, routerid)
  //       }, 2000)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }

  //画像のモーダルの開
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  //画像のモーダルの開
  const openModal = (): void => {
    setIsModalOpen(true)
  }
  //画像のモーダルの締
  const closeModal = (): void => {
    setIsModalOpen(false)
  }

  //コメント編集のモーダルの開
  const [isCommentModalOpen, setIsCommentModalOpen] = useState<boolean>(false)
  //コメント編集のモーダルの開
  const openCommentModal = (): void => {
    setIsCommentModalOpen(true)
  }
  //コメント編集のモーダルの締
  const closeCommentModal = (): void => {
    setIsCommentModalOpen(false)
  }

  return (
    <>
      <CommonHead />
      <ToastContainer />
      <div className='m-auto my-4 w-11/12 md:w-full'>
        {user && (
          <>
            {user.email === singlePost?.email && (
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
                      }}
                    >
                      記事を編集する
                    </Link>
                  </ListItemButton>
                  <ListItemButton>
                    <ListItemIcon>
                      <SendIcon />
                    </ListItemIcon>
                    <button onClick={() => deletePost(routerid)}>記事を削除する</button>
                  </ListItemButton>
                </List>
              </>
            )}
          </>
        )}
        <div className='rounded-xl md:border md:p-10'>
          <div>
            <Link href='/'>トップ</Link>　＞　投稿記事　＞　
            {singlePost?.title}
          </div>
          <div className='my-6 flex justify-center'>
            <button onClick={openModal}>
              <img
                className='Post-img rounded text-center'
                src={singlePost?.downloadURL}
                alt='画像'
              />
            </button>
            {!singlePost?.downloadURL && <p>画像なし</p>}
          </div>
          <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel='Image Modal'>
            <div className='my-6 flex justify-center'>
              <Image
                className='m-auto max-w-sm text-center'
                height={400}
                width={400}
                src={singlePost?.downloadURL}
                alt='contextImage'
              />
            </div>
            　<button onClick={closeModal}>閉じる</button>
          </Modal>
          <div className='my-0 text-left text-2xl font-semibold md:my-4 md:text-center'>
            {singlePost?.title}
          </div>
          <br />
          <div>
            <span className='text-sm text-gray-500 md:text-base'>
              <AccessTimeIcon /> <span>{singlePost?.createTime}</span>
            </span>
            <span className='text-sm md:text-base'>
              　<FavoriteIcon />
              <span className='ml-1'>{singlePost?.likes}</span>
            </span>
          </div>
          {users &&
            users.map((user) => {
              return (
                <div key={user.userid}>
                  {singlePost?.email === user.email && (
                    <Link href={`/profile/${user.userid}`}>
                      <div className='m-auto my-4 flex  px-2'>
                        <div key={user.id}>
                          <div>
                            <Avatar
                              className='m-auto max-w-sm border text-center'
                              alt='プロフィール'
                              sx={{ width: 50, height: 50 }}
                              src={user.profileImage}
                            />
                          </div>
                        </div>
                        <div className='ml-6 mt-1'>
                          <span className='text-sm'>{user.userName}</span>
                          <div className=' text-sm text-gray-500'>{user.bio}</div>
                        </div>
                      </div>
                    </Link>
                  )}
                </div>
              )
            })}
          {singlePost?.editTime && (
            <div>
              <AccessTimeIcon />
              編集日時：{singlePost.editTime}
            </div>
          )}
          <div color='text.secondary'>
            {['ONEPIECE', '呪術廻戦', '東京リベンジャーズ', 'キングダム'].includes(
              singlePost?.category,
            ) && (
              <SiteCategory
                className={`border-${
                  {
                    ONEPIECE: 'cyan',
                    呪術廻戦: 'purple',
                    東京リベンジャーズ: 'rose',
                    キングダム: 'yellow',
                  }[singlePost.category]
                }-500 hover:bg-${
                  {
                    ONEPIECE: 'cyan',
                    呪術廻戦: 'purple',
                    東京リベンジャーズ: 'rose',
                    キングダム: 'yellow',
                  }[singlePost.category]
                }-500 my-4 inline-block rounded-xl  border p-1 text-center  font-bold hover:text-white`}
                text={singlePost.category}
                href={`/post/categories/${singlePost.category}`}
              />
            )}

            {singlePost?.netabare === 'ネタバレ有' ? (
              <span className='mx-1 mt-1 inline-block rounded-xl border border-red-500 p-1 text-center'>
                {singlePost?.netabare}
              </span>
            ) : (
              <span className='mx-1 mt-1 inline-block rounded-xl border border-gray-700 p-1 text-center '>
                {singlePost?.netabare}
              </span>
            )}

            {/* <div className='mt-2 mb-8'>
                  <FacebookShareButton url={URL} quote={QUOTE}>
                    <FacebookIcon size={24} round />
                  </FacebookShareButton>
                  <TwitterShareButton url={URL} title={QUOTE}>
                    <TwitterIcon size={24} round />
                  </TwitterShareButton>
                  <LineShareButton url={URL} title={QUOTE}>
                    <LineIcon size={24} round />
                  </LineShareButton>
                </div> */}

            {singlePost?.context && (
              <p className='text-left' style={{ whiteSpace: 'pre-line' }}>
                {parse(singlePost.context)}
              </p>
            )}
          </div>
          <br />
          {/* {singlePost?.contextImage && (
            <div className='flex justify-center'>
              <Image
                className='m-auto max-w-sm text-center'
                height={300}
                width={300}
                src={singlePost?.contextImage}
                alt='contextImage'
              />
            </div>
          )} */}
          <div className='my-4'>
            <span className='text-pink-400'>
              <FavoriteIcon />
            </span>
            {singlePost?.likes}
          </div>

          {user && singlePost?.likesEmail && user.email == singlePost?.email ? (
            <p>自分の投稿なのでいいねできません</p>
          ) : (
            <>
              {singlePost?.likesEmail && user ? (
                singlePost?.likesEmail.includes(user.email) ? (
                  <>
                    <p>いいね済み</p>
                    <button
                      className='my-2 inline'
                      onClick={() => LikeDelete(routerid, singlePost.likes, user.email)}
                    >
                      <span className='py-4 text-pink-400 hover:text-pink-700'>
                        <FavoriteIcon />
                        いいね解除する
                      </span>
                    </button>
                  </>
                ) : (
                  <button onClick={() => LikeAdd(routerid, singlePost.likes, user.email)}>
                    <FavoriteIconAnim on={on} />
                    <span>いいねする</span>
                  </button>
                )
              ) : (
                <></>
              )}
            </>
          )}

          {singlePost &&
            singlePost.selected.map((tag, i) => (
              <span
                className='rounded border border-black  px-4 py-2 text-center text-cyan-700'
                key={i}
              >
                #{tag}
              </span>
            ))}

          <div className='cursor-pointer'>
            {users?.map((user) => {
              return (
                <div key={user.id}>
                  {singlePost?.email === user.email && (
                    <Link href={`/profile/${user.userid}`}>
                      <div className='m-auto my-8 flex border py-8  px-2'>
                        <div>
                          <Avatar
                            className='m-auto max-w-sm border text-center'
                            alt='プロフィール'
                            sx={{ width: 80, height: 80 }}
                            src={user.profileImage}
                          />
                        </div>
                        <div className='ml-6 mt-4'>
                          <span className=''>
                            <AccountBoxIcon /> {user.userName}
                          </span>
                          <div className=' mt-2 pb-2 text-gray-500'>
                            <BorderColorIcon />
                            {user.bio}
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

        {!user && (
          <>
            <div className='my-4 text-center'>
              <h2 className='text-lg font-bold text-gray-700 lg:text-xl'>
                コメント {comments.length}件
              </h2>
            </div>
          </>
        )}
        {user && (
          <section className='bg-white py-8 lg:py-16'>
            <div className='mx-auto max-w-2xl px-4'>
              <div className='mb-6 flex items-center justify-between'>
                <h2 className='text-lg font-bold text-gray-700 lg:text-2xl '>
                  コメント ({comments.length})
                </h2>
              </div>
              <form className='mb-6' id='aa'>
                <div className='mb-4 rounded-lg rounded-t-lg border border-gray-200 bg-white py-2 px-4  dark:border-gray-700'>
                  <label htmlFor='comment' className='sr-only'>
                    あなたのコメント
                  </label>
                  <textarea
                    id='comment'
                    rows={6}
                    className='w-full border-0 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0  dark:placeholder-gray-400 '
                    placeholder='コメントを入力してください'
                    required
                    {...register('comment', { required: 'コメントは必須です' })}
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
              <article className='mb-6 rounded-lg border bg-white p-6 text-base' key={comment.id}>
                <footer className='mb-2 flex items-center justify-between'>
                  <div className='flex items-center'>
                    <Avatar
                      className='m-auto max-w-sm border text-center'
                      alt='プロフィール'
                      sx={{ width: 30, height: 30 }}
                      src={comment.userPhoto}
                    />
                    <p className='mx-3 inline-flex items-center text-sm font-semibold text-gray-900'>
                      {comment.username}
                    </p>
                    <p className='text-sm text-gray-600 dark:text-gray-400'>{comment.createTime}</p>
                  </div>
                </footer>

                <p className='my-4 whitespace-pre-wrap break-words'>{comment.comment}</p>
                {user && (
                  <>
                    {user.email === comment.userEmail && (
                      <div className='flex'>
                        <button
                          onClick={openCommentModal}
                          className='text-whit mx-2 rounded-xl border bg-green-600 px-3 py-1 text-sm text-white'
                        >
                          編集
                        </button>
                        <button
                          onClick={() => deleteComment(comment.id)}
                          className='mx-2 rounded-xl border bg-red-600 px-3 py-1 text-sm text-white'
                        >
                          削除
                        </button>
                      </div>
                    )}
                  </>
                )}
                <Modal
                  isOpen={isCommentModalOpen}
                  onRequestClose={closeCommentModal}
                  contentLabel='comment Modal'
                >
                  <div>
                    <FormLabel id='demo-radio-buttons-group-label'>
                      コメント<span className='text-red-600'>*</span>
                    </FormLabel>
                  </div>
                  <div>
                    <input
                      id='outlined-basic'
                      className='sm:text-md block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                      defaultValue={comment.comment}
                      type='text'
                      onChange={(event) => setComment(event.target.value)}
                    />
                    <button onClick={() => updateComment(comment.id)} className='m-auto my-8 w-80'>
                      更新する
                    </button>
                  </div>
                  <button onClick={closeCommentModal}>閉じる</button>
                </Modal>
              </article>
            )
          })}
      </div>
      <h2 className='my-4 text-xl'>こちらもおすすめ</h2>
      <div className='m-auto mt-8 max-w-7xl'>
        <div>
          {categoryPosts.map((post) => {
            return (
              <RecommendCardPost
                key={post.id}
                downloadURL={post.downloadURL}
                title={post.title}
                category={post.category}
                netabare={post.netabare}
                context={post.context}
                createTime={post.createTime}
                displayName={post.displayName}
                email={post.email}
                id={post.id}
                photoURL={post.photoURL}
                likes={post.likes}
                selected={post.selected}
                userid={post.userid}
              />
            )
          })}
          {categoryPosts.length === 0 && (
            <p className='m-auto my-6 text-center text-2xl'>まだ投稿されていません</p>
          )}
        </div>
      </div>
    </>
  )
}

export default Post
