import { useRouter } from 'next/router'
import React from 'react'
import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { app, database, storage } from '../../../firebaseConfig'
import { collection, getDocs, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { Stack } from '@mui/material'
import TextField from '@mui/material/TextField'
import Image from 'react-image-resizer'
import Avatar from '@mui/material/Avatar'
import { SiteButton } from '../../../layouts/components/button'
import { Categories, CommonHead } from '../../../layouts/components/ui'

const Post = () => {
  const [ID, setID] = useState(null)
  const [context, setContext] = useState('')
  const [categori, setCategori] = useState('')
  const [photoURL, setPhotoURL] = useState()
  const [users, setUsers] = useState(null)
  const [displayName, setDisplayName] = useState('')
  const [createtime, setCreatetime] = useState('')
  const [isUpdate, setIsUpdate] = useState(false)
  const [posttitle, setPostTitle] = useState('')
  const databaseRef = collection(database, 'posts')
  //データベースを取得
  const [firedata, setFiredata] = useState([])
  const [downloadURL, setDownloadURL] = useState(null)
  const [likecount, setLikecount] = useState(0)
  const usersRef = collection(database, 'users')
  const [userid, setUserid] = useState(null)
  const [netabare, setNetabare] = useState('')
  const [likes, setLikes] = useState(null)
  const [selected, setSelected] = useState(['最終回'])

  const auth = getAuth()
  const user = auth.currentUser
  const router = useRouter()
  const routerid = router.query.id

  console.log({ routerid })

  const getPost = async () => {
    const data = doc(database, 'posts', routerid)
    getDoc(data).then((documentSnapshot) => {
      setFiredata(documentSnapshot.data())
    })
    console.log({ firedata })
  }

  useEffect(() => {
    getID()
    getPost()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const getID = () => {
    setID(routerid)
    setContext(firedata.context)
    setPostTitle(firedata.title)
  }
  // usersData();

  const updatefields = () => {
    //更新する
    let fieldToEdit = doc(database, 'posts', ID)
    const newdate = new Date().toLocaleString('ja-JP')
    //セットしたIDをセットする
    updateDoc(fieldToEdit, {
      title: posttitle,
      context: context.replace(/\r?\n/g, '\n'),
      edittime: newdate,
      //改行を保存する
    })
      .then(() => {
        alert('記事を更新しました')
        setPostTitle('')
        setContext('')
        setIsUpdate(false)
        router.push(`post/${ID}`)
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <>
      <CommonHead />

      <div className='max-w-5xl m-auto'>
        <div>
          <div>
            <div className='lg:w-full my-4 '>
              <Link href='/'>トップ</Link>　＞　投稿記事　＞　 {firedata.title}　＞　修正
              <Stack
                component='form'
                className='m-auto'
                noValidate
                spacing={2}
                sx={{ width: '38ch' }}
              >
                <div>
                  <h2>投稿の修正</h2>
                  <p>タイトル</p>
                </div>
                <div>
                  <TextField
                    id='outlined-basic'
                    label='タイトル（最大20文字)'
                    variant='outlined'
                    type='text'
                    value={posttitle}
                    onChange={(event) => setPostTitle(event.target.value)}
                  />
                </div>
                <div>
                  <p>内容(最大500文字）</p>
                </div>
                <TextField
                  label='内容(最大500文字）'
                  className='m-auto w-full'
                  id='filled-multiline-static'
                  multiline
                  rows={14}
                  type='text'
                  value={firedata.title}
                  onChange={(event) => setContext(event.target.value)}
                />
                <SiteButton
                  href=''
                  onClick={updatefields}
                  text='更新する'
                  className='m-auto w-80 my-8'
                />
              </Stack>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Post
