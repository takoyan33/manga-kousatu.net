import Image from 'next/image'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { POST_CATEGORIES, CommonHead, CardPost, TopTitle } from 'layouts/components/ui'
import { useGetOldPosts, useGetNewPosts } from 'layouts/hooks'
import { GetPost } from 'types/post'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function Index() {
  const [postData, setPostData] = useState<GetPost[]>([])
  const [oldPostData, setOldPostData] = useState<GetPost[]>([])

  useEffect(() => {
    useGetOldPosts(setOldPostData)
    useGetNewPosts(setPostData)
  }, [])

  return (
    <div className='m-auto w-11/12 md:w-full'>
      <CommonHead title='Manga Study' />

      {/* おすすめ記事 */}
      <TopTitle title='おすすめ記事' url='/top/recommend' />
      <SwiperSection
        posts={oldPostData}
        prevClass='prev-button-recommend'
        nextClass='next-button-recommend'
      />

      {/* 新着記事 */}
      <TopTitle title='新着記事' url='/top/new' />
      <SwiperSection posts={postData} prevClass='prev-button' nextClass='next-button' />

      {/* 投稿一覧 */}
      <TopTitle title='投稿一覧' url='/top/all' />
      <SwiperSection posts={postData} prevClass='prev-button-all' nextClass='next-button-all' />

      {/* カテゴリ一覧 */}
      <TopTitle title='カテゴリで探す' />
      <div className='flex flex-wrap gap-2'>
        {POST_CATEGORIES.map((category) => (
          <Link
            key={category.id}
            href={{ pathname: category.link, query: { id: category.id, title: category.title } }}
          >
            <span
              className={`m-2 inline-block rounded border px-4 py-2 text-center font-bold hover:text-white md:m-6 ${category.className}`}
            >
              #{category.title}
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}

function SwiperSection({
  posts,
  prevClass,
  nextClass,
}: {
  posts: GetPost[]
  prevClass: string
  nextClass: string
}) {
  const breakpoints = {
    0: { slidesPerView: 1.5 },
    768: { slidesPerView: 3.5 },
  }
  return (
    <div className='m-auto flex items-center justify-center md:flex-row'>
      <div className={`${prevClass} mr-0 w-48 cursor-pointer md:w-20`}>
        <Image
          src='/images/prev-arrow.svg'
          width={60}
          height={60}
          className='cursor-pointer'
          alt='スライドショーのナビゲーション'
        />
      </div>
      <Swiper
        className='m-auto flex flex-col flex-wrap justify-center md:flex-row'
        spaceBetween={10}
        slidesPerView={3.5}
        breakpoints={breakpoints}
        modules={[Navigation]}
        navigation={{ nextEl: `.${nextClass}`, prevEl: `.${prevClass}` }}
        lazyPreloadPrevNext={2}
      >
        {posts.length === 0 ? (
          <p className='my-2 text-center'>記事がありません。</p>
        ) : (
          posts.map((post) => (
            <SwiperSlide key={post.id}>
              <CardPost {...post} />
            </SwiperSlide>
          ))
        )}
      </Swiper>
      <div className={`${nextClass} w-48 cursor-pointer md:ml-10 md:w-20`}>
        <Image
          src='/images/next-arrow.svg'
          width={60}
          height={60}
          className='cursor-pointer'
          alt='スライドショーのナビゲーション'
        />
      </div>
    </div>
  )
}
