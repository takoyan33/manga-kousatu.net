import React, { useState, useEffect } from 'react'
import { database } from 'firebaseConfig'
import {
  collection,
  onSnapshot,
  setDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
} from 'firebase/firestore'
import { useRouter } from 'next/router'
import { TextField, Box, FormLabel } from '@mui/material'
import { postImage, postContextImage } from 'layouts/api'
import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import 'moment/locale/ja'
import ImageUpload from 'layouts/utils/ImageUpload'
import ImageUploadContext from 'layouts/utils/ImageUploadContext'
import { TagsInput } from 'react-tag-input-component'
import { FORM_CATEGORIES, FORM_NETABARE, CommonHead, DISPLAY_DATA } from 'layouts/components/ui'
import { SiteButton } from 'layouts/components/button'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuthContext } from 'layouts/context/AuthContext'
import { successNotify, errorNotify } from 'layouts/components/text'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import dynamic from 'next/dynamic'

// フォームの型
type FormInput = {
  title: string
  categori: string
  netabare: string
  context: string
  display: boolean
}

// バリデーションルール
const schema = yup.object({
  title: yup.string().required('必須です'),
})

export default function Post() {
  const [processing, setProcessing] = useState(false)
  const [tags, setTags] = useState(['最終回'])
  const [context, setContext] = useState('')
  const databaseRef = collection(database, 'posts')
  const q = query(databaseRef, orderBy('timestamp', 'desc'))
  const [image, setImage] = useState(null)
  const [contextImage, setContextImage] = useState<File[]>([])
  const [createObjectURL, setCreateObjectURL] = useState<string>('')
  const [createContextObjectURL, setCreateContextObjectURL] = useState('')
  const [userid, setUserId] = useState(null)
  const [result, setResult] = useState('')
  const [photoURL, setPhotoURL] = useState('')
  const [posts, setPosts] = useState([])
  const [lengthData, setPostsLength] = useState(null)
  const { user } = useAuthContext()
  const [display, setDisplay] = useState('')

  useEffect(() => {
    if (!user) {
      router.push('/register')
    } else {
      useFetchPosts()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInput>({
    resolver: yupResolver(schema),
  })

  const useFetchPosts = async () => {
    await onSnapshot(q, (querySnapshot) => {
      setPosts(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })
  }

  const uploadImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      setImage(file)
      setCreateObjectURL(URL.createObjectURL(file))
    }
  }

  const uploadToClientContext = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      setContextImage((prevContextImages) => [...prevContextImages, file])
      setCreateContextObjectURL(URL.createObjectURL(file))
    }
  }

  const router = useRouter()

  type addPost = {
    toLocaleString(timeZone): string
  }

  const addPost: SubmitHandler<FormInput> = async (data) => {
    // 処理中(true)なら非同期処理せずに抜ける
    if (processing) return
    // 処理中フラグを上げる
    setProcessing(true)
    if (image === null) {
      errorNotify('サムネイルを選んでください')
    } else {
      const result = await postImage(image)
      //写真のurlをセットする
      const contextSetImage = await postContextImage(contextImage)
      //日本時間を代入
      const newDate = new Date().toLocaleString('ja-JP')
      const postRef = await doc(database, 'posts', (posts.length + 1).toString())
      console.log(display)
      setResult(result)
      await setDoc(postRef, {
        title: data.title,
        context: html,
        downloadURL: result,
        contextImage: contextSetImage,
        email: user.email,
        displayname: user.displayName,
        categori: data.categori,
        createtime: newDate,
        edittime: '',
        id: (posts.length + 1).toString(),
        netabare: data.netabare,
        photoURL: user.photoURL,
        userid: user.uid,
        likes_email: [],
        selected: tags,
        timestamp: serverTimestamp(),
        likes: 0,
        display: JSON.parse(display),
      })
        .then(() => {
          successNotify('記事投稿ができました！')
          setProcessing(false)
          setContext('')
          setPhotoURL('')
          setTags([])
          setUserId('')
          setTimeout(() => {
            router.push('/top')
          }, 2000)
        })
        .catch((err) => {
          errorNotify('記事投稿に失敗しました！')
          console.error(err)
        })
    }
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

  const handleEditorChange = (plainText: string, html: string) => {
    setPlainText(plainText)
    setHtml(html)
    setPostsLength(plainText.length)
  }
  return (
    <div>
      <CommonHead />
      <ToastContainer />
      <h2 className='my-12 text-center text-2xl font-semibold'>投稿のプレビュー</h2>
      <Box
        component='form'
        sx={{
          '& > :not(style)': { m: 1, width: '50ch' },
        }}
        className='flex max-w-7xl justify-center'
        autoComplete='off'
      >
        <div>
          <ImageUpload
            onChange={uploadImage}
            createObjectURL={createObjectURL}
            text=''
            createcontextObjectURL=''
          />

          <input
            id='file-input'
            className='hidden'
            type='file'
            accept='image/*,.png,.jpg,.jpeg,.gif'
            name='myImage'
            onChange={uploadImage}
          />
          <div className='my-8'>
            <FormLabel id='demo-radio-buttons-group-label' htmlFor='input-title' className='mb-2'>
              タイトル（最大20文字) <span className='text-red-600'>*</span>
            </FormLabel>

            <TextField
              {...register('title')}
              error={'title' in errors}
              helperText={errors.title?.message}
              id='input-title'
              label='最新話の考察'
              variant='outlined'
              className='m-auto w-full'
            />
          </div>
          <div className='my-8'>
            <FormLabel id='demo-radio-buttons-group-label'>
              作品名<span className='text-red-600'>*</span>
            </FormLabel>
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
                  value={field.value}
                >
                  {FORM_CATEGORIES.map((categori) => (
                    <FormControlLabel
                      key={categori.id}
                      value={categori.value}
                      control={<Radio />}
                      label={categori.label}
                      {...register('categori')}
                    />
                  ))}
                </RadioGroup>
              )}
            />
            {errors.categori && <p>{errors.categori.message}</p>}
          </div>
          <div className='my-8'>
            <FormLabel id='demo-radio-buttons-group-label'>タグ</FormLabel>
            <TagsInput
              value={tags}
              onChange={setTags}
              name='tags'
              placeHolder='タグを追加してください'
            />
          </div>
          <div className='my-8'>
            <FormLabel id='demo-radio-buttons-group-label'>
              ネタバレについて<span className='text-red-600'>*</span>
            </FormLabel>
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
          </div>
          <div className='my-8'>
            <FormLabel id='demo-radio-buttons-group-label'>
              内容<span className='text-red-600'>*</span>(最大500文字）
            </FormLabel>

            <Richedita onChange={handleEditorChange} value='' />
            <p className='my-4 text-right'>現在の文字数：{lengthData && lengthData}</p>
          </div>
          <div className='my-8'>
            <label htmlFor='file-input'>他の写真（最大1枚）</label>

            <ImageUploadContext
              onChange={uploadToClientContext}
              createcontextObjectURL={createContextObjectURL}
              text={'写真'}
              createObjectURL=''
            />
            <input
              id='file-input'
              className='hidden'
              type='file'
              multiple
              accept='image/*,.png,.jpg,.jpeg,.gif'
              name='myImage'
              onChange={uploadToClientContext}
            />
          </div>

          <FormLabel id='demo-radio-buttons-group-label'>
            公開について<span className='text-red-600'>*</span>
          </FormLabel>

          <Controller
            name='display'
            control={control}
            rules={{
              required: '必須項目です',
            }}
            render={({ field }) => (
              <RadioGroup
                aria-label='ネタバレ'
                name={field.name}
                value={field.value}
                onChange={(e) => {
                  field.onChange(e)
                  setDisplay(e.target.value)
                }}
              >
                {DISPLAY_DATA.map((display) => (
                  <FormControlLabel
                    key={display.id}
                    value={display.value.toString()}
                    control={<Radio />}
                    label={display.label}
                  />
                ))}
              </RadioGroup>
            )}
          />
          <SiteButton
            text='投稿する'
            className='m-auto my-10 text-center'
            onClick={handleSubmit(addPost)}
          />
        </div>
      </Box>
    </div>
  )
}
