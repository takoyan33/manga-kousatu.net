import TextField from '@mui/material/TextField'
import Link from 'next/link'
import React, { useEffect, useState, useMemo } from 'react'
import { POST_CATEGORIES, CommonHead, CardPost, Breadcrumbs, TopTitle } from 'layouts/components/ui'
import { useFetchPosts } from 'layouts/hooks'
import { GetPost } from 'types/post'

export default function Index() {
  const [postData, setPostData] = useState<Array<GetPost>>([])
  const [searchName, setSearchName] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1)
  const postsPerPage = 6

  useEffect(() => {
    useFetchPosts(setPostData)
  }, [])

  const filteredPosts = useMemo(() => {
    return postData.filter(
      (post) => searchName === '' || post.title.toLowerCase().includes(searchName.toLowerCase()),
    )
  }, [postData, searchName])

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage
    return filteredPosts.slice(startIndex, startIndex + postsPerPage)
  }, [filteredPosts, currentPage])

  return (
    <div className='m-auto w-11/12 md:w-full'>
      <CommonHead title='Manga Study - 全ての記事' />
      <Breadcrumbs secondTitle='投稿一覧' />
      <TopTitle title='投稿一覧' />

      <h3 className='text-left text-xl font-semibold'>カテゴリ</h3>
      {POST_CATEGORIES.map((category) => (
        <span key={category.id}>
          <span
            className={`m-2 inline-block rounded border px-4 py-2 hover:text-white md:m-6 ${category.className}`}
          >
            <Link href={`/post/categories/${category.title}`}>#{category.title}</Link>
          </span>
        </span>
      ))}

      <p className='text-1xl text-center'>
        {searchName === '' ? `投稿数 ${postData.length}件` : `検索結果 ${filteredPosts.length}件`}
      </p>

      <div className='m-auto my-10 flex justify-center'>
        <TextField
          type='search'
          placeholder='記事を検索する'
          variant='outlined'
          onChange={(event) => setSearchName(event.target.value)}
        />
      </div>

      <div className='m-auto flex flex-col flex-wrap justify-start md:flex-row'>
        {filteredPosts.length === 0 ? (
          <p className='my-10 text-center text-xl'>記事がありません。</p>
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
