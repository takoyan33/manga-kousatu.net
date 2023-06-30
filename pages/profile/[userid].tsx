import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { database } from '../../firebaseConfig'
import { collection, getDocs, query, where } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { CommonHead, Profileid, CardPost } from '../../layouts/components/ui'
import Grid from '@material-ui/core/Grid'

const Post = () => {
  const [users, setUsers] = useState([])
  const postsRef = collection(database, 'posts')
  const [firedata, setFiredata] = useState([])
  const usersRef = collection(database, 'users')
  const [likes, setLikes] = useState(null)
  const router = useRouter()
  const { userid } = router.query
  const auth = getAuth()
  const user = auth.currentUser
  const userpost = query(postsRef, where('userid', '==', userid))
  const yourprofile = query(usersRef, where('userid', '==', userid))

  const fetchPosts = async () => {
    try {
      const querySnapshot = await getDocs(userpost)
      const posts = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      setFiredata(posts)
    } catch (error) {
      console.log('Error fetching posts', error)
    }
  }

  useEffect(() => {
    if (user && userid == user.uid) {
      router.push('/profile')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, userid, router])

  useEffect(() => {
    fetchUserProfile()
    fetchPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchUserProfile = async () => {
    //firestoreからデータ取得
    try {
      const querySnapshot = await getDocs(yourprofile)
      const userData = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      setUsers(userData)
    } catch (error) {
      console.log('Error fetching user data', error)
    }
  }

  return (
    <>
      <CommonHead />
      <>
        {users &&
          users.map((user) => {
            return (
              <>
                {userid == user.userid && (
                  <Profileid
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
        {firedata.length === 0 && <p>まだ投稿していません</p>}
        {firedata &&
          firedata.map((data) => {
            return (
              <>
                <CardPost
                  key={data.id}
                  downloadURL={data.downloadURL}
                  title={data.title}
                  categori={data.categori}
                  netabare={data.netabare}
                  context={data.context}
                  createtime={data.createtime}
                  displayname={data.displayname}
                  email={data.email}
                  id={data.id}
                  photoURL={data.photoURL}
                  likes={data.likes}
                  selected={data.selected}
                />
              </>
            )
          })}
      </Grid>
    </>
  )
}

export default Post
