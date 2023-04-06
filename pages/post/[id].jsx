/* eslint-disable jsx-a11y/alt-text */
import { useRouter } from 'next/router'
import React from 'react'
import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'
import { database } from '../../firebaseConfig'
import {
  collection,
  getDocs,
  doc,
  getDoc,
  setDoc,
  updateDoc,
  onSnapshot,
  deleteDoc,
  arrayUnion,
} from 'firebase/firestore'
import { TextField, Box, FormLabel, Button, Avatar } from '@mui/material'
import { getAuth } from 'firebase/auth'
import Image from 'react-image-resizer'
import { SiteButton } from '../../layouts/components/button'
import { SiteCategory } from '../../layouts/components/text'
import { CommonHead, Cardpost } from '../../layouts/components/ui'
import FavoriteIcon from '@mui/icons-material/Favorite'
import AccessTimeIcon from '@mui/icons-material/AccessTime'
import AccountBoxIcon from '@mui/icons-material/AccountBox'
import { query, orderBy, where } from 'firebase/firestore'
import BorderColorIcon from '@mui/icons-material/BorderColor'
import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { SubmitHandler, useForm, Controller } from 'react-hook-form'
import { notify, signupmissnotify } from '../../layouts/components/text/SiteModal'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

// バリデーションルール
const schema = yup.object({
  comment: yup.string().required('必須です'),
})

const Post = () => {
  const [ID, setID] = useState(null)
  const [context, setContext] = useState('')
  const [comments, setComments] = useState('')
  const [categori, setCategori] = useState('')
  const [photoURL, setPhotoURL] = useState()
  const [users, setUsers] = useState(null)
  const [createtime, setCreatetime] = useState('')
  const [isUpdate, setIsUpdate] = useState(false)
  const [posttitle, setPostTitle] = useState('')
  const databaseRef = collection(database, 'posts')
  //データベースを取得
  const [recfiredata, setRecfiredata] = useState([])
  const [downloadURL, setDownloadURL] = useState(null)
  const [likecount, setLikecount] = useState(0)
  const usersRef = collection(database, 'users')
  const [userid, setUserid] = useState(null)
  const [netabare, setNetabare] = useState('')
  const [likes, setLikes] = useState(null)
  const [selected, setSelected] = useState(['最終回'])
  //データベースを取得
  const q = query(databaseRef, orderBy('timestamp', 'desc'))
  // const c = query(commentseRef, orderBy('createtime', 'desc'))

  const router = useRouter()
  const routerid = router.query.id
  const auth = getAuth()
  const user = auth.currentUser
  const styles = { whiteSpace: 'pre-line' }

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  const getPost = async () => {
    try {
      const ref = await doc(database, 'posts', routerid)
      const snap = await getDoc(ref)
      setRecfiredata(snap.data())
      console.log('recfiredata', recfiredata)
    } catch (error) {
      console.log(error)
    }
  }

  const getallComment = async () => {
    const commentseRef = collection(database, 'comments')
    const c = await query(commentseRef, where('postid', '==', routerid))
    try {
      const querySnapshot = await getDocs(c)
      const allcomments = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }))
      console.log('allcomments', allcomments)
      await setComments(allcomments)
    } catch (error) {
      console.log('Error fetching user data', error)
    }
  }

  // const categoriFiredata = async () => {
  //   //firestoreからデータ取得
  //   await getDocs(q).then((querySnapshot) => {
  //     //コレクションのドキュメントを取得
  //     setRecfiredata(
  //       querySnapshot.docs.map((data) => {
  //         //配列なので、mapで展開する
  //         return { ...data.data(), id: data.id }
  //         //スプレッド構文で展開して、新しい配列を作成
  //       }),
  //     )
  //   })
  // }

  const usersData = async () => {
    //firestoreからデータ取得
    await getDocs(usersRef).then((response) => {
      //コレクションのドキュメントを取得
      setUsers(
        response.docs.map((data) => {
          //配列なので、mapで展開する
          return { ...data.data(), id: data.id }
          //スプレッド構文で展開して、新しい配列を作成
        }),
      )
    })
  }

  useEffect(() => {
    // categoriFiredata();
    getPost()
    usersData()
    getallComment()
  }, [router])

  const getID = (
    id,
    title,
    context,
    downloadURL,
    categori,
    cratetime,
    netabare,
    photoURL,
    userid,
    likes,
    selected,
  ) => {
    setID(id)
    setContext(context)
    setPostTitle(title)
    setDownloadURL(downloadURL)
    setIsUpdate(true)
    setCategori(categori)
    setCreatetime(cratetime)
    setNetabare(netabare)
    setPhotoURL(photoURL)
    setUserid(userid)
    setLikes(likes)
    setSelected(selected)
  }

  const updatefields = () => {
    //更新する
    const fieldToEdit = doc(database, 'posts', ID)
    const newdate = new Date().toLocaleString('ja-JP')
    //セットしたIDをセットする
    updateDoc(fieldToEdit, {
      title: posttitle,
      context: context.replace(/\r?\n/g, '\n'),
      edittime: newdate,
    })
      .then(() => {
        notify('記事を更新しました')
        setPostTitle('')
        setContext('')
        setIsUpdate(false)
        // router.push(`${ID}`);
        // getallPost();
        // usersData();
        setTimeout(() => {
          router.push('/')
        }, 2000)
      })
      .catch((err) => {
        signupmissnotify('失敗しました')
        console.log(err)
      })
  }

  const deleteDocument = (id) => {
    //data.idを送っているのでidを受け取る
    let fieldToEdit = doc(database, 'posts', id)
    let checkSaveFlg = window.confirm('削除しても大丈夫ですか？')
    //確認画面を出す

    if (checkSaveFlg) {
      deleteDoc(fieldToEdit)
        //記事を削除する
        .then(() => {
          notify('記事を削除しました')
          setTimeout(() => {
            router.push('/')
          }, 2000)
          getallPost()
        })
        .catch((err) => {
          signupmissnotify('失敗しました')
        })
    } else {
      setTimeout(() => {
        router.push('/')
      }, 2000)
    }
  }

  const LikeAdd = (routerid, likes) => {
    console.log(routerid)
    let fieldToEdit = doc(database, 'posts', routerid)
    updateDoc(fieldToEdit, {
      likes: likes + 1,
      likes_email: arrayUnion(user.email),
    })
      .then(() => {
        console.log(user.email)
        setLikecount(0)
        notify('成功しました')
        getPost()
      })
      .catch((err) => {
        signupmissnotify('失敗しました')
        console.log(err)
      })
  }
  const addComment = async (data) => {
    const newdate = new Date().toLocaleString('ja-JP')

    const postRef = await doc(database, 'comments', routerid + (comments.length + 1).toString())

    await setDoc(postRef, {
      comment: data.comment,
      userid: user.uid,
      postid: recfiredata.id,
      username: user.displayName,
      createtime: newdate,
      id: routerid + (comments.length + 1).toString(),
    })
      .then(() => {
        notify('コメントを投稿しました')
        getallComment()
      })
      .catch((err) => {
        notify('コメントを投稿しました')
      })
  }

  return (
    <>
      <CommonHead />
      <ToastContainer />
      <div>
        <div>
          <div className='lg:w-full my-4 '>
            {user && (
              <>
                {user.email == recfiredata.email && (
                  <div>
                    <SiteButton
                      href=''
                      text='更新する'
                      className=' my-2 m-4'
                      onClick={() =>
                        getID(id, recfiredata.title, recfiredata.context, recfiredata.edittime)
                      }
                    />
                    <SiteButton
                      href=''
                      text='削除する'
                      className=' my-2 m-4'
                      onClick={() => deleteDocument(id)}
                    />
                  </div>
                )}
              </>
            )}

            {isUpdate && (
              <Box
                component='form'
                sx={{
                  '& > :not(style)': { m: 1, width: '25ch' },
                }}
                noValidate
                autoComplete='off'
              >
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
                  <TextField
                    label='内容(最大500文字）'
                    className='m-auto w-full'
                    id='filled-multiline-static'
                    multiline
                    rows={14}
                    type='text'
                    value={context}
                    onChange={(event) => setContext(event.target.value)}
                  />
                </div>
                <Button variant='outlined' onClick={updatefields}>
                  更新する
                </Button>
              </Box>
            )}
            <div>
              <Link href='/'>トップ</Link>　＞　投稿記事　＞　
              {recfiredata.title}
            </div>
            <div className='flex justify-center my-6'>
              <Image
                className='m-auto text-center max-w-sm'
                height={500}
                width={500}
                src={recfiredata.downloadURL}
              />
            </div>
            <div className='text-2xl my-4'>{recfiredata.title}</div>
            <br></br>
            <div>
              <AccessTimeIcon /> 投稿日時：{recfiredata.createtime}
            </div>
            <br></br>
            {recfiredata.edittime && (
              <div>
                <AccessTimeIcon />
                編集日時：{recfiredata.edittime}
              </div>
            )}
            <br></br>
            {recfiredata.selected &&
              recfiredata.selected.map((tag, i) => (
                <span className='text-cyan-700' key={i}>
                  #{tag}　
                </span>
              ))}
            <div variant='body2' color='text.secondary'>
              {/* <SiteCategory
                    className={Categories[recfiredata.categori].className}
                    text={Categories[recfiredata.categori].title}
                    href={Categories[recfiredata.categori].link}
                  /> */}
              {/* 
                  {Categories.map((categori) => (
                    <SiteCategory
                      key={categori.id}
                      className={`p-1 inline-block text-white text-center m-6 + ${
                        categori[recfiredata.categori].className
                      }`}
                      text={categori[recfiredata.categori].title}
                      href={categori[recfiredata.categori].link}
                    />
                  ))} */}
              {recfiredata.categori == 'ONEPIECE' && (
                <SiteCategory
                  className='bg-blue-500 p-1 inline-block text-white text-center m-6'
                  text='ONE PIECE'
                  href='/post/categories/ONEPIECE'
                />
              )}
              {recfiredata.categori == '呪術廻戦' && (
                <SiteCategory
                  className='bg-purple-500 p-1 inline-block text-white text-center m-6'
                  text='呪術廻戦'
                  href='/post/categories/呪術廻戦'
                />
              )}
              {recfiredata.categori == '東京リベンジャーズ' && (
                <SiteCategory
                  className='bg-rose-500 p-1 inline-block text-white text-center m-6'
                  text='東京リベンジャーズ'
                  href='/post/categories/東京リベンジャーズ'
                />
              )}
              {recfiredata.categori == 'キングダム' && (
                <SiteCategory
                  className='bg-yellow-500 p-1 inline-block text-white text-center m-6'
                  text='キングダム'
                  href='/post/categories/キングダム'
                />
              )}
              {recfiredata.netabare == 'ネタバレ有' && (
                <span className='bg-yellow-500 mt-2 p-1 inline-block text-white text-center m-4'>
                  {recfiredata.netabare}
                </span>
              )}
              {recfiredata.netabare == 'ネタバレ無' && (
                <span className='bg-blue-500 mt-2 p-1 inline-block text-white text-center m-4'>
                  {recfiredata.netabare}
                </span>
              )}
              <p className='text-left' style={styles}>
                {recfiredata.context}
              </p>
              <br></br>
              {recfiredata.contextimage && (
                <div className='flex justify-center'>
                  <Image
                    className='m-auto text-center max-w-sm'
                    height={500}
                    width={500}
                    src={recfiredata.contextimage}
                  />
                </div>
              )}
              <div className='my-4'>
                <FavoriteIcon />
                {recfiredata.likes}
              </div>
              {user &&
                (recfiredata.likes_email ? (
                  recfiredata.likes_email.includes(user.email) ? (
                    <p>すでにいいね済みです</p>
                  ) : (
                    <button
                      href=''
                      text='いいねする'
                      className='inline my-2 m-4'
                      onClick={() => LikeAdd(routerid, recfiredata.likes)}
                    >
                      いいねする
                    </button>
                  )
                ) : (
                  <p>ログインするといいねできます</p>
                ))}
              {user && (
                <section className='bg-white py-8 lg:py-16'>
                  <div className='max-w-2xl mx-auto px-4'>
                    <div className='flex justify-between items-center mb-6'>
                      <h2 className='text-lg lg:text-2xl font-bold text-gray-900 '>
                        コメント ({comments.length})
                      </h2>
                    </div>
                    <form className='mb-6'>
                      <div className='py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200  dark:border-gray-700'>
                        <label for='comment' className='sr-only'>
                          あなたのコメント
                        </label>
                        <textarea
                          id='comment'
                          rows='6'
                          className='px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none  dark:placeholder-gray-400 '
                          placeholder='コメントを入力してください'
                          required
                          {...register('comment')}
                          error={'comment' in errors}
                          helperText={errors.comment?.message}
                          label='コメント*（最大100文字)'
                        ></textarea>
                      </div>
                      <button
                        type='submit'
                        onClick={handleSubmit(addComment)}
                        className='inline-flex items-center py-2.5 px-4 text-xs font-medium text-center rounded-lg focus:ring-4 focus:ring-primary-200  hover:bg-primary-800 m-auto'
                      >
                        コメントする
                      </button>
                    </form>
                  </div>
                </section>
              )}

              {!user && (
                <>
                  <div className='flex justify-between items-center mb-6'>
                    <h2 className='text-lg lg:text-2xl font-bold text-gray-900 '>
                      コメント ({comments.length})
                    </h2>
                    <p className='my-6'>ログインするとコメントできます</p>
                  </div>
                </>
              )}

              {comments &&
                comments.map((comment) => {
                  return (
                    <article
                      className='p-6 mb-6 text-base border bg-white rounded-lg'
                      key={comment.id}
                    >
                      <footer className='flex justify-between items-center mb-2'>
                        <div className='flex items-center'>
                          <p className='inline-flex items-center mr-3 text-sm text-gray-900 '>
                            {comment.username}
                          </p>
                          <p className='text-sm text-gray-600 dark:text-gray-400'>
                            <time pubdate datetime='2022-02-08' title='February 8th, 2022'>
                              {comment.createtime}
                            </time>
                          </p>
                        </div>
                      </footer>
                      <p className='text-gray-500 dark:text-gray-400'>{comment.comment}</p>
                    </article>
                  )
                })}

              <div className='cursor-pointer'>
                {users &&
                  users.map((user) => {
                    return (
                      <>
                        {recfiredata.email === user.email && (
                          <Link href={`/profile/${user.userid}`}>
                            <div key={user.userid}>
                              <div className='bg-slate-200 my-8 py-8 flex m-auto'>
                                <div key={user.id}>
                                  <div>
                                    <Avatar
                                      className='m-auto text-center max-w-sm border'
                                      alt='プロフィール'
                                      sx={{ width: 100, height: 100 }}
                                      src={user.profileimage}
                                    />
                                  </div>
                                </div>
                                <div className='ml-6 mt-4 '>
                                  <span className='text-xl'>
                                    <AccountBoxIcon /> {user.username}
                                  </span>
                                  <div className='text-xl my-2'>
                                    <BorderColorIcon />
                                    {user.bio}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        )}
                      </>
                    )
                  })}
              </div>
            </div>
          </div>
          <>
            {/* <h2 className="text-2xl">こちらもおすすめ</h2>
              <div className="max-w-7xl m-auto">
                <Grid container spacing={1}>
                  {recfiredata.map((data) => {
                    return (
                      <Cardpost
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
                    );
                  })}
                  {recfiredata.length == 0 && (
                    <p className="text-center m-auto my-6 text-2xl">
                      まだ投稿されていません
                    </p>
                  )}
                </Grid>
              </div> */}
          </>
        </div>
      </div>
    </>
  )
}

export default Post
