import React, { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { getAuth } from 'firebase/auth'
import TextField from '@mui/material/TextField'
import { SiteButton } from 'layouts/components/button'
import {
  useFetchPosts,
  useGetOldPosts,
  useGetLikePosts,
  useGetNetabrePosts,
  useGetNoNetabrePosts,
} from 'layouts/components/hooks'
import { POST_CATEGORIES, COPY_WRITES, CommonHead, CardPost } from 'layouts/components/ui'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { Changetab } from 'layouts/components/ui/Changetab'
import Image from 'react-image-resizer'
import { GetPost } from 'types/post'

export default function Index() {
  const [postData, setPostData] = useState<Array<GetPost>>([])
  const [searchName, setSearchName] = useState<string>('')
  const [loadIndex, setLoadIndex] = useState<number>(9)
  const [isEmpty, setIsEmpty] = useState<boolean>(false)
  const auth = getAuth()
  const user = auth.currentUser

  const displayMore = () => {
    if (loadIndex > postData.length) {
      setIsEmpty(true)
    } else {
      setLoadIndex(loadIndex + 9)
    }
  }

  interface NetabareItem {
    sortId: number
    label: string
    value: string
    onClick: () => void
  }

  useEffect(() => {
    useFetchPosts(setPostData)
  }, [])

  const SORT_LIST: NetabareItem[] = [
    {
      sortId: 1,
      label: '新しい順',
      value: '新しい順',
      onClick: () => useFetchPosts(setPostData),
    },
    {
      sortId: 2,
      label: '古い順',
      value: '古い順',
      onClick: () => useGetOldPosts(setPostData),
    },
    {
      sortId: 9,
      label: 'いいね順',
      value: 'いいね順',
      onClick: () => useGetLikePosts(setPostData),
    },
  ]

  const NETABARE_LIST: NetabareItem[] = [
    {
      sortId: 1,
      label: 'ネタバレ有',
      value: 'ネタバレ有',
      onClick: () => useGetNetabrePosts(setPostData),
    },
    {
      sortId: 2,
      label: 'ネタバレ無',
      value: 'ネタバレ無',
      onClick: () => useGetNoNetabrePosts(setPostData),
    },
  ]

  const filterPostData = () => {
    return postData
      .filter((post) => {
        if (searchName === '') {
          return true
        } else if (post.title.toLowerCase().includes(searchName.toLowerCase())) {
          return true
        }
        return false
      })
      .slice(0, loadIndex)
  }

  const filteredPosts = filterPostData()
  console.log(postData)

  // interface CategoryParams {
  //   id: string | ParsedUrlQueryInput
  //   title: string | ParsedUrlQueryInput
  // }

  return (
    <div className='m-auto w-11/12 md:w-full'>
      <CommonHead />
      <h2 className='text-left text-xl font-semibold'>カテゴリで探す</h2>
      {POST_CATEGORIES.map((category) => {
        // userの情報
        const CategoriesInfo = {
          id: category.id,
          title: category.title,
        }
        return (
          <span key={category.id}>
            <span
              className={`m-6 inline-block rounded border px-4 py-2 text-center font-bold hover:text-white ${category.className}`}
            >
              <Link
                as={`/post/categories/${category.title}`}
                href={{
                  pathname: category.link,
                  query: CategoriesInfo,
                }}
              >
                <a>#{category.title}</a>
              </Link>
            </span>
          </span>
        )
      })}
      <h2 className='my-12 text-left text-2xl font-semibold'>投稿一覧</h2>
      <p className='text-1xl text-center'>
        {searchName === ''
          ? `投稿数 ${postData.length}件`
          : `検索結果 ${
              postData.filter((data) => data.title.toLowerCase().includes(searchName.toLowerCase()))
                .length
            }件`}
      </p>
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
        <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
          <InputLabel id='demo-select-small'>ネタバレ</InputLabel>

          <Select labelId='demo-select-small' id='demo-select-small' label='ネタバレ'>
            {NETABARE_LIST.map((netabare) => (
              <MenuItem key={netabare.sortId} value={netabare.value} onClick={netabare.onClick}>
                {netabare.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
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
      <div className='m-auto flex flex-col flex-wrap justify-start md:flex-row'>
        {postData.length === 0 ? (
          <p className='my-2 text-center'>記事がありません。</p>
        ) : filteredPosts.length === 0 ? (
          <p className='m-auto my-10 text-center text-xl'>検索した名前の記事がありませんでした。</p>
        ) : (
          filteredPosts.map((post) => (
            <div className='w-1/4'>
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
            </div>
          ))
        )}
      </div>
      <div className='text-center'>
        {postData.length > 9 && (
          <SiteButton
            href=''
            text='さらに表示'
            disabled={isEmpty ? true : false}
            onClick={displayMore}
            className='w-50 m-auto my-2'
          />
        )}
      </div>
    </div>
  )
}
