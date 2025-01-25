import { yupResolver } from '@hookform/resolvers/yup'
import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import { TextField, Box } from '@mui/material'
import { onSnapshot, setDoc, doc, serverTimestamp, query, orderBy } from 'firebase/firestore'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import React, { useState, useEffect } from 'react'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { TagsInput } from 'react-tag-input-component'
import { ToastContainer } from 'react-toastify'
import * as yup from 'yup'
import { database } from 'firebaseConfig'
import { postImage, postContextImage } from 'layouts/api'
import 'moment/locale/ja'
import { SiteButton } from 'layouts/components/button'
import { successNotify, errorNotify, SiteLabel } from 'layouts/components/text'
import { FORM_CATEGORIES, FORM_NETABARE, NoIndexHead, DISPLAY_DATA } from 'layouts/components/ui'
import { useAuthContext } from 'layouts/context/AuthContext'
import ImageUpload from 'layouts/utils/ImageUpload'
import ImageUploadContext from 'layouts/utils/ImageUploadContext'
import 'react-toastify/dist/ReactToastify.css'
import { postsRef } from 'layouts/utils/post'

// フォームの型
interface RegisterPostParams {
  title: string
  categori: 'ONEPIECE' | '呪術廻戦' | '東京リベンジャーズ' | 'キングダム'
  netabare: 'ネタバレ有' | 'ネタバレ無' | '不明'
  context: string
  display: boolean
}

// interface addPost {
//   toLocaleString(timeZone): string
// }

// バリデーションルール
const schema = yup.object({
  title: yup.string().required('必須です'),
})

export default function Post() {
  const [processing, setProcessing] = useState<boolean>(false)
  const [tags, setTags] = useState<string[]>(['最終回'])
  // const [context, setContext] = useState<string>('')
  const q = query(postsRef, orderBy('timestamp', 'desc'))
  const [image, setImage] = useState<File | null>(null)
  const [contextImage, setContextImage] = useState<File | null>(null)
  const [createObjectURL, setCreateObjectURL] = useState<string>('')
  const [createContextObjectURL, setCreateContextObjectURL] = useState<string>('')
  // const [userid, setUserId] = useState<string | null>(null)
  // const [photoURL, setPhotoURL] = useState<string>('')
  const [posts, setPosts] = useState<any[]>([])
  const [lengthData, setPostsLength] = useState<number | null>(null)
  const { user } = useAuthContext()
  const [display, setDisplay] = useState<string>('')

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
  } = useForm<RegisterPostParams>({
    resolver: yupResolver(schema),
  })

  //投稿の取得
  const useFetchPosts = async (): Promise<void> => {
    await onSnapshot(q, (querySnapshot) => {
      setPosts(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })
  }
  //画像のアップロード
  const uploadImage = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      setImage(file)
      setCreateObjectURL(URL.createObjectURL(file))
    }
  }
  //他の画像のアップロード
  const uploadToClientContext = (event: React.ChangeEvent<HTMLInputElement>): void => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      setContextImage(file)
      setCreateContextObjectURL(URL.createObjectURL(file))
    }
  }

  const router = useRouter()

  //投稿の追加
  const addPost: SubmitHandler<RegisterPostParams> = async (data): Promise<void> => {
    // 処理中(true)なら非同期処理せずに抜ける
    if (processing) {
      return
    }
    // 処理中フラグを上げる
    setProcessing(true)
    if (image === null) {
      errorNotify('サムネイルを選んでください')
    } else {
      const topImage: string = await postImage(image)
      //写真のurlをセットする
      const contextSetImage: string = await postContextImage(contextImage)
      // console.log('contextSetImage', contextSetImage)
      //日本時間を代入
      const newDate: string = new Date().toLocaleString('ja-JP')
      const randomSuffix = Math.floor(Math.random() * 1000)
      const postRef = await doc(database, 'posts', `${posts.length + 1}-${randomSuffix}`)
      await setDoc(postRef, {
        title: data.title,
        context: html,
        downloadURL: topImage,
        contextImage: contextSetImage,
        email: user.email,
        displayName: user.displayName,
        category: data.categori,
        createTime: newDate,
        editTime: '',
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
          // setContext('')
          // setPhotoURL('')
          setTags([])
          // setUserId('')
          setTimeout(() => {
            router.push('/')
          }, 2000)
        })
        .catch(() => {
          errorNotify('記事投稿に失敗しました！')
        })
    }
  }

  // リッチエディタの追加
  const Richedita = React.useMemo(
    () =>
      dynamic(() => import('../../../layouts/components/ui/Richedita'), {
        loading: () => <p>リッチエディタ is loading</p>,
        ssr: false,
      }),
    [],
  )
  // const [plainText, setPlainText] = useState<string>('')
  const [html, setHtml] = useState<string>('')

  const handleEditorChange = (plainText: string, html: string): void => {
    // setPlainText(plainText)
    setHtml(html)
    setPostsLength(plainText.length)
  }
  return (
    <div>
      <NoIndexHead />
      <ToastContainer />
      <h2 className='my-12 text-center text-2xl font-semibold'>考察記事の投稿</h2>
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
            createcontextObjectURL=''
          />
          <div className='my-8'>
            <div className='mt-6 mb-2'>
              <SiteLabel name='タイトル（最大20文字）' required htmlFor='title' />
            </div>

            <TextField
              {...register('title')}
              error={'title' in errors}
              helperText={errors.title?.message}
              id='title'
              placeholder='最新話の考察'
              variant='outlined'
              className='m-auto w-full'
            />
          </div>
          <div className='my-8'>
            <div className='mt-6 mb-2'>
              <SiteLabel name='作品名' required htmlFor='label-managa-name' />
            </div>
            <Controller
              name='categori'
              control={control}
              rules={{
                required: '必須項目です',
              }}
              render={({ field }) => (
                <RadioGroup
                  id='managa-name'
                  aria-labelledby='managa-name'
                  name={field.name}
                  value={field.value}
                >
                  {FORM_CATEGORIES.map((category) => (
                    <FormControlLabel
                      key={category.id}
                      value={category.value}
                      control={<Radio />}
                      label={category.label}
                      {...register('categori')}
                    />
                  ))}
                </RadioGroup>
              )}
            />
            {errors.categori && <p>{errors.categori.message}</p>}
          </div>
          <div className='my-8'>
            <div className='mt-6 mb-2'>
              <SiteLabel name='タグ' required htmlFor='tags' />
            </div>
            <TagsInput
              value={tags}
              onChange={setTags}
              name='tags'
              placeHolder='タグを追加してください'
            />
          </div>
          <div className='my-8'>
            <div className='mt-6 mb-2'>
              <SiteLabel name='ネタバレについて' required htmlFor='netabare' />
            </div>
            <Controller
              name='netabare'
              control={control}
              rules={{
                required: '必須項目です',
              }}
              render={({ field }) => (
                <RadioGroup
                  aria-label='ネタバレ'
                  name={field.name}
                  value={field.value}
                  id='netabare'
                >
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
            <div className='mt-6 mb-2'>
              <SiteLabel name='内容（最大500文字）' required htmlFor='label-content' />
            </div>

            <Richedita onChange={handleEditorChange} value='' />
            <p className='my-4 text-right'>現在の文字数：{lengthData && lengthData}</p>
          </div>
          <div className='my-8'>
            <div className='mt-6 mb-2'>
              <SiteLabel name='他の写真（最大1枚）' htmlFor='label-content' />
            </div>

            <ImageUploadContext
              onChange={uploadToClientContext}
              createcontextObjectURL={createContextObjectURL}
              text={'写真'}
              createObjectURL=''
            />
            <input
              id='other-file-input'
              className='hidden'
              type='file'
              multiple
              accept='image/*,.png,.jpg,.jpeg,.gif'
              name='myImage'
              onChange={uploadToClientContext}
            />
          </div>
          <SiteLabel name='公開について' required htmlFor='label-display' />

          <Controller
            name='display'
            control={control}
            rules={{
              required: '必須項目です',
            }}
            render={({ field }) => (
              <RadioGroup
                id='display'
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
            id='submit'
            text='投稿する'
            className='m-auto my-10 text-center'
            onClick={handleSubmit(addPost)}
          />
        </div>
      </Box>
    </div>
  )
}
