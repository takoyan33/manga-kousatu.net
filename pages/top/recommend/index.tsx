import React, { useEffect, useState, useMemo } from 'react'
import { SiteButton } from 'layouts/components/button'
import { CommonHead, CardPost, TopTitle, Breadcrumbs } from 'layouts/components/ui'
import { useFetchPosts } from 'layouts/hooks'
import { GetPost } from 'types/post'

export default function Index() {
  const [postData, setPostData] = useState<Array<GetPost>>([])
  const [currentPage, setCurrentPage] = useState<number>(1)
  const postsPerPage = 8 // 1ページあたりの表示数を8に設定

  useEffect(() => {
    useFetchPosts(setPostData)
  }, [])

  // 投稿を人気順（いいねの数順）にソート
  const sortedPosts = useMemo(() => {
    return [...postData]
  }, [postData])

  const totalPages = Math.ceil(sortedPosts.length / postsPerPage)

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage
    return sortedPosts.slice(startIndex, startIndex + postsPerPage)
  }, [sortedPosts, currentPage])

  return (
    <div className='m-auto w-11/12 md:w-full'>
      <CommonHead title='Manga Study - おすすめの記事' />
      <Breadcrumbs secondTitle='おすすめ記事' />
      <TopTitle title='おすすめ記事' />

      <p className='text-1xl mb-6 text-center'>投稿数 {postData.length}件</p>

      <div className='m-auto flex flex-col flex-wrap justify-start md:flex-row'>
        {postData.length === 0 ? (
          <p className='my-2 text-center'>記事がありません。</p>
        ) : (
          paginatedPosts.map((post) => (
            <div className='w-full md:w-1/4' key={post.id}>
              <CardPost {...post} />
            </div>
          ))
        )}
      </div>

      {totalPages > 1 && (
        <div className='my-6 flex justify-center'>
          <button
            className='mx-2 rounded border px-4 py-2 disabled:opacity-50'
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            前へ
          </button>
          <span className='mx-4 text-lg'>
            {currentPage} / {totalPages}
          </span>
          <button
            className='mx-2 rounded border px-4 py-2 disabled:opacity-50'
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            次へ
          </button>
        </div>
      )}
    </div>
  )
}
