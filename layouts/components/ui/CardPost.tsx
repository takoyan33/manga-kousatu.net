import React from 'react'
import Link from 'next/link'
import { useEffect, useState, useMemo, useCallback } from 'react'
import { database } from 'firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { getAuth } from 'firebase/auth'
import styles from 'styles/Home.module.css'
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
export const CardPost: React.VFC<Props> = React.memo(
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
    const style: React.CSSProperties = {
      whiteSpace: 'pre-line',
    }
    const cardstyles: React.CSSProperties = {
      margin: '10px',
    }

    const auth = getAuth()

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
      <div className='w-1/3 cursor-pointer'>
        <Link href={`/post/${id}`}>
          <Grid key={id} className='m-auto flex'>
            <Card className='m-auto my-8 border hover:shadow-2xl' style={cardstyles}>
              <dl>
                <div className='m-auto flex justify-center'>
                  <Image
                    className='m-auto max-w-sm text-center'
                    height={250}
                    width={250}
                    src={downloadURL}
                    alt='画像'
                  />
                </div>

                <CardContent>
                  <Typography gutterBottom variant='h5' component='div'>
                    {title}
                  </Typography>
                  <div className='flex'>
                    <Categori categori={categori} />
                    {netabare == 'ネタバレ有' ? (
                      <div>
                        <dl className='mx-1 mt-1 inline-block rounded-xl border border-red-500 p-1 text-center text-red-500'>
                          {netabare}
                        </dl>
                      </div>
                    ) : (
                      <dl className='mx-1 mt-1 inline-block rounded-xl border border-gray-700 p-1 text-center text-gray-500'>
                        {netabare}
                      </dl>
                    )}
                  </div>
                  <div className='m-auto w-80' style={styles}></div>
                  <div className='mt-3 max-w-xs'>
                    {selected &&
                      selected.map((tag, i) => (
                        // <Link href={`/post/tag/${tag}`} key={i}>
                        <span
                          className='rounded-xl border border-cyan-700 py-1 px-2 text-center text-cyan-700'
                          key={i}
                        >
                          #{tag}
                        </span>
                        // </Link>
                      ))}
                  </div>
                  <div key={id} className='cursor-pointer'>
                    {users &&
                      users.map((user) => {
                        return (
                          <>
                            {email == user.email && (
                              <div key={user.id} className=''>
                                <div className='m-auto my-2 flex py-4'>
                                  <dl className=''>
                                    <Avatar
                                      className='m-auto max-w-sm border text-center'
                                      sx={{ width: 40, height: 40 }}
                                      alt='投稿者プロフィール'
                                      src={user.profileimage}
                                    />
                                  </dl>
                                  <dl className='pt-2'>
                                    <span className='my-2 ml-2 '>
                                      {user.username}
                                      <FavoriteIcon /> {likes}
                                    </span>
                                  </dl>
                                </div>
                              </div>
                            )}
                          </>
                        )
                      })}
                  </div>
                </CardContent>
              </dl>
            </Card>
          </Grid>
        </Link>
      </div>
    )
  },
)
