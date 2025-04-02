import React, { useState } from 'react'
import { CommonHead, CardPost, TopTitle, Breadcrumbs, Pagination } from 'layouts/components/ui'
import { useFetchPost } from 'layouts/hooks'
import { usePagination } from 'layouts/hooks/usePagination'
import { GetPost } from 'types/post'

export default function Index() {
  const [currentPage, setCurrentPage] = useState<number>(1)
  const postsPerPage = 8 // 1ページあたりの表示数を8に設定

  const postData = useFetchPost()

  // 投稿を人気順（いいねの数順）にソート
  // const sortedPosts = useMemo(() => {
  //   return [...postData]
  // }, [postData])

  const { paginatedPosts, totalPages, totalPosts } = usePagination({
    posts: postData || [],
    currentPage,
    postsPerPage,
    sortType: 'recommend',
  })

  return (
    <div className='m-auto w-11/12 md:w-full'>
      <CommonHead title='Manga Study - おすすめの記事' />
      <Breadcrumbs secondTitle='おすすめ記事' />
      <TopTitle title='おすすめ記事' />

      <p className='text-1xl mb-6 text-center'>投稿数 {totalPosts}件</p>

      <div className='m-auto flex flex-col flex-wrap justify-start md:flex-row'>
        {paginatedPosts.length === 0 ? (
          <p className='my-2 text-center'>記事がありません。</p>
        ) : (
          paginatedPosts.map((post) => (
            <div className='w-full md:w-1/4' key={post.id}>
              <CardPost {...post} />
            </div>
          ))
        )}
      </div>

      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={setCurrentPage} />
    </div>
  )
}
