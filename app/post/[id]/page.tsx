'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import FavoriteIcon from '@mui/icons-material/Favorite'
import SendIcon from '@mui/icons-material/Send'
import { Avatar } from '@mui/material'
import List from '@mui/material/List'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListSubheader from '@mui/material/ListSubheader'
import { getAuth } from 'firebase/auth'
import { doc, deleteDoc } from 'firebase/firestore'
import parse from 'html-react-parser'
import Image from 'next/image'
import Link from 'next/link'
// import { useRouter, useParams } from 'next/navigation'
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
import { TopPostComment } from 'layouts/components/ui/TopPostComment'
import { TopPostLike } from 'layouts/components/ui/TopPostLike'
import { useGetPost, useGetCategoryPosts, useGetOtherUser } from 'layouts/hooks'
import { GetPost } from 'types/post'

// バリデーションルール
const schema = yup.object({
  comment: yup.string().required('必須です'),
})

const Post = ({ params }: any) => {
  const [users, setUsers] = useState<any>(null)
  const [singlePost, setSinglePost] = useState<GetPost>()
  const [categoryPosts, setCategoryPosts] = useState<any>([])
  const routerid = params.id
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
    } // routerIdがない場合は何もしない

    const fetchPost = async () => {
      const post = await useGetPost(routerid) // useGetPostで取得
      if (post) {
        setSinglePost(post) // 成功したら状態を更新
      } else {
        console.log('記事が見つかりません')
        router.push('/404') // 記事が見つからない場合は404ページへ遷移
      }
    }

    fetchPost()
  }, [routerid]) // routerIdが変更されるたびに1回だけ実行されるようにする

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
          // router.push('/')
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

  return (
    <>
      <CommonHead title='Manga Study - 記事詳細' />
      <ToastContainer />
      <div className='m-auto my-4 w-11/12 md:w-full'>
        {user && (
          <>
            {user.email === singlePost?.email && (
              <>
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
                    <Link
                      id='edit-post'
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
                    <button onClick={() => deletePost(routerid)} id='delete-post'>
                      記事を削除する
                    </button>
                  </ListItemButton>
                </List>
              </>
            )}
          </>
        )}
        <div className='rounded-xl md:border md:p-10'>
          <Breadcrumbs secondTitle='投稿記事' thirdTitle={singlePost?.title} />
          <div className='my-6 flex justify-center'>
            <button onClick={toggleModal}>
              {singlePost?.downloadURL && (
                <Image
                  className='Post-img rounded text-center'
                  src={singlePost.downloadURL}
                  height={150}
                  width={150}
                  alt='画像'
                  priority
                />
              )}
            </button>
            {!singlePost?.downloadURL && <span>画像なし</span>}
          </div>
          <Modal isOpen={isModalOpen} onRequestClose={toggleModal} contentLabel='Image Modal'>
            <div className='my-6 flex justify-center'>
              <button onClick={toggleModal} className='text-center'>
                閉じる
              </button>
            </div>
            <div className='z-20 my-6 flex justify-center'>
              {singlePost?.downloadURL && (
                <Image
                  className='z-20 m-auto max-w-sm text-center'
                  height={400}
                  width={400}
                  src={singlePost.downloadURL}
                  alt='contextImage'
                  priority
                />
              )}
            </div>
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
              <span className='text-pink-400'>
                <FavoriteIcon />
              </span>
              <span className='ml-1'>{singlePost?.likes}</span>
            </span>
          </div>
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

          {singlePost?.editTime && (
            <div>
              <AccessTimeIcon />
              編集日時：{singlePost.editTime}
            </div>
          )}
          <div color='text.secondary'>
            {singlePost?.category && (
              <SiteCategory
                className={`border border-${
                  {
                    ONEPIECE: 'cyan',
                    呪術廻戦: 'purple',
                    東京リベンジャーズ: 'rose',
                    キングダム: 'yellow',
                  }[singlePost?.category]
                }-500 hover:bg-${
                  {
                    ONEPIECE: 'cyan',
                    呪術廻戦: 'purple',
                    東京リベンジャーズ: 'rose',
                    キングダム: 'yellow',
                  }[singlePost?.category]
                }-500 span-1 my-4 hover:text-white`}
                text={singlePost.category}
                href={`/post/categories/${singlePost.category}`}
              />
            )}

            <span
              className={`span-1 mx-1 mt-1 inline-block rounded border text-center text-sm ${
                singlePost?.netabare === 'spoil' ? 'border-red-500' : 'border-gray-700'
              }`}
            >
              ネタバレ有
            </span>

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
          <TopPostLike routerid={routerid} />

          {singlePost?.selected.map((tag, i) => (
            <span
              className='rounded border border-black  px-4 py-2 text-center text-cyan-700'
              key={i}
            >
              #{tag}
            </span>
          ))}

          <div className='cursor-pointer'>
            <Link href={`/profile/${users?.userid}`}>
              <div className='m-auto my-8 flex border py-8  px-2'>
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
        </div>

        <TopPostComment routerid={routerid} />
      </div>

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
                createTime={post.createTime}
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
