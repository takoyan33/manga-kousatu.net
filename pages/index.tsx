import Image from 'next/image'
import React from 'react'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { CategoryList } from 'layouts/components/text'
import { CommonHead, CardPost, TopTitle } from 'layouts/components/ui'
import { useGetOldPosts, useFetchPost } from 'layouts/hooks'
import { GetPost } from 'types/post'
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'

export default function Index() {
  const oldPostData = useGetOldPosts()
  const postData = useFetchPost()

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
      <CategoryList />
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
    <div className='m-auto flex min-h-[300px] items-center justify-center md:flex-row'>
      <div className={`${prevClass} w-[60px] cursor-pointer`}>
        <Image
          src='/images/prev-arrow.svg'
          width={60}
          height={60}
          className='cursor-pointer'
          alt='戻る'
          quality={20}
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
      <div className={`${nextClass} w-[60px] cursor-pointer`}>
        <Image
          src='/images/next-arrow.svg'
          width={60}
          height={60}
          className='cursor-pointer'
          alt='進む'
          quality={20}
        />
      </div>
    </div>
  )
}
