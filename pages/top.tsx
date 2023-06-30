import React, { useEffect, useState, useMemo } from 'react'
import { database } from 'firebaseConfig'
import { collection, onSnapshot, query, orderBy, where } from 'firebase/firestore'
import Link from 'next/link'
import { getAuth } from 'firebase/auth'
import TextField from '@mui/material/TextField'
import Grid from '@material-ui/core/Grid'
import { CardPost } from 'layouts/components/ui/CardPost'
import { SiteButton } from 'layouts/components/button'
// import { SiteCategory } from 'layouts/components/text'
// import { useGetPosts } from 'layouts/components/hooks/useGetPosts'
import { POST_CATEGORIES, CommonHead } from 'layouts/components/ui'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select, { SelectChangeEvent } from '@mui/material/Select'
import { Changetab } from 'layouts/components/ui/Changetab'
import Image from 'react-image-resizer'

export default function Index() {
  const [firedata, setFiredata] = useState([])
  const databaseRef = collection(database, 'posts')
  //新しい順
  const q = query(databaseRef, orderBy('timestamp', 'desc'))

  //古い順
  const u = query(databaseRef, orderBy('timestamp'))

  //いいね数順
  const f = query(databaseRef, orderBy('likes', 'desc'))

  //ネタバレ有り
  const n = query(databaseRef, where('netabare', '==', 'ネタバレ有'))
  //ネタバレ無し
  const none = query(databaseRef, where('netabare', '==', 'ネタバレ無'))

  const [searchName, setSearchName] = useState('')
  const [loadIndex, setLoadIndex] = useState(6)
  const [isEmpty, setIsEmpty] = useState(false)
  const [loading, setLoading] = useState(false)

  const auth = getAuth()
  const user = auth.currentUser

  // 新着順
  const getallPost = async () => {
    console.log(loading)
    await onSnapshot(q, (querySnapshot) => {
      setFiredata(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })
    setLoading(false)
  }

  //古い順
  const getallOldpost = async () => {
    await onSnapshot(u, (querySnapshot) => {
      setFiredata(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })
  }

  //いいね順
  const getallLikepost = async () => {
    await onSnapshot(f, (querySnapshot) => {
      setFiredata(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })
  }

  //ネタバレ有
  const getallNetabrepost = async () => {
    await onSnapshot(n, (querySnapshot) => {
      setFiredata(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })
  }

  //ネタバレ無
  const getallNetabrenonepost = async () => {
    await onSnapshot(none, (querySnapshot) => {
      setFiredata(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })
  }

  useEffect(() => {
    setLoading(true)
    getallPost()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const displayMore = () => {
    if (loadIndex > firedata.length) {
      setIsEmpty(true)
    } else {
      setLoadIndex(loadIndex + 4)
    }
  }

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

  const netabreItems = [
    {
      label: 'ネタバレ有',
      value: 'ネタバレ有',
      onClick: getallNetabrepost,
    },
    {
      label: 'ネタバレ無',
      value: 'ネタバレ無',
      onClick: getallNetabrenonepost,
    },
  ]

  return (
    <div>
      <CommonHead />
      <div className='m-auto my-5 flex justify-center text-center'>
        <Image className='m-auto' height={100} width={200} src='/logo.png' />
      </div>
      <p className='my-5 text-center'>
        Manga Studyでは、人気漫画の考察を<br></br>
        自由に投稿・閲覧できるwebサイトです。
      </p>

      {user && (
        <div className='text-center lg:text-right'>
          <SiteButton href='/post/new' text='新規投稿をする' className='w-50 m-auto my-2' />
        </div>
      )}
      <h2 className='my-12 text-center text-2xl font-semibold'>投稿一覧</h2>
      <p className='text-1xl text-center'>
        {searchName === ''
          ? `投稿数 ${firedata.length}件`
          : `検索結果 ${
              firedata.filter((data) => data.title.toLowerCase().includes(searchName.toLowerCase()))
                .length
            }件`}
      </p>

      <h2 className='my-12 text-center text-xl font-semibold'>カテゴリー</h2>

      {POST_CATEGORIES.map((categori) => {
        // userの情報
        const CategoriesInfo = {
          id: categori.id,
          title: categori.title,
        }
        return (
          <span key={categori.id}>
            <span
              className={`rounded-xltext-center + m-6  inline-block rounded-xl border  p-1 font-bold hover:text-white ${categori.className}`}
            >
              <Link
                as={`/post/categories/${categori.title}`}
                href={{
                  pathname: categori.link,
                  query: CategoriesInfo,
                }}
              >
                <a>{categori.title}</a>
              </Link>
            </span>
          </span>
        )
      })}
      <div className='m-auto my-10 flex justify-center'>
        <TextField
          id='outlined-basic'
          type='search'
          label='記事を検索する'
          variant='outlined'
          onChange={(event) => {
            setSearchName(event.target.value)
          }}
        />
        <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
          <InputLabel id='demo-select-small'>ネタバレ</InputLabel>

          <Select labelId='demo-select-small' id='demo-select-small' label='ネタバレ'>
            {netabreItems.map((item) => (
              <MenuItem key={item.value} value={item.value} onClick={item.onClick}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <div className='flex justify-end'>
        <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
          <InputLabel id='demo-select-small'>新しい順</InputLabel>

          <Select labelId='demo-select-small' id='demo-select-small' label='新しい順'>
            {menuItems.map((item) => (
              <MenuItem key={item.value} value={item.value} onClick={item.onClick}>
                {item.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </div>

      <Grid container className='m-auto'>
        {firedata.length === 0 ? (
          <p className='my-2 text-center'>記事がありません。</p>
        ) : firedata.filter((data) => {
            if (searchName === '') {
              return data
            } else if (data.title.toLowerCase().includes(searchName.toLowerCase())) {
              return data
            }
          }).length === 0 ? (
          <p className='m-auto my-10 text-center text-xl'>検索した名前の記事がありませんでした。</p>
        ) : (
          firedata
            .filter((data) => {
              if (searchName === '') {
                return data
              } else if (data.title.toLowerCase().includes(searchName.toLowerCase())) {
                return data
              }
            })
            .slice(0, loadIndex)
            .map((data) => (
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
            ))
        )}
      </Grid>

      <div className='text-center'>
        {firedata.length > 6 && (
          <SiteButton
            href=''
            text='さらに表示'
            disabled={isEmpty ? true : false}
            onClick={displayMore}
            className='w-50 m-auto my-2'
          />
        )}
      </div>
      <div className='my-4'>
        <p>© 尾田栄一郎／集英社・フジテレビ・東映アニメーション</p>
        <p>© 和久井健・講談社／アニメ「東京リベンジャーズ」</p>
        <p>©原泰久／集英社・キングダム製作委員会</p>
        <p>©芥見下々／集英社・呪術廻戦製作委員会</p>
      </div>
    </div>
  )
}
