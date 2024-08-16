import { getAuth } from 'firebase/auth'
import React, { useEffect, useState } from 'react'
import { SiteButton } from 'layouts/components/button'
import {
  useFetchPosts,
  // useGetOldPosts,
  // useGetLikePosts,
  // useGetNetabrePosts,
  // useGetNoNetabrePosts,
} from 'layouts/components/hooks'
import { CommonHead, CardPost } from 'layouts/components/ui'
import { GetPost } from 'types/post'

export default function Index() {
  const [postData, setPostData] = useState<Array<GetPost>>([])
  const [searchName, setSearchName] = useState<string>('')
  const [loadIndex, setLoadIndex] = useState<number>(9)
  const [isEmpty, setIsEmpty] = useState<boolean>(false)
  const auth = getAuth()
  const user = auth.currentUser

  const displayMore = () => {
    if (loadIndex > postData.length) {
      setIsEmpty(true)
    } else {
      setLoadIndex(loadIndex + 9)
    }
  }

  // interface NetabareItem {
  //   sortId: number
  //   label: string
  //   value: string
  //   onClick: () => void
  // }

  useEffect(() => {
    useFetchPosts(setPostData)
  }, [])

  const filterPostData = () => {
    return postData
      .filter((post) => {
        if (searchName === '') {
          return true
        } else if (post.title.toLowerCase().includes(searchName.toLowerCase())) {
          return true
        }
        return false
      })
      .slice(0, loadIndex)
  }

  const filteredPosts = filterPostData()
  console.log(postData)

  // interface CategoryParams {
  //   id: string | ParsedUrlQueryInput
  //   title: string | ParsedUrlQueryInput
  // }

  return (
    <div className='m-auto w-11/12 md:w-full'>
      <CommonHead />
      <div className='my-12'>
        <h2 className='text-left text-2xl font-semibold'>新着記事</h2>
      </div>
      <div className='m-auto flex flex-col flex-wrap justify-start md:flex-row'>
        {postData.length === 0 ? (
          <p className='my-2 text-center'>記事がありません。</p>
        ) : filteredPosts.length === 0 ? (
          <p className='m-auto my-10 text-center text-xl'>検索した名前の記事がありませんでした。</p>
        ) : (
          filteredPosts.map((post) => (
            <div className='w-1/4' key={post.id}>
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
