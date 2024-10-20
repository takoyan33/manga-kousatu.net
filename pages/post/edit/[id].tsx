import { yupResolver } from '@hookform/resolvers/yup'
import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import { Stack, FormLabel } from '@mui/material'
import { doc, getDoc, updateDoc } from 'firebase/firestore'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import Image from 'react-image-resizer'
import { TagsInput } from 'react-tag-input-component'
import * as yup from 'yup'
import { database } from 'firebaseConfig'
import { postImage } from 'layouts/api'
import { SiteButton } from 'layouts/components/button'
import { successNotify, errorNotify } from 'layouts/components/text'
import { FORM_CATEGORIES, FORM_NETABARE, CommonHead, DISPLAY_DATA } from 'layouts/components/ui'
import ImageUpload from 'layouts/utils/ImageUpload'
// import { GetPost } from 'types/post'

const schema = yup.object({
  title: yup.string().required('必須です'),
})

const PostEdit = () => {
  const [ID, setID] = useState<string>(null)
  const [image, setImage] = useState<number>(null)
  const [context, setContext] = useState<string>('')
  const [categori, setCategori] = useState<string>('')
  const [postTitle, setPostTitle] = useState<string>('')
  const [createObjectURL, setCreateObjectURL] = useState<string>('')
  //データベースを取得
  const [post, setPost] = useState<any>()
  const [lengthData, setPostsLength] = useState<number>(null)
  const [netabare, setNetabare] = useState<string>('')
  const [display, setDisplay] = useState<string>('')
  const [selected, setSelected] = useState<string[]>(['最終回'])

  const router = useRouter()
  const routerid: string = router.query.id.toString()

  const { register, control } = useForm({
    resolver: yupResolver(schema),
  })

  const uploadImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      setImage(file)
      setCreateObjectURL(URL.createObjectURL(file))
    }
  }

  const useUseGetPost = async () => {
    try {
      const ref = await doc(database, 'posts', routerid)
      const snap = await getDoc(ref)
      await setPost(snap.data())
      await setCategori(post?.category)
      console.log('post', post)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    useUseGetPost()
    setID(routerid)
    setContext(post?.context)
    setPostTitle(post?.title)
  }, [])

  const updatePost = async () => {
    const result = await postImage(image)
    const fieldToEdit = doc(database, 'posts', routerid)
    const newdate = new Date().toLocaleString('ja-JP')
    updateDoc(fieldToEdit, {
      downloadURL: result,
      title: postTitle,
      netabare: netabare,
      categori: categori,
      context: context,
      edittime: newdate,
      selected: selected,
      display: JSON.parse(display),
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

  const [plainText, setPlainText] = useState<string>('')
  const [html, setHtml] = useState<string>('')

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
              <Link href='/top'>トップ</Link>＞ 投稿記事 ＞
              <Link href={`/post/${routerid}`}>
                <span>{post?.title}</span>
              </Link>
              ＞ 考察記事の編集
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
                    <Image
                      className='m-auto max-w-sm text-center'
                      height={400}
                      width={400}
                      src={post?.downloadURL}
                      alt='サムネイル'
                    />
                    {!post?.downloadURL && <p className='text-center'>サムネイルがありません</p>}
                    <ImageUpload onChange={uploadImage} createObjectURL={createObjectURL} text='' />
                    <input
                      id='file-input'
                      className='hidden'
                      type='file'
                      accept='image/*,.png,.jpg,.jpeg,.gif'
                      name='myImage'
                      onChange={uploadImage}
                    />
                  </div>
                  <FormLabel id='demo-radio-buttons-group-label'>
                    タイトル<span className='text-red-600'>*</span>
                  </FormLabel>
                </div>
                <div>
                  <input
                    id='outlined-basic'
                    placeholder='タイトル（最大20文字)'
                    className='sm:text-md block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                    defaultValue={post?.title}
                    type='text'
                    onChange={(event) => setPostTitle(event.target.value)}
                  />
                </div>
                <div>
                  <FormLabel id='demo-radio-buttons-group-label'>
                    作品名<span className='text-red-600'>*</span>
                  </FormLabel>
                </div>
                <p>現在の作品：{post?.category}</p>
                <Controller
                  name='category'
                  control={control}
                  rules={{
                    required: '必須項目です',
                  }}
                  render={({ field }) => (
                    <RadioGroup
                      aria-labelledby='demo-radio-buttons-group-label'
                      name={field.value}
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
                <p>現在のネタバレ：{post?.netabare}</p>
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
                      onChange={(e) => {
                        field.onChange(e)
                        setNetabare(e.target.value)
                      }}
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
                <div>
                  <FormLabel id='demo-radio-buttons-group-label'>
                    内容<span className='text-red-600'>*</span>(最大500文字）
                  </FormLabel>
                </div>
                <p>現在の文章</p>
                <textarea
                  placeholder='内容(最大500文字）'
                  className='sm:text-md block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                  id='filled-multiline-static'
                  rows={14}
                  defaultValue={post?.context}
                  onChange={(event) => setContext(event.target.value)}
                />
                <Richedita onChange={handleEditorChange} value={post?.context} />

                <FormLabel id='demo-radio-buttons-group-label'>
                  公開について<span className='text-red-600'>*</span>
                </FormLabel>
                <p>現在の公開：{post?.display ? <p>公開</p> : <p>下書き</p>}</p>

                <Controller
                  name='display'
                  control={control}
                  rules={{
                    required: '必須項目です',
                  }}
                  render={({ field }) => (
                    <RadioGroup
                      aria-label='公開'
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
                {/* 
                <div className='my-8'>
                  <label htmlFor='file-input'>他の写真（最大1枚）</label> */}
                {/* <ImageUploadContext
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
                  /> */}
                {/* </div> */}

                <SiteButton onClick={updatePost} text='更新する' className='text-center' />
              </Stack>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PostEdit
