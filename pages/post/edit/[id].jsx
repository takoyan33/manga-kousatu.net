import { useRouter } from 'next/router'
import React, { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { database } from 'firebaseConfig'
import { collection, doc, getDoc, updateDoc } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { Stack, FormLabel } from '@mui/material'
import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import Image from 'react-image-resizer'
import { SiteButton } from 'layouts/components/button'
import { FORM_CATEGORIES, FORM_NETABARE, CommonHead } from 'layouts/components/ui'
import { TagsInput } from 'react-tag-input-component'
import { useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { successNotify, errorNotify } from 'layouts/components/text'
import dynamic from 'next/dynamic'
import ImageUpload from 'layouts/utils/ImageUpload'
import { postImage } from 'layouts/api'

const schema = yup.object({
  title: yup.string().required('必須です'),
})

const PostEdit = () => {
  const [ID, setID] = useState(null)
  const [image, setImage] = useState(null)
  const [context, setContext] = useState('')
  const [categori, setCategori] = useState('')
  const [postTitle, setPostTitle] = useState('')
  const databaseRef = collection(database, 'posts')
  const [createObjectURL, setCreateObjectURL] = useState('')
  //データベースを取得
  const [post, setPost] = useState([])
  const [downloadURL, setDownloadURL] = useState(null)
  const [lengthData, setPostsLength] = useState(null)
  const usersRef = collection(database, 'users')
  const [userid, setUserid] = useState(null)
  const [netabare, setNetabare] = useState('')
  const [selected, setSelected] = useState(['最終回'])

  const auth = getAuth()
  const user = auth.currentUser
  const router = useRouter()
  const routerid = router.query.id

  const {
    register,
    control,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const uploadImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      setImage(file)
      setCreateObjectURL(URL.createObjectURL(file))
    }
  }

  const getPost = async () => {
    try {
      const ref = await doc(database, 'posts', routerid)
      const snap = await getDoc(ref)
      await setPost(snap.data())
      await setCategori(post.categori)
      console.log('post', post)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getPost()
    setID(routerid)
    setContext(post.context)
    console.log('categori', categori)
    setPostTitle(post.title)
  }, [])

  const updatePost = async (data) => {
    const result = await postImage(image)
    let fieldToEdit = doc(database, 'posts', routerid)
    const newdate = new Date().toLocaleString('ja-JP')
    updateDoc(fieldToEdit, {
      downloadURL: result,
      title: postTitle,
      netabare: data.netabare,
      categori: categori,
      context: context,
      edittime: newdate,
      selected: selected,
      //改行を保存する
    })
      .then(() => {
        successNotify('記事を更新しました')
        router.push(`/post/${routerid}`)
      })
      .catch((err) => {
        errorNotify('記事の更新に失敗しました')
        console.log(err)
      })
  }

  const Richedita = React.useMemo(
    () =>
      dynamic(() => import('../../../layouts/components/ui/Richedita'), {
        loading: () => <p>リッチエディタ is loading</p>,
        ssr: false,
      }),
    [],
  )

  const [plainText, setPlainText] = useState('')
  const [html, setHtml] = useState('')

  const handleEditorChange = (plainText, html) => {
    setPlainText(plainText)
    setHtml(html)
    setPostsLength(plainText.length)
  }

  return (
    <>
      <CommonHead />

      <div className='m-auto max-w-5xl'>
        <div>
          <div>
            <div className='my-4 lg:w-full '>
              <Link href='/top'>トップ</Link>　＞　投稿記事　＞　 {post.title}　＞　考察記事の編集
              <Stack
                component='form'
                className='m-auto'
                noValidate
                spacing={2}
                sx={{ width: '38ch' }}
              >
                <div>
                  <h2 className='my-12 text-center text-2xl font-semibold'>考察記事の編集</h2>
                  <div>
                    <FormLabel id='demo-radio-buttons-group-label'>
                      サムネイル<span className='text-red-600'>*</span>
                    </FormLabel>
                    <img src={post.downloadURL} className='w-100' />
                    <ImageUpload
                      onChange={uploadImage}
                      createObjectURL={createObjectURL}
                      text=''
                      event={undefined}
                    />
                    <input
                      id='file-input'
                      className='hidden'
                      type='file'
                      accept='image/*,.png,.jpg,.jpeg,.gif'
                      name='myImage'
                      onChang
                      e={uploadImage}
                    />
                  </div>
                  <FormLabel id='demo-radio-buttons-group-label'>
                    タイトル<span className='text-red-600'>*</span>
                  </FormLabel>
                </div>
                <div>
                  <input
                    id='outlined-basic'
                    label='タイトル（最大20文字)'
                    className='sm:text-md block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                    defaultValue={post.title}
                    type='text'
                    onChange={(event) => setPostTitle(event.target.value)}
                  />
                </div>
                <div>
                  <FormLabel id='demo-radio-buttons-group-label'>
                    作品名<span className='text-red-600'>*</span>
                  </FormLabel>
                </div>
                <p>現在の作品：{post.categori}</p>
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
                      {FORM_CATEGORIES.map((Categori) => (
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
                <p>現在のネタバレ：{post.netabare}</p>
                <Controller
                  name='netabare'
                  control={control}
                  rules={{
                    required: '必須項目です',
                  }}
                  render={({ field }) => (
                    <RadioGroup aria-label='ネタバレ' name={field.name} value={field.value}>
                      {FORM_NETABARE.map((netabare) => (
                        <FormControlLabel
                          key={netabare.id}
                          value={netabare.value}
                          control={<Radio />}
                          label={netabare.label}
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
                </div>
                <p>現在の文章</p>
                <textarea
                  label='内容(最大500文字）'
                  className='sm:text-md block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                  id='filled-multiline-static'
                  multiline
                  rows={14}
                  type='text'
                  defaultValue={post.context}
                  onChange={(event) => setContext(event.target.value)}
                />
                {/* <Richedita onChange={handleEditorChange} value={post.context} /> */}
                <SiteButton
                  href=''
                  onClick={updatePost}
                  text='更新する'
                  className='m-auto my-8 w-80'
                />
              </Stack>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PostEdit
