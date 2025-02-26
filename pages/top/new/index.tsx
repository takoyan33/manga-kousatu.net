import React, { useEffect, useState } from 'react'
import { CommonHead, CardPost, TopTitle, Breadcrumbs, Pagination } from 'layouts/components/ui'
import { useFetchPosts } from 'layouts/hooks'
import { usePagination } from 'layouts/hooks/usePagination'
import { GetPost } from 'types/post'

export default function Index() {
  const [postData, setPostData] = useState<Array<GetPost>>([])
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 8

  useEffect(() => {
    useFetchPosts(setPostData)
  }, [])

  const { paginatedPosts, totalPages, totalPosts } = usePagination({
    posts: postData,
    currentPage,
    postsPerPage,
    sortType: 'new',
  })

  return (
    <div className='m-auto w-11/12 md:w-full'>
      <CommonHead title='Manga Study - 新着記事' />
      <Breadcrumbs secondTitle='新着記事' />
      <TopTitle title='新着記事' />

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
