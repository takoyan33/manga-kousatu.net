"use client"

import TextField from '@mui/material/TextField'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { SiteButton } from '../../layouts/components/button'
import { ProfileId, DisplayChart, NoIndexHead } from 'layouts/components/ui'
import { useAuthContext } from 'layouts/context/AuthContext'
import { useGetMyPosts, useGetMyUser } from 'layouts/hooks'
import { GetPost } from 'types/post'
import { GetUser } from 'types/user'

export default function Profile() {
  const router = useRouter()
  const { user } = useAuthContext()
  const [users, setUsers] = useState<GetUser>()
  const [postsData, setPostData] = useState<Array<GetPost>>([])
  const [searchName, setSearchName] = useState<string>('')

  useEffect(() => {
    if (!user) {
      router.push('/')
    }
  }, [user])

  useEffect(() => {
    if (!user) {
      router.push('/register')
    } else {
      useGetMyPosts(setPostData, user.email)
      useGetMyUser(setUsers, user.uid)
      console.log(users)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const filterPostData = (): any => {
    return postsData.filter((post) => {
      if (searchName === '' || post.title.toLowerCase().includes(searchName.toLowerCase())) {
        return true
      }
      return false
    })
  }

  const filteredPosts = filterPostData()

  return (
    <>
      <NoIndexHead />
      <h2 className='m-5 my-12 text-center text-2xl font-semibold'>プロフィール</h2>
      {/* <AccountMenu onClick={deleteuser} /> */}
      <ProfileId
        key={users?.id}
        profileImage={users?.profileImage ?? ''}
        userName={users?.userName ?? ''}
        bio={users?.bio ?? ''}
        favorite={users?.favorite ?? []}
        id={users?.id ?? ''}
      />
      <div className='text-center'>
        <SiteButton
          id='profile-edit'
          href='/profile/edit'
          text='Edit Profile'
          className='w-50 m-auto my-2'
        />
      </div>

      <p className='my-12 text-center text-2xl font-semibold'>過去の投稿</p>
      <p className='text-1xl text-center'>投稿数 {filteredPosts.length}件</p>
      <div>
        <DisplayChart />
      </div>

      <TextField
        type='text'
        id='outlined-basic'
        placeholder='考察記事を検索する'
        variant='outlined'
        onChange={(event) => {
          setSearchName(event.target.value)
        }}
      />

      <div className='relative my-10 overflow-x-auto shadow-md sm:rounded-lg'>
        <table className='w-full text-left text-sm text-gray-500'>
          <thead className='bg-gray-50 text-xs uppercase text-gray-700'>
            <tr>
              <th scope='col' className='px-6 py-3'>
                タイトル
              </th>
              <th scope='col' className='px-6 py-3'>
                <div className='flex items-center'>カテゴリ</div>
              </th>
              <th scope='col' className='px-6 py-3'>
                <div className='flex items-center'>投稿日時</div>
              </th>
              <th scope='col' className='px-6 py-3'>
                <div className='flex items-center'>いいね数</div>
              </th>
              <th scope='col' className='px-6 py-3'>
                <div className='flex items-center'>公開状態</div>
              </th>
              <th scope='col' className='px-6 py-3'>
                <div className='flex items-center'>編集</div>
              </th>
            </tr>
          </thead>
          <tbody>
            {postsData.length === 0 ? 
              <tr className='my-2 text-center'>
                <td>記事がありません。</td>
              </tr>
             : filteredPosts.length === 0 ? 
              <tr className='m-auto my-10 text-center text-xl'>
                <td>検索した名前の記事がありませんでした。</td>
              </tr>
             : 
              filteredPosts.map((post) => 
                <tr className='border-b bg-white' key={post.id}>
                  <th
                    scope='row'
                    className='whitespace-nowrap px-6 py-4 font-medium text-gray-900  hover:text-blue-600'
                  >
                    <Link href={`/post/${post.id}`}>{post.title}</Link>
                  </th>
                  <td className='px-6 py-4'>{post.category}</td>
                  <td className='px-6 py-4'> {post.createTime}</td>
                  <td className='px-6 py-4'> {post.likes}</td>
                  <td className='px-6 py-4'>{post.display ? <p>公開</p> : <p>下書き</p>}</td>
                  <td className='px-6 py-4 text-right font-medium text-blue-600 hover:underline'>
                    <Link href={`/post/edit/${post.id}`}>編集する</Link>
                  </td>
                </tr>
              )
            }
          </tbody>
        </table>
      </div>
    </>
  )
}
