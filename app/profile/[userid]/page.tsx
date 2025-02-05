'use client'

import { getAuth } from 'firebase/auth'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { CommonHead, ProfileId, CardPost } from 'layouts/components/ui'
import { useGetOtherUser, useGetUsersPosts } from 'layouts/hooks'
import { GetPost } from 'types/post'
import { GetUser } from 'types/user'

const Post = () => {
  const [users, setUsers] = useState<GetUser>()
  const [postsData, setPostData] = useState<Array<GetPost>>([])
  const router = useRouter()
  const { userid }: any = router.query
  const auth = getAuth()
  const user = auth.currentUser

  useEffect(() => {
    if (user && userid == user.uid) {
      router.push('/profile')
    }
    useGetOtherUser(setUsers, userid)
    useGetUsersPosts(setPostData, userid)
  }, [user, userid, router])

  return (
    <>
      <CommonHead title='Manga Study - プロフィール' />

      <ProfileId
        key={users?.id}
        profileImage={users?.profileImage ?? ''}
        userName={users?.userName ?? ''}
        bio={users?.bio ?? ''}
        favorite={users?.favorite ?? []}
        id={users?.id ?? ''}
      />
      <h2 className='m-5 my-12 text-center text-2xl font-semibold'>過去の投稿</h2>
      <div className='m-auto flex flex-col flex-wrap justify-start md:flex-row'>
        {postsData.length === 0 ? (
          <p className='my-2 text-center'>まだ投稿していません</p>
        ) : (
          postsData.map((post) => {
            return (
              <div className='w-1/4' key={post.id}>
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
              </div>
            )
          })
        )}
      </div>
    </>
  )
}

export default Post
