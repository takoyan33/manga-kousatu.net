import { yupResolver } from '@hookform/resolvers/yup'
import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import { Stack } from '@mui/material'
import { doc, updateDoc } from 'firebase/firestore'
// import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { TagsInput } from 'react-tag-input-component'
import * as yup from 'yup'
import { database } from 'firebaseConfig'
import { postImage } from 'layouts/api'
import { SiteButton } from 'layouts/components/button'
import { SiteLabel, successNotify, errorNotify } from 'layouts/components/text'
import { FORM_CATEGORIES, FORM_NETABARE, NoIndexHead, DISPLAY_DATA } from 'layouts/components/ui'
import { useGetPost } from 'layouts/hooks'
import ImageUpload from 'utils/image-upload'
// import { GetPost } from 'types/post'

const schema = yup.object({
  title: yup.string().required('必須です'),
})

const PostEdit = () => {
  const [processing, setProcessing] = useState<boolean>(false)
  const [image, setImage] = useState<File>()
  const [context, setContext] = useState<string>('')
  const [category, setCategory] = useState<string>('')
  const [postTitle, setPostTitle] = useState<string>('')
  const [createObjectURL, setCreateObjectURL] = useState<string>('')
  const [post, setPost] = useState<any>()
  const [netabare, setNetabare] = useState<string>('')
  const [display, setDisplay] = useState<string>('')
  const [selected, setSelected] = useState<string[]>(['最終回'])

  const router = useRouter()
  const routerid = router.query.id as string

  const {
    control,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      category: post?.category || 'ONEPIECE',
      netabare: post?.netabare || 'spoil',
      display: post?.display?.toString() || 'true',
    },
  })

  useEffect(() => {
    if (post?.downloadURL) {
      setCreateObjectURL(post.downloadURL)
    }
    if (post?.category) {
      setValue('category', post.category)
    }
    if (post?.netabare) {
      setValue('netabare', post.netabare)
    }
    if (post?.display.toString()) {
      setValue('display', post.display.toString())
    }
  }, [post, setValue])

  //画像の取得
  const uploadImage = (event): void => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      setImage(file)
      setCreateObjectURL(URL.createObjectURL(file))
    }
  }

  useEffect(() => {
    const fetchPost = async () => {
      const post = await useGetPost(routerid) // useGetPostで取得
      if (post) {
        setPost(post) // 成功したら状態を更新
      } else {
        console.log('記事が見つかりません')
        router.push('/404') // 記事が見つからない場合は404ページへ遷移
      }
    }

    fetchPost()
    setContext(post?.context)
    setPostTitle(post?.title)
  }, [])

  //投稿を更新
  const updatePost = async (): Promise<void> => {
    // 処理中(true)なら非同期処理せずに抜ける
    if (processing) {
      return
    }
    // 処理中フラグを上げる
    setProcessing(true)
    const result = await postImage(image)
    const fieldToEdit = doc(database, 'posts', routerid)
    const newdate = new Date().toLocaleString('ja-JP')
    updateDoc(fieldToEdit, {
      category: category,
      downloadURL: createObjectURL ? createObjectURL : result,
      title: postTitle,
      netabare: netabare,
      context: context,
      updatedAt: newdate,
      selected: selected,
      display: display,
    })
      .then(() => {
        successNotify('記事を更新しました')
        setProcessing(false)
        setTimeout(() => {
          router.push(`/post/${routerid}`)
        }, 2000)
      })
      .catch((err) => {
        errorNotify('記事の更新に失敗しました')
        setProcessing(false)
        console.log(err)
      })
  }

  // TODO: リッチエディタの導入
  // const RichTextEditor = React.useMemo(
  //   () =>
  //     dynamic(() => import('../../../layouts/components/ui/RichTextEditor'), {
  //       loading: () => <p>リッチエディタ is loading</p>,
  //       ssr: false,
  //     }),
  //   [],
  // )

  // const [plainText, setPlainText] = useState<string>('')
  // const [html, setHtml] = useState<string>('')

  // const handleEditorChange = (plainText, html) => {
  //   setPlainText(plainText)
  //   setHtml(html)
  //   setPostsLength(plainText.length)
  // }

  const moveBack = () => {
    const confirmResult = confirm('記入した内容は破棄されますが、よろしいですか？')
    if (confirmResult) {
      router.push(`/post/${routerid}`)
    }
  }

  return (
    <>
      <NoIndexHead />

      <div className='m-auto max-w-5xl'>
        <div>
          <div>
            <div className='my-4 lg:w-full'>
              <Link href='/top'>トップ</Link>＞ 記事一覧 ＞
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
                    <ImageUpload onChange={uploadImage} createObjectURL={createObjectURL} />
                    <input
                      id='file-input'
                      className='hidden'
                      type='file'
                      accept='image/*,.png,.jpg,.jpeg,.gif'
                      name='myImage'
                      onChange={uploadImage}
                    />
                  </div>
                  <div className='mb-2'>
                    <SiteLabel name='タイトル（最大20文字）' required htmlFor='title' />
                  </div>
                </div>
                <div>
                  <input
                    id='title'
                    placeholder='タイトル（最大20文字)'
                    className='sm:text-md block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                    defaultValue={post?.title}
                    type='text'
                    onChange={(event) => setPostTitle(event.target.value)}
                  />
                </div>
                <div className='mb-2'>
                  <SiteLabel name='作品名' required htmlFor='category' />
                </div>
                {/* {post && (
                  <Controller
                    name='category'
                    control={control}
                    rules={{
                      required: '必須項目です',
                    }}
                    render={({ field }) => (
                      <RadioGroup
                        id='managa-name'
                        aria-labelledby='managa-name'
                        defaultValue={post?.category}
                        onChange={(e) => {
                          field.onChange(e)
                          setCategory(e.target.value)
                        }}
                      >
                        {FORM_CATEGORIES.map((category) => (
                          <FormControlLabel
                            key={category.id}
                            value={category.value}
                            control={<Radio />}
                            label={category.label}
                          />
                        ))}
                      </RadioGroup>
                    )}
                  />
                )} */}

                {post && (
                  <Controller
                    name='category'
                    control={control}
                    rules={{
                      required: '必須項目です',
                    }}
                    render={({ field }) => (
                      <div id='manga-name' className='space-y-2'>
                        {FORM_CATEGORIES.map((category) => (
                          <label
                            key={category.id}
                            className='flex cursor-pointer items-center space-x-2'
                          >
                            <input
                              type='radio'
                              value={category.value}
                              checked={field.value === category?.value}
                              onChange={(e) => {
                                field.onChange(e.target.value)
                                setCategory(e.target.value)
                                console.log(category)
                              }}
                              className='form-radio text-blue-600'
                            />
                            <span className='text-sm'>{category.label}</span>
                          </label>
                        ))}
                        {/* {errors.category && (
                          <p className='text-sm text-red-500'>{errors.category.message}</p>
                        )} */}
                      </div>
                    )}
                  />
                )}

                <div className='mb-2'>
                  <SiteLabel name='タグ' htmlFor='tags' />
                </div>
                <TagsInput
                  value={selected}
                  onChange={setSelected}
                  name='tags'
                  placeHolder='タグを追加してください'
                />
                <div className='mb-2'>
                  <SiteLabel name='ネタバレについて' required htmlFor='netabare' />
                </div>
                {/* {post && (
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
                        defaultValue={post?.netabare}
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
                )} */}
                {post && (
                  <Controller
                    name='netabare'
                    control={control}
                    rules={{
                      required: '必須項目です',
                    }}
                    render={({ field }) => (
                      <div className='flex flex-col gap-2'>
                        {FORM_NETABARE.map((netabare) => (
                          <label
                            key={netabare.id}
                            className='inline-flex items-center gap-2 text-sm text-gray-800'
                          >
                            <input
                              type='radio'
                              value={netabare.value}
                              checked={field.value === netabare.value}
                              onChange={(e) => {
                                field.onChange(e.target.value)
                                setNetabare(e.target.value)
                                console.log(netabare)
                              }}
                              className='text-pink-500 focus:ring-pink-500'
                            />
                            {netabare.label}
                          </label>
                        ))}
                      </div>
                    )}
                  />
                )}
                <div className='mb-2'>
                  <SiteLabel name='内容（最大500文字）' required htmlFor='label-content' />
                </div>
                <textarea
                  placeholder='内容(最大500文字）'
                  className='sm:text-md block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                  id='content'
                  rows={14}
                  defaultValue={post?.context}
                  onChange={(event) => setContext(event.target.value)}
                />
                {/* <RichTextEditor onChange={handleEditorChange} value={post?.context} /> */}

                <div className='mb-2'>
                  <SiteLabel name='公開について' required htmlFor='label-display' />
                </div>
                {/* {post && (
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
                        defaultValue={post?.display.toString()}
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
                )} */}
                {post && (
                  <Controller
                    name='display'
                    control={control}
                    rules={{
                      required: '必須項目です',
                    }}
                    render={({ field }) => (
                      <div className='flex flex-col gap-2'>
                        {DISPLAY_DATA.map((display) => (
                          <label
                            key={display.id}
                            className='inline-flex items-center gap-2 text-sm text-gray-800'
                          >
                            <input
                              type='radio'
                              value={display.value.toString()}
                              checked={field.value === display.value.toString()}
                              onChange={(e) => {
                                const value = e.target.value
                                field.onChange(value)
                                setDisplay(value)
                              }}
                              className='text-blue-600 focus:ring-blue-500'
                            />
                            {display.label}
                          </label>
                        ))}
                      </div>
                    )}
                  />
                )}

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
                {processing && (
                  <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
                    <p className='text-xl font-bold text-white'>投稿中...</p>
                  </div>
                )}

                <div className='m-auto flex justify-center gap-4'>
                  <SiteButton
                    id='submit'
                    text='戻る'
                    className=''
                    onClick={moveBack}
                    disabled={processing}
                  />
                  <SiteButton
                    id='submit'
                    text='投稿する'
                    className=''
                    variant='contained'
                    onClick={updatePost}
                    disabled={processing}
                  />
                </div>
              </Stack>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default PostEdit
