/* eslint-disable jsx-a11y/alt-text */
import { useRouter } from 'next/router'
import React, { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { database } from 'firebaseConfig'
import { collection, getDocs, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import Grid from '@material-ui/core/Grid'
import { getAuth } from 'firebase/auth'
import Button from '@mui/material/Button'
import { where } from 'firebase/firestore'
import Image from 'react-image-resizer'
import Avatar from '@mui/material/Avatar'
import { SiteButton } from 'layouts/components/button'
import { SiteCategory } from 'layouts/components/text'
import { CommonHead } from 'layouts/components/ui'
import FavoriteIcon from '@mui/icons-material/Favorite'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import { query, orderBy } from 'firebase/firestore'
import BorderColorIcon from '@mui/icons-material/BorderColor'

export const getStaticPaths = async () => {
  const res = await fetch(
    'https://firestore.googleapis.com/v1/projects/next-auth-app-2aa40/databases/(default)/documents/posts',
  )
  const data = await res.json()

  const array = Object.keys(data).map(function (key) {
    return data[key]
  })

  const paths = array[0].map((post) => {
    return {
      params: { id: post.fields.id.stringValue.toString() },
    }
  })

  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps = async (context) => {
  const id = context.params.id
  const res = await fetch(
    'https://firestore.googleapis.com/v1/projects/next-auth-app-2aa40/databases/(default)/documents/posts/' +
      id,
  )
  const data = await res.json()

  return {
    props: {
      post: data,
    },
    revalidate: 10, // ここを追加
  }
}

const Daitails = ({ post }) => {
  const [users, setUsers] = useState(null)
  const databaseRef = collection(database, 'posts')
  const usersRef = collection(database, 'users')
  const your = query(usersRef, where('email', '==', post.fields.email.stringValue))
  //データベースを取得
  const [firedata, setFiredata] = useState([])
  const q = query(databaseRef, orderBy('timestamp', 'desc'))
  const router = useRouter()
  const { id } = router.query
  const auth = getAuth()
  const user = auth.currentUser
  const styles = { whiteSpace: 'pre-line' }

  const usersData = async () => {
    //firestoreからデータ取得
    await getDocs(your).then((querySnapshot) => {
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
    usersData()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <CommonHead />
      <div>
        <div>
          <Link href='/top'>トップ</Link>　＞　投稿記事　＞　
          {post.fields.title.stringValue}
        </div>
        <div className='my-6 flex justify-center'>
          <Image
            className='m-auto max-w-sm text-center'
            height={500}
            width={500}
            src={post.fields.downloadURL.stringValue}
          />
        </div>
        <div className='my-4 text-2xl'>{post.fields.title.stringValue}</div>
        <br></br>
        <div>
          <AccessTimeIcon /> 投稿日時：{post.fields.createtime.stringValue}
        </div>
        <br></br>
        {post.fields.edittime.stringValue && (
          <div>
            <AccessTimeIcon />
            編集日時：{post.fields.edittime.stringValue}
          </div>
        )}
        <br></br>
        {post.fields.selected.stringValue &&
          post.fields.selected.stringValue.map((tag, i) => (
            <span className='text-cyan-700' key={i}>
              #{tag}　
            </span>
          ))}
        <div color='text.secondary'>
          {post.fields.categori.stringValue == 'ONEPIECE' && (
            <SiteCategory
              className='m-6 inline-block bg-blue-500 p-1 text-center text-white'
              text='ONE PIECE'
              href='/post/category/ONEPIECE'
            />
          )}
          {post.fields.categori.stringValue == '呪術廻戦' && (
            <SiteCategory
              className='m-6 inline-block bg-purple-500 p-1 text-center text-white'
              text='呪術廻戦'
              href='/post/category/呪術廻戦'
            />
          )}
          {post.fields.categori.stringValue == '東京リベンジャーズ' && (
            <SiteCategory
              className='m-6 inline-block bg-rose-500 p-1 text-center text-white'
              text='東京リベンジャーズ'
              href='/post/category/東京リベンジャーズ'
            />
          )}
          {post.fields.categori.stringValue == 'キングダム' && (
            <SiteCategory
              className='m-6 inline-block bg-yellow-500 p-1 text-center text-white'
              text='キングダム'
              href='/post/category/キングダム'
            />
          )}

          {post.fields.netabare.stringValue == 'ネタバレ有' && (
            <span className='m-4 mt-2 inline-block bg-yellow-500 p-1 text-center text-white'>
              {post.fields.netabare.stringValue}
            </span>
          )}
          {post.fields.netabare.stringValue == 'ネタバレ無' && (
            <span className='m-4 mt-2 inline-block bg-blue-500 p-1 text-center text-white'>
              {post.fields.netabare.stringValue}
            </span>
          )}
          <p className='text-left' style={{ whiteSpace: 'pre-line' }}>
            {post.fields.context.stringValue}
          </p>
          <br></br>
          {post.fields.contextimage.stringValue && (
            <div className='flex justify-center'>
              <Image
                className='m-auto max-w-sm text-center'
                height={500}
                width={500}
                src={post.fields.contextimage.stringValue}
              />
            </div>
          )}
          <div className='my-4'>
            <FavoriteIcon />
            {post.fields.likes.stringValue}
          </div>
          <div key={post.fields.id.stringValue} className='cursor-pointer'>
            {users &&
              users.map((user) => {
                return (
                  <>
                    <Link href={`/profile/${user.userid}`}>
                      <div key={user.userid}>
                        <div className='m-auto my-8 flex bg-slate-200 py-8'>
                          <div key={user.id}>
                            <div>
                              <Avatar
                                className='m-auto max-w-sm border text-center'
                                alt='プロフィール'
                                sx={{ width: 100, height: 100 }}
                                src={user.profileimage}
                              />
                            </div>
                          </div>
                          <div className='ml-6 mt-4 '>
                            <span className='text-xl'>
                              <AccountBoxIcon /> {user.username}
                            </span>
                            <div className='my-2 text-xl'>
                              <BorderColorIcon />
                              {user.bio}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </>
                )
              })}
          </div>
        </div>
      </div>
    </>
  )
}

export default Daitails
