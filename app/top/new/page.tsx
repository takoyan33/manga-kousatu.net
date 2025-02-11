'use client'

import React, { useEffect, useState } from 'react'
import { SiteButton } from 'layouts/components/button'
import { CommonHead, CardPost, TopTitle, Breadcrumbs } from 'layouts/components/ui'
import { useFetchPosts } from 'layouts/hooks'
import { GetPost } from 'types/post'

export default function Index() {
  const [postData, setPostData] = useState<Array<GetPost>>([])
  const [loadIndex, setLoadIndex] = useState<number>(9)
  const [isEmpty, setIsEmpty] = useState<boolean>(false)

  const displayMore = () => {
    if (loadIndex > postData.length) {
      setIsEmpty(true)
    } else {
      setLoadIndex(loadIndex + 9)
    }
  }

  useEffect(() => {
    useFetchPosts(setPostData)
  }, [])

  return (
    <div className='m-auto w-11/12 md:w-full'>
      <CommonHead title='Manga Study - 記事投稿' />
      <Breadcrumbs secondTitle='新着記事' />
      <TopTitle title='新着記事' />
      <div className='m-auto flex flex-col flex-wrap justify-start md:flex-row'>
        {postData.length === 0 ? (
          <p className='my-2 text-center'>記事がありません。</p>
        ) : (
          postData.map((post) => (
            <div className='w-full md:w-1/4' key={post.id}>
              <CardPost {...post} />
            </div>
          ))
        )}
      </div>
      <div className='text-center'>
        {postData.length > 9 && (
          <SiteButton
            text='さらに表示'
            disabled={isEmpty ? true : false}
            onClick={displayMore}
            className='w-50 m-auto my-2'
          />
        )}
      </div>
    </div>
  )
}
