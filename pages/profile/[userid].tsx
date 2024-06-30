import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useGetOtherUser, useGetUsersPosts } from 'layouts/components/hooks'
import { getAuth } from 'firebase/auth'
import { CommonHead, ProfileId, CardPost } from 'layouts/components/ui'
import Grid from '@material-ui/core/Grid'
import { GetPost } from 'types/post'
import { GetUser } from 'types/user'

const Post = () => {
  const [users, setUsers] = useState<Array<GetUser>>([])
  const [postsData, setPostData] = useState<Array<GetPost>>([])
  const router = useRouter()
  const { userid } = router.query
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
      <CommonHead />
      <>
        {users &&
          users.map((user) => {
            return (
              <>
                <ProfileId
                  key={user.id}
                  profileImage={user.profileImage}
                  userName={user.userName}
                  bio={user.bio}
                  favorite={user.favorite}
                  id={user.id}
                />
              </>
            )
          })}
      </>
      <h2 className='m-5 my-12 text-center text-2xl font-semibold'>過去の投稿</h2>
      <Grid container className='m-auto'>
        {postsData.length === 0 && <p className='text-center'>まだ投稿していません</p>}
        {postsData &&
          postsData.map((post) => {
            return (
              <>
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
                />
              </>
            )
          })}
      </Grid>
    </>
  )
}

export default Post
