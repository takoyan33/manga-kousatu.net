'use client'

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

// interface NetabareItem {
//   sortId: number
//   label: string
//   value: string
//   onClick: () => void
// }

// interface CategoryParams {
//   id: string | ParsedUrlQueryInput
//   title: string | ParsedUrlQueryInput
// }

export default function Index() {
  const [postData, setPostData] = useState<Array<GetPost>>([])
  const [oldPostData, setOldPostData] = useState<Array<GetPost>>([])
  // const [recommendPostData, setRecommendPostData] = useState<Array<GetPost>>([])
  // const [filteredPosts, setFilteredPosts] = useState(postData)

  useEffect(() => {
    useGetOldPosts(setOldPostData)
    useGetNewPosts(setPostData)
    // const shuffledPosts = postData.sort(() => Math.random() - 0.5).slice(0, 5)

    // setFilteredPosts(shuffledPosts)
  }, [])

  const breakpoints = {
    0: {
      slidesPerView: 1.5,
    },
    768: {
      slidesPerView: 3.5,
    },
  }

  const [firstSwiper, setFirstSwiper] = useState<number>(0)
  const [firstSwiperAll, setFirstSwiperAll] = useState<number>(0)
  const [firstSwiperNew, setFirstSwiperNew] = useState<number>(0)

  return (
    <div className='m-auto w-11/12 md:w-full'>
      {/* <head>
        <script src='https://unpkg.com/react-scan/dist/auto.global.js' async />
      </head> */}
      <CommonHead title='Manga Study' />
      <TopTitle title='おすすめ記事' url='/top/recommend' />
      <div className='m-auto flex items-center justify-center md:flex-row'>
        <div className='prev-button-recommend mr-0 w-48 cursor-pointer md:mr-4 md:w-20'>
          {firstSwiper !== 0 && (
            <Image
              src='/images/prev-arrow.svg'
              width={20}
              height={20}
              style={{
                width: '100%',
                height: 'auto',
              }}
              className='cursor-pointer'
              alt='スライドショーのナビゲーション'
            />
          )}
        </div>
        <Swiper
          className='m-auto flex flex-col flex-wrap justify-center md:flex-row'
          spaceBetween={10}
          slidesPerView={3.5}
          breakpoints={breakpoints}
          modules={[Navigation]}
          onSwiper={(swiper) => {
            setFirstSwiper(swiper.activeIndex)
          }}
          onSlideChange={(swiper) => {
            setFirstSwiper(swiper.activeIndex)
          }}
          navigation={{
            nextEl: '.next-button-recommend',
            prevEl: '.prev-button-recommend',
          }}
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
                  id={post.id}
                  likes={post.likes}
                  userid={post.userid}
                />
              </SwiperSlide>
            ))
          )}
        </Swiper>

        <div className='next-button-recommend w-48 cursor-pointer md:ml-4 md:w-20'>
          <Image
            src='/images/next-arrow.svg'
            width={20}
            height={20}
            style={{
              width: '100%',
              height: 'auto',
            }}
            className='cursor-pointer'
            alt='スライドショーのナビゲーション'
          />
        </div>
      </div>

      <TopTitle title='新着記事' url='/top/new' />

      <div className='m-auto flex items-center justify-center md:flex-row'>
        <div className='prev-button mr-4 w-48 cursor-pointer md:w-20'>
          {firstSwiperAll !== 0 && (
            <Image
              src='/images/prev-arrow.svg'
              width={20}
              height={20}
              style={{
                width: '100%',
                height: 'auto',
              }}
              className='cursor-pointer'
              alt='スライドショーのナビゲーション'
            />
          )}
        </div>

        <Swiper
          className='m-auto flex flex-col flex-wrap justify-center md:flex-row'
          spaceBetween={10}
          slidesPerView={3.5}
          modules={[Navigation]}
          breakpoints={breakpoints}
          onSwiper={(swiper) => {
            setFirstSwiperAll(swiper.activeIndex)
          }}
          onSlideChange={(swiper) => {
            setFirstSwiperAll(swiper.activeIndex)
          }}
          navigation={{
            nextEl: '.next-button',
            prevEl: '.prev-button',
          }}
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
                  id={post.id}
                  likes={post.likes}
                  userid={post.userid}
                />
              </SwiperSlide>
            ))
          )}
        </Swiper>

        <div className='next-button w-48 cursor-pointer md:ml-4 md:w-20'>
          <Image
            src='/images/next-arrow.svg'
            width={20}
            height={20}
            style={{
              width: '100%',
              height: 'auto',
            }}
            className='cursor-pointer'
            alt='スライドショーのナビゲーション'
          />
        </div>
      </div>

      <TopTitle title='投稿一覧' url='/top/all' />
      <div className='m-auto flex items-center justify-center md:flex-row'>
        <div className='prev-button-all mr-4 w-48 cursor-pointer md:w-20'>
          {firstSwiperNew !== 0 && (
            <Image
              src='/images/prev-arrow.svg'
              width={20}
              height={20}
              style={{
                width: '100%',
                height: 'auto',
              }}
              className='cursor-pointer'
              alt='スライドショーのナビゲーション'
            />
          )}
        </div>
        <Swiper
          className='m-auto flex flex-col flex-wrap justify-center  md:flex-row'
          spaceBetween={10}
          slidesPerView={3.5}
          modules={[Navigation]}
          breakpoints={breakpoints}
          onSwiper={(swiper) => {
            setFirstSwiperNew(swiper.activeIndex)
          }}
          onSlideChange={(swiper) => {
            setFirstSwiperNew(swiper.activeIndex)
          }}
          navigation={{
            nextEl: '.next-button-all',
            prevEl: '.prev-button-all',
          }}
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
                  id={post.id}
                  likes={post.likes}
                  userid={post.userid}
                />
              </SwiperSlide>
            ))
          )}
        </Swiper>

        <div className='next-button-all w-48 cursor-pointer md:ml-4 md:w-20'>
          <Image
            src='/images/next-arrow.svg'
            width={20}
            height={20}
            style={{
              width: '100%',
              height: 'auto',
            }}
            className='cursor-pointer'
            alt='スライドショーのナビゲーション'
          />
        </div>
      </div>
      <TopTitle title='カテゴリで探す' />
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
                <span>#{category.title}</span>
              </Link>
            </span>
          </span>
        )
      })}
    </div>
  )
}
