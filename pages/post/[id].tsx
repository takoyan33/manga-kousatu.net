import { yupResolver } from '@hookform/resolvers/yup'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import SendIcon from '@mui/icons-material/Send'
import { Avatar, Chip, Stack, Typography } from '@mui/material'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListSubheader from '@mui/material/ListSubheader'
import { getAuth } from 'firebase/auth'
import { doc, deleteDoc } from 'firebase/firestore'
import parse from 'html-react-parser'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Modal from 'react-modal'
import { ToastContainer } from 'react-toastify'
import * as yup from 'yup'
import { database } from 'firebaseConfig'
import { SiteCategory, successNotify, errorNotify } from 'layouts/components/text'
import { CommonHead, RecommendCardPost, Breadcrumbs } from 'layouts/components/ui'
// import { deletePost } from 'layouts/api/auth'
import 'react-toastify/dist/ReactToastify.css'
// import {
//   FacebookShareButton,
//   TwitterShareButton,
//   FacebookIcon,
//   LineShareButton,
//   LineIcon,
//   TwitterIcon,
// } from 'react-share'
import { TopPostComment } from 'layouts/components/post/TopPostComment'
import { TopPostLike } from 'layouts/components/post/TopPostLike'
import { useGetPost, useGetCategoryPosts, useGetOtherUser } from 'layouts/hooks'
import { GetPost } from 'types/post'

// バリデーションルール
const schema = yup.object({
  comment: yup.string().required('必須です'),
})

const Post = () => {
  const [users, setUsers] = useState<Awaited<any>>(null)
  const [singlePost, setSinglePost] = useState<GetPost>()
  const [categoryPosts, setCategoryPosts] = useState<any>([])
  const router = useRouter()
  const routerid = router.query.id as string
  const auth = getAuth()
  const user = auth.currentUser

  // const URL = `http://localhost:8080/post/${routerid}`
  // const QUOTE = `記事をシェアしました。 ${singlePost.title} 漫画考察.net`

  const {
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  // 記事を取得
  useEffect(() => {
    if (!routerid) {
      return
    }

    const fetchPost = async () => {
      const post = await useGetPost(routerid)
      if (post) {
        setSinglePost(post)
      } else {
        console.log('記事が見つかりません')
        router.push('/404')
      }
    }

    fetchPost()
  }, [])

  // 関連記事とユーザー情報を取得
  useEffect(() => {
    if (singlePost?.category) {
      // singlePostが更新されるたびに実行
      useGetCategoryPosts(setCategoryPosts, singlePost.category, routerid)
      useGetOtherUser(setUsers, singlePost.userid)
    }
  }, [singlePost, routerid]) // singlePostが変更された時だけ実行

  //記事の削除
  const deletePost = (routerid) => {
    //data.idを送っているのでidを受け取る
    const deletePost = doc(database, 'posts', routerid.toString())
    // const checkSaveFlg = window.confirm('削除しても大丈夫ですか？')
    //確認画面を出す
    // if (checkSaveFlg) {
    deleteDoc(deletePost)
      .then(() => {
        successNotify('記事を削除しました')
        setTimeout(() => {
          router.push('/')
        }, 2000)
      })
      .catch(() => {
        errorNotify('失敗しました')
      })
    // }
  }

  //画像のモーダルの開
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const toggleModal = () => setIsModalOpen((prev) => !prev)

  const categoryColorMap = {
    ONEPIECE: '#06b6d4', // cyan-500
    呪術廻戦: '#a855f7', // purple-500
    東京リベンジャーズ: '#f43f5e', // rose-500
    キングダム: '#eab308', // yellow-500
  } as const

  return (
    <>
      <CommonHead title='Manga Study - 記事詳細' />
      <ToastContainer />
      <div className='m-auto my-4 w-11/12 md:w-full'>
        {user && user.email === singlePost?.email && (
          <List
            sx={{ width: '100%', maxWidth: 300, bgcolor: 'background.paper', zIndex: 0 }}
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
              <Link href={`/post/edit/${singlePost.id}`}>記事を編集する</Link>
            </ListItemButton>
            <ListItemButton>
              <ListItemIcon>
                <SendIcon />
              </ListItemIcon>
              <button onClick={deletePost}>記事を削除する</button>
            </ListItemButton>
          </List>
        )}
        <article className='rounded-xl md:border md:p-10'>
          <Breadcrumbs secondTitle='投稿記事' thirdTitle={singlePost?.title} />
          {/* 公開or下書きラベル */}
          <div className='mt-2'>
            {user && user.email === singlePost?.email && (
              <>
                <Chip
                  label={singlePost.display === 'true' ? '公開中' : '下書き'}
                  color={singlePost.display === 'true' ? 'primary' : 'default'}
                  variant='outlined'
                  size='small'
                  sx={{ mb: 2 }}
                />
              </>
            )}
          </div>

          {/* サムネイル */}
          <div className='my-6 flex justify-center'>
            <button onClick={toggleModal}>
              <Image
                className='Post-img rounded text-center'
                src={singlePost?.downloadURL || '/images/no-image.jpg'}
                height={150}
                width={150}
                alt='画像'
                priority
              />
            </button>
          </div>

          {/* サムネイルモーダル */}
          <Modal isOpen={isModalOpen} onRequestClose={toggleModal} contentLabel='Image Modal'>
            <div className='my-6 flex justify-center'>
              <button onClick={toggleModal} className='text-center'>
                閉じる
              </button>
            </div>
            <div className='z-20 my-6 flex justify-center'>
              <Image
                className='z-20 m-auto max-w-sm text-center'
                height={400}
                width={400}
                src={singlePost?.downloadURL || '/images/no-image.jpg'}
                alt='contextImage'
                priority
              />
            </div>
          </Modal>

          {/* タイトル */}
          <div className='my-0 text-left text-2xl font-semibold md:my-4 md:text-center'>
            {singlePost?.title}
          </div>
          <br />
          {/* 投稿時刻 */}
          {singlePost?.updatedAt && (
            <Stack
              direction='row'
              spacing={1}
              alignItems='center'
              sx={{ color: 'text.secondary', my: 2 }}
            >
              <AccessTimeIcon fontSize='small' />
              <Typography variant='body2'>投稿日時：{singlePost.createdAt}</Typography>
            </Stack>
          )}
          {/* 編集時刻 */}
          {singlePost?.updatedAt && (
            <Stack
              direction='row'
              spacing={1}
              alignItems='center'
              sx={{ color: 'text.secondary', my: 2 }}
            >
              <AccessTimeIcon fontSize='small' />
              <Typography variant='body2'>編集日時：{singlePost.updatedAt}</Typography>
            </Stack>
          )}
          {/* プロフィール */}
          <Link href={`/profile/${users?.userid}`}>
            <div className='m-auto my-4 flex  px-2'>
              <div key={users?.id}>
                <div>
                  <Avatar
                    className='m-auto max-w-sm border text-center'
                    alt='プロフィール'
                    sx={{ width: 50, height: 50 }}
                    src={users?.profileImage}
                  />
                </div>
              </div>
              <div className='ml-6 mt-1'>
                <span className='text-sm'>{users?.userName}</span>
                <div className='text-sm text-gray-500'>{users?.bio}</div>
              </div>
            </div>
          </Link>

          {/* 漫画カテゴリ */}
          <div color='text.secondary'>
            {singlePost?.category && (
              <Link href={`/post/categories/${singlePost.category}`} passHref>
                <Chip
                  component='a'
                  clickable
                  label={`#${singlePost.category}`}
                  variant='outlined'
                  sx={{
                    borderColor: categoryColorMap[singlePost.category],
                    color: categoryColorMap[singlePost.category],
                    '&:hover': {
                      backgroundColor: categoryColorMap[singlePost.category],
                      color: 'white',
                    },
                    my: 2,
                  }}
                />
              </Link>
            )}
            {/* ネタバレラベル */}
            {singlePost?.netabare === 'spoil' && (
              <Chip label='ネタバレ有' variant='outlined' color='error' sx={{ mx: 1 }} />
            )}

            {singlePost?.netabare === 'notSpoil' && (
              <Chip label='ネタバレ無し' variant='outlined' color='default' sx={{ mx: 1 }} />
            )}

            {/* SNSシェア */}
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

            {/* 内容 */}
            {singlePost?.context && (
              <span className='text-left' style={{ whiteSpace: 'pre-line' }}>
                {parse(singlePost.context)}
              </span>
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

          {/* いいね */}
          <TopPostLike />

          {/* タグ */}
          {singlePost?.selected.map((tag, i) => (
            <Chip
              key={i}
              label={`#${tag}`}
              variant='outlined'
              color='primary'
              sx={{ mr: 1, mb: 1 }}
            />
          ))}

          {/* プロフィール */}
          <div className='cursor-pointer'>
            <Link href={`/profile/${users?.userid}`}>
              <div className='m-auto my-8 flex border px-2  py-8'>
                <div>
                  <Avatar
                    className='m-auto max-w-sm border text-center'
                    alt='プロフィール'
                    sx={{ width: 80, height: 80 }}
                    src={users?.profileImage}
                  />
                </div>
                <div className='ml-6 mt-4'>
                  <span className=''>
                    <AccountBoxIcon />
                    {users?.userName ? users?.userName : 'ユーザー名未設定'}
                  </span>
                  <div className='mt-2 pb-2 text-gray-500'>
                    <BorderColorIcon />
                    {users?.bio}
                  </div>
                </div>
              </div>
            </Link>
          </div>
        </article>

        {/* コメント */}
        <TopPostComment />
      </div>

      {/* おすすめ記事 */}
      <h2 className='my-4 text-xl'>こちらもおすすめ</h2>
      <div className='m-auto mt-8 max-w-7xl'>
        <div>
          {categoryPosts.slice(0, 4).map((post) => {
            return (
              <RecommendCardPost
                key={post.id}
                downloadURL={post.downloadURL}
                title={post.title}
                category={post.category}
                netabare={post.netabare}
                context={post.context}
                createdAt={post.createdAt}
                id={post.id}
                likes={post.likes}
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
