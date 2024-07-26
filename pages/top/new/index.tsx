import React, { useEffect, useState, useMemo } from 'react'
import Link from 'next/link'
import { getAuth } from 'firebase/auth'
import TextField from '@mui/material/TextField'
import { SiteButton } from 'layouts/components/button'
import {
  useFetchPosts,
  useGetOldPosts,
  useGetLikePosts,
  useGetNetabrePosts,
  useGetNoNetabrePosts,
} from 'layouts/components/hooks'
import { POST_CATEGORIES, COPY_WRITES, CommonHead, CardPost } from 'layouts/components/ui'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { Changetab } from 'layouts/components/ui/Changetab'
import Image from 'react-image-resizer'
import { GetPost } from 'types/post'

export default function Index() {
  const [postData, setPostData] = useState<Array<GetPost>>([])
  const [searchName, setSearchName] = useState<string>('')
  const [loadIndex, setLoadIndex] = useState<number>(3)
  const [isEmpty, setIsEmpty] = useState<boolean>(false)
  const auth = getAuth()
  const user = auth.currentUser

  const displayMore = () => {
    if (loadIndex > postData.length) {
      setIsEmpty(true)
    } else {
      setLoadIndex(loadIndex + 3)
    }
  }

  interface NetabareItem {
    sortId: number
    label: string
    value: string
    onClick: () => void
  }

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
    <div>
      <CommonHead />
      <div className='my-12'>
        <h2 className='text-left text-2xl font-semibold'>
          新着記事 
        </h2>
      </div>
      <div className='m-auto flex flex-col flex-wrap justify-center md:flex-row'>
        {postData.length === 0 ? (
          <p className='my-2 text-center'>記事がありません。</p>
        ) : (
          filteredPosts.map((post) => (
            <CardPost
              key={post.id}
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
          ))
        )}
      </div>
    </div>
  )
}
