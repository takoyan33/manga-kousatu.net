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
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'

export default function Index() {
  const [postData, setPostData] = useState<Array<GetPost>>([])
  const [searchName, setSearchName] = useState<string>('')
  const [loadIndex, setLoadIndex] = useState<number>(3)
  const [isEmpty, setIsEmpty] = useState<boolean>(false)
  const auth = getAuth()
  const user = auth.currentUser

  interface NetabareItem {
    sortId: number
    label: string
    value: string
    onClick: () => void
  }

  useEffect(() => {
    useFetchPosts(setPostData)
  }, [])

  const filterPostData = () => {
    return postData.filter((post) => {
      if (searchName === '') {
        return true
      } else if (post.title.toLowerCase().includes(searchName.toLowerCase())) {
        return true
      }
      return false
    })
  }

  const filteredPosts = filterPostData()
  console.log(postData)

  // interface CategoryParams {
  //   id: string | ParsedUrlQueryInput
  //   title: string | ParsedUrlQueryInput
  // }

  const breakpoints = {
    0: {
      slidesPerView: 1.5,
    },
    768: {
      slidesPerView: 3.5,
    },
  }
  return (
    <div className='w-11/12 md:w-full m-auto'>
      <CommonHead />
      <div className='my-12'>
        <h2 className='text-left text-2xl font-semibold'>
          おすすめ記事
          <span className='ml-4 text-sm text-gray-600'>
            <Link href='/top/recommend'>すべて見る</Link>
          </span>
        </h2>
      </div>
      <Swiper
        className='m-auto flex flex-col flex-wrap justify-center md:flex-row'
        spaceBetween={10}
        slidesPerView={3.5}
        breakpoints={breakpoints}
      >
        {postData.length === 0 ? (
          <p className='my-2 text-center'>記事がありません。</p>
        ) : (
          filteredPosts.map((post) => (
            <SwiperSlide>
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
            </SwiperSlide>
          ))
        )}
      </Swiper>
      <div className='my-12'>
        <h2 className='text-left text-2xl font-semibold'>
          新着記事
          <span className='ml-4 text-sm text-gray-600'>
            <Link href='/top/new'>すべて見る</Link>
          </span>
        </h2>
      </div>
      <Swiper
        className='m-auto flex flex-col flex-wrap justify-center md:flex-row'
        spaceBetween={10}
        slidesPerView={3.5}
        breakpoints={breakpoints}
      >
        {postData.length === 0 ? (
          <p className='my-2 text-center'>記事がありません。</p>
        ) : (
          filteredPosts.map((post) => (
            <SwiperSlide>
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
            </SwiperSlide>
          ))
        )}
      </Swiper>

      <h2 className='my-12 text-left text-2xl font-semibold'>
        投稿一覧
        <span className='ml-4 text-sm text-gray-600'>
          <Link href='/top/all'>すべて見る</Link>
        </span>
      </h2>
      <Swiper
        className='m-auto flex flex-col flex-wrap justify-center  md:flex-row'
        spaceBetween={10}
        slidesPerView={3.5}
        breakpoints={breakpoints}
      >
        {postData.length === 0 ? (
          <p className='my-2 text-center'>記事がありません。</p>
        ) : (
          filteredPosts.map((post) => (
            <SwiperSlide>
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
            </SwiperSlide>
          ))
        )}
      </Swiper>
      <h2 className='mb-4 mt-12 text-left text-xl font-semibold'>カテゴリで探す</h2>
      {POST_CATEGORIES.map((category) => {
        const CategoriesInfo = {
          id: category.id,
          title: category.title,
        }
        return (
          <span key={category.id}>
            <span
              className={`m-2 inline-block rounded border px-4 py-2 text-center font-bold hover:text-white md:m-6 ${category.className}`}
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
    </div>
  )
}
