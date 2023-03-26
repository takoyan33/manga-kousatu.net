import { useState, useEffect } from 'react'
import { database } from '../../../firebaseConfig'
import { collection, onSnapshot, setDoc, doc } from 'firebase/firestore'
import { useRouter } from 'next/router'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import { postImage } from '../../../layouts/api/upload'
import { postContextImage } from '../../../layouts/api/uploadcontext'
import { RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import FormLabel from '@mui/material/FormLabel'
import { serverTimestamp } from 'firebase/firestore'
import 'firebase/firestore'
import 'moment/locale/ja'
import Imageupload from '../../../packages/utils/Imageupload'
import Imageuploadcontext from '../../../packages/utils/Imageuploadcontext'
import { TagsInput } from 'react-tag-input-component'
import { CommonHead } from '../../../layouts/components/ui'
import { Categoris, Netabares } from '../../../layouts/components/ui/Formcontrols'
import { SiteButton } from '../../../layouts/components/button'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useAuthContext } from '../../../layouts/context/AuthContext'
import { query, orderBy } from 'firebase/firestore'
import { notify, signupmissnotify } from '../../../layouts/components/text/SiteModal'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'

// フォームの型
type SampleFormInput = {
  title: string
  categori: string
  netabare: string
  context: string
}

// バリデーションルール
const schema = yup.object({
  title: yup.string().required('必須です'),
})

export default function Post() {
  const [processing, setProcessing] = useState(false)
  const [selected, setSelected] = useState(['最終回'])
  const [context, setContext] = useState('')
  const databaseRef = collection(database, 'posts')
  const q = query(databaseRef, orderBy('timestamp', 'desc'))
  const [image, setImage] = useState(null)
  const [contextimage, setContextImage] = useState<File[]>([])
  const [createObjectURL, setCreateObjectURL] = useState<string>('')
  const [createcontextObjectURL, setCreatecontexObjectURL] = useState('')
  const [userid, setUserid] = useState(null)
  const [result, setResult] = useState('')
  const [photoURL, setPhotoURL] = useState('')
  const [firedata, setFiredata] = useState([])
  const [lengthdata, setLengthdata] = useState(null)
  const { user } = useAuthContext()

  useEffect(() => {
    if (!user) {
      router.push('/register')
    } else {
      getallPost()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<SampleFormInput>({
    resolver: yupResolver(schema),
  })

  const getallPost = async () => {
    await onSnapshot(q, (querySnapshot) => {
      setFiredata(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    })
  }

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]

      setImage(file)
      setCreateObjectURL(URL.createObjectURL(file))
      console.log(image)
    }
  }

  const uploadToClientcontext = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0]
      console.log(contextimage)
      setContextImage(file)
      setCreatecontexObjectURL(URL.createObjectURL(file))
    }
  }

  const router = useRouter()

  type addDate = {
    toLocaleString(timeZone): string
  }

  const addDate: SubmitHandler<SampleFormInput> = async (data) => {
    // 処理中(true)なら非同期処理せずに抜ける
    if (processing) return
    // 処理中フラグを上げる
    setProcessing(true)
    if (image == null) {
      signupmissnotify('サムネイルを選んでください')
    } else {
      const result = await postImage(image)
      //写真のurlをセットする
      const contextresult = await postContextImage(contextimage)
      //日本時間を代入
      const newdate = new Date().toLocaleString('ja-JP')
      const postRef = await doc(database, 'posts', (firedata.length + 1).toString())

      setResult(result)
      await setDoc(postRef, {
        title: data.title,
        context: context.replace(/\r?\n/g, '\n'),
        downloadURL: result,
        contextimage: contextresult,
        email: user.email,
        displayname: user.displayName,
        categori: data.categori,
        createtime: newdate,
        edittime: '',
        id: (firedata.length + 1).toString(),
        netabare: data.netabare,
        photoURL: user.photoURL,
        userid: user.uid,
        selected: selected,
        timestamp: serverTimestamp(),
        likes: 0,
      })
        .then(() => {
          notify('記事投稿ができました！')
          setProcessing(false)
          setContext('')
          setPhotoURL('')
          setSelected([])
          setUserid('')
          setTimeout(() => {
            router.push('/')
          }, 2000)
        })
        .catch((err) => {
          signupmissnotify('記事投稿に失敗しました！')
          console.error(err)
        })
    }
  }

  return (
    <div>
      <CommonHead />
      <ToastContainer />
      <h2 className='my-12 text-center text-2xl font-semibold'>考察記事の投稿</h2>
      <Box
        component='form'
        sx={{
          '& > :not(style)': { m: 1, width: '50ch' },
        }}
        className='flex justify-center max-w-7xl '
        autoComplete='off'
      >
        <div>
          <Imageupload
            onChange={uploadToClient}
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
            onChange={uploadToClient}
          />

          <FormLabel id='demo-radio-buttons-group-label'>
            タイトル<span className='text-red-600'>*</span>
          </FormLabel>

          <TextField
            {...register('title')}
            error={'title' in errors}
            helperText={errors.title?.message}
            id='outlined-basic'
            label='タイトル*（最大20文字)'
            variant='outlined'
            className='m-auto w-full'
          />

          <div>
            <FormLabel id='demo-radio-buttons-group-label'>
              作品名<span className='text-red-600'>*</span>
            </FormLabel>
          </div>
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
                {Categoris.map((Categori) => (
                  <FormControlLabel
                    key={Categori.id}
                    value={Categori.value}
                    control={<Radio />}
                    label={Categori.label}
                    {...register('categori')}
                  />
                ))}
              </RadioGroup>
            )}
          />
          {errors.categori && <p>{errors.categori.message}</p>}
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

          <FormLabel id='demo-radio-buttons-group-label'>
            内容<span className='text-red-600'>*</span>(最大500文字）
          </FormLabel>

          <p className='my-4'>現在の文字数：{context.length}</p>
          <TextField
            label='内容*(最大500文字）'
            className='m-auto w-full'
            id='filled-multiline-static'
            multiline
            rows={12}
            {...register('context')}
            error={'context' in errors}
            helperText={errors.context?.message}
            value={context}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              if (event.target.value.length <= 500) {
                setContext(event.target.value)
              }
            }}
          />
          <div>
            <p>他の写真（最大1枚）</p>
          </div>
          <Imageuploadcontext
            onChange={uploadToClientcontext}
            createcontextObjectURL={createcontextObjectURL}
            text={'写真'}
            event={undefined}
          />
          <input
            id='file-input'
            className='hidden'
            type='file'
            multiple
            accept='image/*,.png,.jpg,.jpeg,.gif'
            name='myImage'
            onChange={uploadToClientcontext}
          />
          <SiteButton
            href=''
            text='投稿する'
            className='text-center m-auto my-10'
            onClick={handleSubmit(addDate)}
          />
        </div>
      </Box>
    </div>
  )
}
