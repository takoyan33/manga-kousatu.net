import { useRouter } from 'next/router'
import React from 'react'
import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { database } from 'firebaseConfig'
import { collection, getDocs, onSnapshot } from 'firebase/firestore'
import TextField from '@mui/material/TextField'
import Grid from '@material-ui/core/Grid'
import { query, orderBy } from 'firebase/firestore'
import { CommonHead, CardPost } from 'layouts/components/ui'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'

export const getStaticPaths = async () => {
  const res = await fetch(
    'https://firestore.googleapis.com/v1/projects/next-auth-app-2aa40/databases/(default)/documents/categories',
  )
  const data = await res.json()

  const array = Object.keys(data).map(function (key) {
    return data[key]
  })

  const paths = array[0].map((post) => {
    return {
      params: { id: post.fields.id.stringValue.toString() },
    }
  })

  return {
    paths,
    fallback: false,
  }
}

export const getStaticProps = async (context) => {
  const id = context.params.id
  const res = await fetch(
    'https://firestore.googleapis.com/v1/projects/next-auth-app-2aa40/databases/(default)/documents/categories/' +
      id,
  )
  const data = await res.json()

  return {
    props: {
      post: data,
    },
  }
}

const Daitails = ({ post }) => {
  const databaseRef = collection(database, 'posts')
  //データベースを取得
  const q = query(databaseRef, orderBy('timestamp', 'desc'))
  //新しい順
  const u = query(databaseRef, orderBy('timestamp'))
  //古い順
  const f = query(databaseRef, orderBy('likes', 'desc'))
  //いいね数順
  const [firedata, setFiredata] = useState([])

  const router = useRouter()
  const [searchName, setSearchName] = useState('')

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
            if (data.categori === post.fields.id.stringValue) {
              return data
              //そのまま返す
            } else if (
              data.categori.toLowerCase().includes(post.fields.id.stringValue.toLowerCase())
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
            if (data.categori === post.fields.id.stringValue) {
              return data
              //そのまま返す
            } else if (
              data.categori.toLowerCase().includes(post.fields.id.stringValue.toLowerCase())
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
            if (data.categori === post.fields.id.stringValue) {
              return data
              //そのまま返す
            } else if (
              data.categori.toLowerCase().includes(post.fields.id.stringValue.toLowerCase())
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
  }, [router.query])
  const menuItems = [
    {
      label: '新しい順',
      value: '新しい順',
      onClick: getallPost,
    },
    {
      label: '古い順',
      value: '古い順',
      onClick: getallOldpost,
    },
    {
      label: 'いいね順',
      value: 'いいね順',
      onClick: getallLikepost,
    },
  ]

  return (
    <>
      <CommonHead />
      <p className='my-4'>
        <Link href='/top'>トップ</Link>　＞　投稿記事　＞　
        {post.fields.title.stringValue}
      </p>
      <h1 className='my-12 text-center text-2xl font-semibold'>
        {post.fields.title.stringValue}の考察記事一覧
      </h1>

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

      <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
        <InputLabel id='demo-select-small'>並び順</InputLabel>
        <Select labelId='demo-select-small' id='demo-select-small' label='並び順'>
          {menuItems.map((item) => (
            <MenuItem key={item.value} value={item.value} onClick={item.onClick}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
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
    </>
  )
}

export default Daitails
