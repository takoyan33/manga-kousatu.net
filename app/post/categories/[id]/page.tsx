'use client'

import FormControl from '@mui/material/FormControl'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import Select from '@mui/material/Select'
import TextField from '@mui/material/TextField'
import { getDocs, onSnapshot, query, orderBy } from 'firebase/firestore'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CommonHead, CardPost } from 'layouts/components/ui'
import { postsRef } from 'utils/post'

interface Category {
  id: string
  title: string
}

const Details = () => {
  const { id } = useParams()
  const [category, setCategory] = useState<Category | null>(null)
  const [posts, setPosts] = useState<any[]>([])
  const [searchName, setSearchName] = useState('')

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await fetch(
        `https://firestore.googleapis.com/v1/projects/next-auth-app-2aa40/databases/(default)/documents/categories/${id}`,
      )
      const data = await res.json()
      if (data.fields) {
        setCategory({
          id: data.fields.id.stringValue,
          title: data.fields.title.stringValue,
        })
      }
    }
    fetchCategory()
  }, [id])

  const fetchPosts = async (queryRef: any) => {
    await getDocs(queryRef).then((querySnapshot) => {
      setPosts(
        querySnapshot.docs
          .map((doc) => ({ ...doc.data(), id: doc.id }))
          .filter((post) => post.category === id),
      )
    })
  }

  useEffect(() => {
    fetchPosts(query(postsRef, orderBy('timestamp', 'desc')))
  }, [id])

  return (
    <>
      <CommonHead title={`Manga Study - ${category?.title || 'カテゴリ'}`} />
      <p className='my-4'>
        <Link href='/'>トップ</Link> ＞ 投稿記事 ＞ カテゴリ ＞ {category?.title}
      </p>
      <h1 className='my-12 text-left text-2xl font-semibold'>{category?.title}</h1>

      <div className='m-auto my-10 flex justify-center'>
        <TextField
          id='outlined-basic'
          type='search'
          placeholder='記事を検索する'
          variant='outlined'
          onChange={(event) => setSearchName(event.target.value)}
        />
      </div>

      <p className='text-1xl text-center'>投稿数 {posts.length} 件</p>

      <div className='flex justify-end'>
        <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
          <InputLabel id='sort-label'>ソート</InputLabel>
          <Select
            labelId='sort-label'
            defaultValue='新しい順'
            onChange={(e) => {
              const value = e.target.value
              if (value === '新しい順') {
                fetchPosts(query(postsRef, orderBy('timestamp', 'desc')))
              }
              if (value === '古い順') {
                fetchPosts(query(postsRef, orderBy('timestamp')))
              }
              if (value === 'いいね順') {
                fetchPosts(query(postsRef, orderBy('likes', 'desc')))
              }
            }}
          >
            <MenuItem value='新しい順'>新しい順</MenuItem>
            <MenuItem value='古い順'>古い順</MenuItem>
            <MenuItem value='いいね順'>いいね順</MenuItem>
          </Select>
        </FormControl>
      </div>

      <div className='m-auto flex flex-col flex-wrap justify-start gap-y-4 md:flex-row'>
        {posts
          .filter(
            (post) =>
              searchName === '' || post.title.toLowerCase().includes(searchName.toLowerCase()),
          )
          .map((post) => (
            <div className='w-full md:w-1/4' key={post.id}>
              <CardPost {...post} />
            </div>
          ))}
        {posts.length === 0 && (
          <p className='m-auto my-6 text-center text-2xl'>まだ投稿されていません</p>
        )}
      </div>
    </>
  )
}

export default Details
