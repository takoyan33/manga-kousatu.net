import { useRouter } from 'next/router'
import React from 'react'
import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { app, database, storage } from '../../../firebaseConfig'
import { collection, getDocs, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { Stack, FormLabel, TextField, Avatar } from '@mui/material'
import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import Image from 'react-image-resizer'
import { SiteButton } from '../../../layouts/components/button'
import { POST_CATEGORIES, CommonHead } from '../../../layouts/components/ui'
import { Categoris, Netabares } from '../../../layouts/components/ui/Formcontrols'
import { TagsInput } from 'react-tag-input-component'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// バリデーションルール
const schema = yup.object({
  title: yup.string().required('必須です'),
})

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
  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const getPost = async () => {
    try {
      const ref = await doc(database, 'posts', routerid)
      const snap = await getDoc(ref)
      await setFiredata(snap.data())
      await setCategori(firedata.categori)
      console.log('firedata', firedata)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPost()
    setID(routerid)
    setContext(firedata.context)
    console.log('categori', categori)
    setPostTitle(firedata.title)
  }, [])

  const updatefields = (data) => {
    //更新する
    let fieldToEdit = doc(database, 'posts', routerid)
    const newdate = new Date().toLocaleString('ja-JP')
    console.log(posttitle)
    console.log(categori)
    console.log(data.netabare)
    console.log(selected)
    //セットしたIDをセットする
    updateDoc(fieldToEdit, {
      title: posttitle,
      netabare: data.netabare,
      categori: categori,
      context: data.context,
      edittime: newdate,
      selected: selected,
      //改行を保存する
    })
      .then(() => {
        alert('記事を更新しました')
        router.push(`/post/${routerid}`)
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
              <Link href='/top'>トップ</Link>　＞　投稿記事　＞　 {firedata.title}　＞　記事の編集
              <Stack
                component='form'
                className='m-auto'
                noValidate
                spacing={2}
                sx={{ width: '38ch' }}
              >
                <div>
                  <h2 className='my-12 text-center text-2xl font-semibold'>考察記事の編集</h2>
                  <FormLabel id='demo-radio-buttons-group-label'>
                    タイトル<span className='text-red-600'>*</span>
                  </FormLabel>
                </div>
                <div>
                  <input
                    id='outlined-basic'
                    label='タイトル（最大20文字)'
                    variant='outlined'
                    className='w-30'
                    defaultValue={firedata.title}
                    type='text'
                    onChange={(event) => setPostTitle(event.target.value)}
                  />
                </div>
                <div>
                  <FormLabel id='demo-radio-buttons-group-label'>
                    作品名<span className='text-red-600'>*</span>
                  </FormLabel>
                </div>
                <p>現在の作品：{firedata.categori}</p>
                <Controller
                  name='categori'
                  control={control}
                  rules={{
                    required: '必須項目です',
                  }}
                  render={({ field }) => (
                    <RadioGroup
                      aria-labelledby='demo-radio-buttons-group-label'
                      name={field.name}
                      checked={categori}
                      onChange={(e) => {
                        field.onChange(e)
                        setCategori(e.target.value)
                      }}
                    >
                      {Categoris.map((Categori) => (
                        <FormControlLabel
                          key={Categori.id}
                          value={Categori.value}
                          control={<Radio />}
                          label={Categori.label}
                        />
                      ))}
                    </RadioGroup>
                  )}
                />

                <FormLabel id='demo-radio-buttons-group-label'>タグ</FormLabel>
                <TagsInput
                  value={selected}
                  onChange={setSelected}
                  name='selected'
                  placeHolder='タグを追加してください'
                />
                <FormLabel id='demo-radio-buttons-group-label'>
                  ネタバレについて<span className='text-red-600'>*</span>
                </FormLabel>
                <p>現在のネタバレ：{firedata.netabare}</p>
                <Controller
                  name='netabare'
                  control={control}
                  rules={{
                    required: '必須項目です',
                  }}
                  render={({ field }) => (
                    <RadioGroup aria-label='ネタバレ' name={field.name} value={field.value}>
                      {Netabares.map((Netabare) => (
                        <FormControlLabel
                          key={Netabare.id}
                          value={Netabare.value}
                          control={<Radio />}
                          label={Netabare.label}
                          {...register('netabare')}
                        />
                      ))}
                    </RadioGroup>
                  )}
                />
                {errors.netabare && <p>{errors.netabare.message}</p>}

                <div>
                  <FormLabel id='demo-radio-buttons-group-label'>
                    内容<span className='text-red-600'>*</span>(最大500文字）
                  </FormLabel>
                  <p className='my-4'>文字数：{context && <span>{context.length}</span>}</p>
                </div>
                <p>現在の文章</p>
                <textarea
                  label='内容(最大500文字）'
                  className='m-auto w-full'
                  id='filled-multiline-static'
                  multiline
                  rows={14}
                  type='text'
                  defaultValue={firedata.context}
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
