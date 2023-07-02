import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { getMyPosts, getMyUser } from 'layouts/components/hooks'
import { getAuth } from 'firebase/auth'
import { CommonHead, ProfileId, CardPost } from 'layouts/components/ui'
import Grid from '@material-ui/core/Grid'

const Post = () => {
  const [users, setUsers] = useState([])
  const [postsData, setPostData] = useState([])
  const [likes, setLikes] = useState(null)
  const router = useRouter()
  const { userid } = router.query
  const auth = getAuth()
  const user = auth.currentUser

  useEffect(() => {
    if (user && userid == user.uid) {
      router.push('/profile')
    }
    getMyUser(setUsers, userid)
    getMyPosts(setPostData, userid)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, userid, router])

  return (
    <>
      <CommonHead />
      <>
        {users &&
          users.map((user) => {
            return (
              <>
                {userid == user.userid && (
                  <ProfileId
                    key={user.id}
                    profileimage={user.profileimage}
                    username={user.username}
                    bio={user.bio}
                    favorite={user.favarite}
                    id={user.id}
                  />
                )}
              </>
            )
          })}
      </>
      <h2 className='m-5 my-12 text-center text-2xl font-semibold'>過去の投稿</h2>
      <Grid container className='m-auto'>
        {postsData.length === 0 && <p>まだ投稿していません</p>}
        {postsData &&
          postsData.map((post) => {
            return (
              <>
                <CardPost
                  key={post.id}
                  downloadURL={post.downloadURL}
                  title={post.title}
                  categori={post.categori}
                  netabare={post.netabare}
                  context={post.context}
                  createtime={post.createtime}
                  displayname={post.displayname}
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
