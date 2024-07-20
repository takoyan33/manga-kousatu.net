import { useRouter } from 'next/router'
import React from 'react'
import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { database } from 'firebaseConfig'
import { collection, getDocs, onSnapshot, query, orderBy } from 'firebase/firestore'
import TextField from '@mui/material/TextField'
import Grid from '@material-ui/core/Grid'
import { CommonHead, CardPost } from 'layouts/components/ui'
import {
  // useGetCategoryPosts,
  useGetCategoriOldPosts,
  useGetCategoriLikePosts,
} from 'layouts/components/hooks'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { postsRef } from 'layouts/utils/post'
import { GetPost } from 'types/post'

export const getStaticPaths = async () => {
  const res = await fetch(
    'https://firestore.googleapis.com/v1/projects/next-auth-app-2aa40/databases/(default)/documents/categories',
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
    fallback: false,
  }
}

export const getStaticProps = async (context) => {
  const id = context.params.id
  const res = await fetch(
    'https://firestore.googleapis.com/v1/projects/next-auth-app-2aa40/databases/(default)/documents/categories/' +
      id,
  )
  const data = await res.json()

  return {
    props: {
      post: data,
    },
  }
}

const Details = ({ post }) => {
  //データベースを取得
  const q = query(postsRef, orderBy('timestamp', 'desc'))
  //新しい順
  const u = query(postsRef, orderBy('timestamp'))
  //古い順
  const f = query(postsRef, orderBy('likes', 'desc'))
  //いいね数順
  const [posts, setPosts] = useState<any>([])

  const router = useRouter()
  const [searchName, setSearchName] = useState<any>('')

  const useGetPosts = async () => {
    await getDocs(q).then((querySnapshot) => {
      //コレクションのドキュメントを取得
      setPosts(
        querySnapshot.docs
          .map((data) => {
            //配列なので、mapで展開する
            return { ...data.data(), id: data.id }
            //スプレッド構文で展開して、新しい配列を作成
          })
          .filter((data: any) => {
            if (data.category === post.fields.id.stringValue) {
              return data
              //そのまま返す
            } else if (
              data.category.toLowerCase().includes(post.fields.id.stringValue.toLowerCase())
              //valのnameが含んでいたら小文字で返す　含んでいないvalは返さない
            ) {
              return data
            }
          }),
      )
    })
  }

  //古い順
  const useGetOldPosts = async () => {
    await onSnapshot(u, (querySnapshot) => {
      setPosts(
        querySnapshot.docs
          .map((data) => {
            //配列なので、mapで展開する
            return { ...data.data(), id: data.id }
            //スプレッド構文で展開して、新しい配列を作成
          })
          .filter((data: any) => {
            if (data.category === post.fields.id.stringValue) {
              return data
              //そのまま返す
            } else if (
              data.category.toLowerCase().includes(post.fields.id.stringValue.toLowerCase())
              //valのnameが含んでいたら小文字で返す　含んでいないvalは返さない
            ) {
              return data
            }
          }),
      )
    })
  }

  //いいね順
  const useGetLikePosts = async () => {
    await onSnapshot(f, (querySnapshot) => {
      setPosts(
        querySnapshot.docs
          .map((data) => {
            //配列なので、mapで展開する
            return { ...data.data(), id: data.id }
            //スプレッド構文で展開して、新しい配列を作成
          })
          .filter((data: any) => {
            if (data.category === post.fields.id.stringValue) {
              return data
              //そのまま返す
            } else if (
              data.category.toLowerCase().includes(post.fields.id.stringValue.toLowerCase())
              //valのnameが含んでいたら小文字で返す　含んでいないvalは返さない
            ) {
              return data
            }
          }),
      )
    })
  }

  useEffect(() => {
    // useGetCategoriPosts(setPosts, post.fields.id.stringValue)
    useGetPosts()
    useGetOldPosts()
    useGetLikePosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query])

  interface NetabareItem {
    sortId: number
    label: string
    value: string
    onClick: () => void
  }

  const SORT_LIST = [
    {
      sortId: 1,
      label: '新しい順',
      value: '新しい順',
      onClick: () => useGetPosts(),
    },
    {
      sortId: 2,
      label: '古い順',
      value: '古い順',
      onClick: () => useGetOldPosts(),
    },
    {
      sortId: 3,
      label: 'いいね順',
      value: 'いいね順',
      onClick: () => useGetLikePosts(),
    },
  ]

  // const NETABARE_LIST: NetabareItem[] = [
  //   {
  //     sortId: 1,
  //     label: 'ネタバレ有',
  //     value: 'ネタバレ有',
  //     onClick: () => useGetNetabrePosts(setPostData),
  //   },
  //   {
  //     sortId: 2,
  //     label: 'ネタバレ無',
  //     value: 'ネタバレ無',
  //     onClick: () => useGetNoNetabrePosts(setPostData),
  //   },
  // ]

  return (
    <>
      <CommonHead />
      <p className='my-4'>
        <Link href='/top'>トップ</Link> ＞ 投稿記事 ＞ カテゴリ ＞{post.fields.title.stringValue}
      </p>
      <h1 className='my-12 text-left text-2xl font-semibold'>{post.fields.title.stringValue}</h1>
      <div className='m-auto my-10 flex justify-center'>
        <TextField
          id='outlined-basic'
          type='search'
          label='記事を検索する'
          variant='outlined'
          onChange={(event) => {
            setSearchName(event.target.value)
          }}
        />
        {/* <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
          <InputLabel id='demo-select-small'>ネタバレ</InputLabel>

          <Select labelId='demo-select-small' id='demo-select-small' label='ネタバレ'>
            {NETABARE_LIST.map((netabare) => (
              <MenuItem key={netabare.sortId} value={netabare.value} onClick={netabare.onClick}>
                {netabare.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl> */}
      </div>

      <p className='text-1xl text-center'>投稿数　{posts.length}件</p>

      <div className='flex justify-end'>
        <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
          <InputLabel id='demo-select-small'>新しい順</InputLabel>

          <Select labelId='demo-select-small' id='demo-select-small' label='新しい順'>
            {SORT_LIST.map((sort) => (
              <MenuItem key={sort.sortId} value={sort.value} onClick={sort.onClick}>
                {sort.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>
      <div className='m-auto max-w-7xl'>
        <Grid container spacing={1}>
          {posts
            .filter((post) => {
              if (searchName === '') {
                return post
              } else if (post.title.toLowerCase().includes(searchName.toLowerCase())) {
                return post
              }
            })
            .map((post) => {
              return (
                <CardPost
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
          {posts.length === 0 && (
            <p className='m-auto my-6 text-center text-2xl'>まだ投稿されていません</p>
          )}
        </Grid>
      </div>
    </>
  )
}

export default Details
