import React from 'react'
import Link from 'next/link'
import { useEffect, useState, useMemo, useCallback } from 'react'
import { database } from '../../../firebaseConfig'
import { collection, getDocs, doc, Firestore } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { getAuth } from 'firebase/auth'
import styles from '../../../styles/Home.module.css'
import { Card, CardContent, Typography, Avatar } from '@mui/material'
import Grid from '@material-ui/core/Grid'
import Image from 'react-image-resizer'
import Categori from '../text/Categori'
import FavoriteIcon from '@mui/icons-material/Favorite'

type Props = {
  downloadURL: string
  id: number
  title: string
  categori: string
  netabare: string
  context: string
  email: string
  photoURL: string
  displayname: string
  createtime: string
  likes: string
  selected: string[]
}

// eslint-disable-next-line react/display-name
export const Cardpost: React.VFC<Props> = React.memo(
  ({
    downloadURL,
    id,
    likes,
    title,
    categori,
    netabare,
    displayname,
    context,
    email,
    photoURL,
    createtime,
    selected,
  }) => {
    const usersRef = collection(database, 'users')
    const [users, setUsers] = useState(null)
    const [comments, setComments] = useState('')
    const databaseRef = collection(database, 'posts')
    const style: React.CSSProperties = {
      whiteSpace: 'pre-line',
    }
    const cardstyles: React.CSSProperties = {
      margin: '10px',
    }

    const router = useRouter()
    const auth = getAuth()
    const user = auth.currentUser

    const usersData = async () => {
      //firestoreからデータ取得
      await getDocs(usersRef).then((response) => {
        //コレクションのドキュメントを取得
        setUsers(
          response.docs.map((data) => {
            //配列なので、mapで展開する
            return { ...data.data(), id: data.id }
            //スプレッド構文で展開して、新しい配列を作成
          }),
        )
      })
    }

    // const getpostComment = async () => {
    //   const commentseRef = collection(database, 'comments')
    //   const c = query(commentseRef, where('postid', '==', id))
    //   try {
    //     const querySnapshot = await getDocs(c)
    //     const allcomments = querySnapshot.docs.map((doc) => ({
    //       ...doc.data(),
    //       id: doc.id,
    //     }))
    //     console.log('allcomments', allcomments)
    //     setComments(allcomments)
    //   } catch (error) {
    //     console.log('Error fetching user data', error)
    //   }
    // }

    useEffect(() => {
      usersData()
      // getpostComment()
    }, [])

    return (
      <div className='cursor-pointer w-1/3'>
        <Link href={`/post/${id}`}>
          <Grid key={id} className='flex m-auto'>
            <Card className='my-8 m-auto hover:shadow-2xl border' style={cardstyles}>
              <p className='flex justify-center m-auto'>
                <Image
                  className='m-auto text-center max-w-sm'
                  height={250}
                  width={250}
                  src={downloadURL}
                  alt='画像'
                />
              </p>

              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  {title}
                </Typography>
                <div className='flex'>
                  <Categori categori={categori} />
                  {netabare == 'ネタバレ有' ? (
                    <div>
                      <p className='text-red-500 border border-red-500 rounded-xl mx-1 mt-1 p-1 inline-block text-center'>
                        {netabare}
                      </p>
                    </div>
                  ):(
                    <p className='text-gray-500 border border-gray-700 rounded-xl mx-1 mt-1 p-1 inline-block text-center'>
                      {netabare}
                    </p>
                  )}
                </div>
                <div className='w-80 m-auto' style={styles}></div>
                <p className='max-w-xs mt-3'>
                  {selected &&
                    selected.map((tag, i) => (
                      // <Link href={`/post/tag/${tag}`} key={i}>
                      <span
                        className='text-cyan-700 border border-cyan-700 rounded-xl py-1 px-2 text-center'
                        key={i}
                      >
                        #{tag}
                      </span>
                      // </Link>
                    ))}
                </p>
                <div key={id} className='cursor-pointer'>
                  {users &&
                    users.map((user) => {
                      return (
                        <>
                          {email == user.email && (
                            <div key={user.id} className=''>
                              <div className='my-2 py-4 flex m-auto'>
                                <div className=''>
                                  <Avatar
                                    className='m-auto text-center max-w-sm border'
                                    sx={{ width: 40, height: 40 }}
                                    alt='投稿者プロフィール'
                                    src={user.profileimage}
                                  />
                                </div>
                                <div className='pt-2'>
                                  <span className='my-2 ml-2 '>
                                    {user.username}
                                    <FavoriteIcon /> {likes}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      )
                    })}
                </div>
              </CardContent>
            </Card>
          </Grid>
        </Link>
      </div>
    )
  },
)
