import { useRouter } from 'next/router'
import React, { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { database } from 'firebaseConfig'
import { collection, getDocs, onSnapshot, query, orderBy } from 'firebase/firestore'
import TextField from '@mui/material/TextField'
import { getAuth } from 'firebase/auth'
import Grid from '@material-ui/core/Grid'
import { SiteButton } from 'layouts/components/button'
import { CardPost, CommonHead } from 'layouts/components/ui'

const Category = () => {
  const posts = collection(database, 'posts')
  //データベースを取得
  const q = query(posts, orderBy('timestamp', 'desc'))
  //新しい順
  const u = query(posts, orderBy('timestamp'))
  //古い順
  const f = query(posts, orderBy('likes', 'desc'))
  //いいね数順
  const [postsData, setPostsData] = useState([])
  const [likecount, setLikecount] = useState(0)

  const styles = { whiteSpace: 'pre-line' }
  const router = useRouter()
  const { tag } = router.query
  const auth = getAuth()
  const user = auth.currentUser
  const [searchName, setSearchName] = useState('')

  const useFetchPosts = async () => {
    //firestoreからデータ取得
    await getDocs(q).then((querySnapshot) => {
      //コレクションのドキュメントを取得
      setPostsData(
        querySnapshot.docs
          .map((data) => {
            //配列なので、mapで展開する
            return { ...data.data(), id: data.id }
            //スプレッド構文で展開して、新しい配列を作成
          })
          .filter((data) => {
            if (data.selected === tag) {
              return data
              //そのまま返す
            } else if (
              data.selected.toLowerCase().includes(tag.toLowerCase())
              //valのnameが含んでいたら小文字で返す　含んでいないvalは返さない
            ) {
              return data
            }
          }),
      )
    })
  }

  //古い順
  const useGetOldPosts = async () => {
    await onSnapshot(u, (querySnapshot) => {
      setPostsData(
        querySnapshot.docs
          .map((data) => {
            //配列なので、mapで展開する
            return { ...data.data(), id: data.id }
            //スプレッド構文で展開して、新しい配列を作成
          })
          .filter((data) => {
            if (data.selected === tag) {
              return data
              //そのまま返す
            } else if (
              data.selected.toLowerCase().includes(tag.toLowerCase())
              //valのnameが含んでいたら小文字で返す　含んでいないvalは返さない
            ) {
              return data
            }
          }),
      )
    })
  }

  //いいね順
  const useGetLikePosts = async () => {
    await onSnapshot(f, (querySnapshot) => {
      setPostsData(
        querySnapshot.docs
          .map((data) => {
            //配列なので、mapで展開する
            return { ...data.data(), id: data.id }
            //スプレッド構文で展開して、新しい配列を作成
          })
          .filter((data) => {
            if (data.selected === Category) {
              return data
              //そのまま返す
            } else if (
              data.selected.toLowerCase().includes(tag.toLowerCase())
              //valのnameが含んでいたら小文字で返す　含んでいないvalは返さない
            ) {
              return data
            }
          }),
      )
    })
  }

  useEffect(() => {
    useFetchPosts()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likecount])

  return (
    <>
      <CommonHead />
      <div className='m-auto max-w-7xl'>
        <p>
          <Link href='/top'>トップ</Link>　＞　投稿記事　＞　#{tag}
        </p>
        <h2 className='my-12 text-center text-2xl font-semibold'>#{tag}の考察記事一覧</h2>

        <p className='text-1xl text-center'>投稿数　{posts.length}件</p>

        <TextField
          id='outlined-basic'
          type='search'
          label='考察記事を検索する'
          variant='outlined'
          onChange={(event) => {
            setSearchName(event.target.value)
          }}
        />

        <div className='mt-4 flex'>
          <SiteButton text='新しい順' className='m-4 my-2 inline' onClick={useFetchPosts} />
          <SiteButton text='古い順' className='m-4 my-2 inline' onClick={useGetOldPosts} />
          <SiteButton
            text='いいね順'
            className='m-4 my-2 inline'
            onClick={useGetLikePosts}
          />
        </div>

        <div className='m-auto max-w-7xl'>
          <Grid container spacing={1}>
            {postsData
              .filter((post) => {
                if (searchName === '') {
                  return post
                  //そのまま返す
                } else if (
                  post.title.toLowerCase().includes(searchName.toLowerCase())
                  //valのnameが含んでいたら小文字で返す　含んでいないvalは返さない
                ) {
                  return post
                }
              })
              .map((post) => {
                return (
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
                    selected={post.selected}
                  />
                )
              })}
            {postsData.length === 0 && (
              <p className='m-auto my-6 text-center text-2xl'>まだ投稿されていません</p>
            )}
          </Grid>
        </div>
      </div>
    </>
  )
}

export default Category
