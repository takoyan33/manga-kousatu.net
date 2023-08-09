import React, { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { getAuth } from 'firebase/auth'
import TextField from '@mui/material/TextField'
import { SiteButton } from 'layouts/components/button'
import {
  getPosts,
  getOldPosts,
  getLikePosts,
  getNetabrePosts,
  getNoNetabrePosts,
} from 'layouts/components/hooks'
import { POST_CATEGORIES, CommonHead, CardPost } from 'layouts/components/ui'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { Changetab } from 'layouts/components/ui/Changetab'
import Image from 'react-image-resizer'

export default function Index() {
  const [postData, setPostData] = useState([])
  const [searchName, setSearchName] = useState('')
  const [loadIndex, setLoadIndex] = useState(6)
  const [isEmpty, setIsEmpty] = useState(false)
  const [loading, setLoading] = useState(false)
  const auth = getAuth()
  const user = auth.currentUser

  useEffect(() => {
    setLoading(true)
    getPosts(setPostData)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const displayMore = () => {
    if (loadIndex > postData.length) {
      setIsEmpty(true)
    } else {
      setLoadIndex(loadIndex + 4)
    }
  }

  const SORT_LIST = [
    {
      sortId: 1,
      label: '新しい順',
      value: '新しい順',
      onClick: () => getPosts(setPostData),
    },
    {
      sortId: 2,
      label: '古い順',
      value: '古い順',
      onClick: () => getOldPosts(setPostData),
    },
    {
      sortId: 3,
      label: 'いいね順',
      value: 'いいね順',
      onClick: () => getLikePosts(setPostData),
    },
  ]

  const NETABARE_LIST = [
    {
      sortId: 1,
      label: 'ネタバレ有',
      value: 'ネタバレ有',
      onClick: () => getNetabrePosts(setPostData),
    },
    {
      sortId: 2,
      label: 'ネタバレ無',
      value: 'ネタバレ無',
      onClick: () => getNoNetabrePosts(setPostData),
    },
  ]

  return (
    <div>
      <CommonHead />
      <div className='m-auto my-5 flex justify-center text-center'>
        <Image className='m-auto' height={100} width={200} src='/logo.png' />
      </div>
      <p className='my-5 text-center'>
        Manga Studyでは、人気漫画の考察を
        <br />
        自由に投稿・閲覧できるwebサイトです。
      </p>

      {user && (
        <div className='text-center lg:text-right'>
          <SiteButton href='/post/new' text='新規投稿' className='w-50 m-auto my-2' />
        </div>
      )}
      <h2 className='my-12 text-center text-2xl font-semibold'>投稿一覧</h2>
      <p className='text-1xl text-center'>
        {searchName === ''
          ? `投稿数 ${postData.length}件`
          : `検索結果 ${
              postData.filter((data) => data.title.toLowerCase().includes(searchName.toLowerCase()))
                .length
            }件`}
      </p>

      <h2 className='my-12 text-center text-xl font-semibold'>カテゴリー</h2>

      {POST_CATEGORIES.map((categori) => {
        // userの情報
        const CategoriesInfo = {
          id: categori.id,
          title: categori.title,
        }
        return (
          <span key={categori.id}>
            <span
              className={`rounded-xltext-center + m-6  inline-block rounded-xl border  p-1 font-bold hover:text-white ${categori.className}`}
            >
              <Link
                as={`/post/categories/${categori.title}`}
                href={{
                  pathname: categori.link,
                  query: CategoriesInfo,
                }}
              >
                <a>{categori.title}</a>
              </Link>
            </span>
          </span>
        )
      })}
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
      </div>

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

      <div className='m-auto flex flex-col flex-wrap justify-center  md:flex-row'>
        {postData.length === 0 ? (
          <p className='my-2 text-center'>記事がありません。</p>
        ) : postData.filter((post) => {
            if (searchName === '') {
              return post
            } else if (post.title.toLowerCase().includes(searchName.toLowerCase())) {
              return post
            }
          }).length === 0 ? (
          <p className='m-auto my-10 text-center text-xl'>検索した名前の記事がありませんでした。</p>
        ) : (
          postData
            .filter((post) => {
              if (searchName === '') {
                return post
              } else if (post.title.toLowerCase().includes(searchName.toLowerCase())) {
                return post
              }
            })
            .slice(0, loadIndex)
            .map((post) => (
              <CardPost
                key={post.id}
                downloadURL={post.downloadURL}
                title={post.title}
                categori={post.categori}
                netabare={post.netabare}
                context={post.context}
                createtime={post.createtime}
                displayname={post.displayname}
                email={post.email}
                id={post.id}
                photoURL={post.photoURL}
                likes={post.likes}
                selected={post.selected}
              />
            ))
        )}
      </div>

      <div className='text-center'>
        {postData.length > 6 && (
          <SiteButton
            href=''
            text='さらに表示'
            disabled={isEmpty ? true : false}
            onClick={displayMore}
            className='w-50 m-auto my-2'
          />
        )}
      </div>
      <div className='my-4'>
        <p>© 尾田栄一郎／集英社・フジテレビ・東映アニメーション</p>
        <p>© 和久井健・講談社／アニメ「東京リベンジャーズ」</p>
        <p>©原泰久／集英社・キングダム製作委員会</p>
        <p>©芥見下々／集英社・呪術廻戦製作委員会</p>
      </div>
    </div>
  )
}
