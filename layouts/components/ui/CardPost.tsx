import React from 'react'
import Link from 'next/link'
import { useEffect, useState, useMemo, useCallback } from 'react'
import { database } from 'firebaseConfig'
import { collection, getDocs } from 'firebase/firestore'
import { useRouter } from 'next/router'
import { useGetPost, useGetUsers } from 'layouts/components/hooks'
import { getAuth } from 'firebase/auth'
import styles from 'styles/Home.module.css'
import { Card, CardContent, Typography, Avatar } from '@mui/material'
import Image from 'react-image-resizer'
import Category from '../text/Category'
import FavoriteIcon from '@mui/icons-material/Favorite'
import { SingleGetPostParams } from 'types/post'
import { GetUser } from 'types/user'

// eslint-disable-next-line react/display-name
export const CardPost = React.memo(
  ({
    downloadURL,
    id,
    likes,
    title,
    category,
    netabare,
    displayName,
    email,
    photoURL,
    createTime,
    selected,
  }: SingleGetPostParams) => {
    const [users, setUsers] = useState<Array<GetUser>>([])
    const [comments, setComments] = useState('')
    const style: React.CSSProperties = {
      whiteSpace: 'pre-line',
    }
    const cardStyle: React.CSSProperties = {
      margin: '10px',
    }

    const auth = getAuth()

    // const useGetPostComment = async () => {
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
      useGetUsers(setUsers)
      // useGetPostComment()
    }, [])

    return (
      <div className='w-full cursor-pointer md:w-1/3'>
        <Link href={`/post/${id}`}>
          <div key={id} className='m-auto w-4/5'>
            <Card className='m-auto my-8 border hover:shadow-2xl' style={cardStyle}>
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
                    <Category category={category} />
                    {netabare === 'ネタバレ有' ? (
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
                            {email === user.email && (
                              <div key={user.id}>
                                <div className='m-auto my-2 flex py-4'>
                                  <dl>
                                    <Avatar
                                      className='m-auto max-w-sm border text-center'
                                      sx={{ width: 40, height: 40 }}
                                      alt='投稿者プロフィール'
                                      src={user.profileImage}
                                    />
                                  </dl>
                                  <dl className='pt-2'>
                                    {user.userName}
                                    <span className='my-2 ml-2 text-pink-400'>
                                      <FavoriteIcon />
                                    </span>
                                    {likes}
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
          </div>
        </Link>
      </div>
    )
  },
)
