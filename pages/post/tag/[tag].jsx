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
  const databaseRef = collection(database, 'posts')
  //データベースを取得
  const q = query(databaseRef, orderBy('timestamp', 'desc'))
  //新しい順
  const u = query(databaseRef, orderBy('timestamp'))
  //古い順
  const f = query(databaseRef, orderBy('likes', 'desc'))
  //いいね数順
  const [firedata, setFiredata] = useState([])
  const [likecount, setLikecount] = useState(0)

  const styles = { whiteSpace: 'pre-line' }
  const router = useRouter()
  const { tag } = router.query
  const auth = getAuth()
  const user = auth.currentUser
  const [searchName, setSearchName] = useState('')

  console.log({ tag })

  const getallPost = async () => {
    //firestoreからデータ取得
    await getDocs(q).then((querySnapshot) => {
      //コレクションのドキュメントを取得
      setFiredata(
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
  const getallOldpost = async () => {
    await onSnapshot(u, (querySnapshot) => {
      setFiredata(
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
  const getallLikepost = async () => {
    await onSnapshot(f, (querySnapshot) => {
      setFiredata(
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
    getallPost()
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

        <p className='text-1xl text-center'>投稿数　{firedata.length}件</p>

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
          <SiteButton href='' text='新しい順' className='m-4 my-2 inline' onClick={getallPost} />
          <SiteButton href='' text='古い順' className='m-4 my-2 inline' onClick={getallOldpost} />
          <SiteButton
            href=''
            text='いいね順'
            className='m-4 my-2 inline'
            onClick={getallLikepost}
          />
        </div>

        <div className='m-auto max-w-7xl'>
          <Grid container spacing={1}>
            {firedata
              .filter((data) => {
                if (searchName === '') {
                  return data
                  //そのまま返す
                } else if (
                  data.title.toLowerCase().includes(searchName.toLowerCase())
                  //valのnameが含んでいたら小文字で返す　含んでいないvalは返さない
                ) {
                  return data
                }
              })
              .map((data) => {
                return (
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
                    selected={data.selected}
                  />
                )
              })}
            {firedata.length == 0 && (
              <p className='m-auto my-6 text-center text-2xl'>まだ投稿されていません</p>
            )}
          </Grid>
        </div>
      </div>
    </>
  )
}

export default Category
