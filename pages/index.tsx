import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useFetchPosts, useGetOldPosts } from 'layouts/components/hooks'
import { POST_CATEGORIES, CommonHead, CardPost } from 'layouts/components/ui'
import { GetPost } from 'types/post'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function Index() {
  const [postData, setPostData] = useState<Array<GetPost>>([])
  const [oldPostData, setOldPostData] = useState<Array<GetPost>>([])
  // const [recommendPostData, setRecommendPostData] = useState<Array<GetPost>>([])

  // interface NetabareItem {
  //   sortId: number
  //   label: string
  //   value: string
  //   onClick: () => void
  // }

  useEffect(() => {
    useFetchPosts(setPostData)
    useGetOldPosts(setOldPostData)
    // setRecommendPostData(postData.sort(() => Math.random() - 0.5).slice(0, 3))
  }, [])

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
    <div className='m-auto w-11/12 md:w-full'>
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
          postData.map((post) => (
            <SwiperSlide key={post.id}>
              <CardPost
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
          postData.map((post) => (
            <SwiperSlide key={post.id}>
              <CardPost
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
        {oldPostData.length === 0 ? (
          <p className='my-2 text-center'>記事がありません。</p>
        ) : (
          oldPostData.map((post) => (
            <SwiperSlide key={post.id}>
              <CardPost
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
