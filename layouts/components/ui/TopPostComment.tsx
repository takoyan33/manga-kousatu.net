'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { FormLabel, Avatar } from '@mui/material'
import { getAuth } from 'firebase/auth'
import { doc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Modal from 'react-modal'
import * as yup from 'yup'
import { database } from 'firebaseConfig'
import { successNotify, errorNotify } from 'layouts/components/text'
import { deleteComment, getComments, useGetMyUser } from 'layouts/hooks'
import { GetComment } from 'types/comment'

// バリデーションルール
const schema = yup.object({
  comment: yup.string().required('必須です'),
})

// eslint-disable-next-line react/display-name
export const TopPostComment = React.memo(({ routerid }: any) => {
  const auth = getAuth()
  const user = auth.currentUser
  useEffect(() => {
    if (user) {
      useGetMyUser(setMyUser, user.uid)
    }
    getComments(setComments, routerid)
  }, [])
  const [comment, setComment] = useState<string>('')
  const [comments, setComments] = useState<Array<GetComment>>([])
  const [myUser, setMyUser] = useState<any>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })

  //コメント編集のモーダルの開
  const [isCommentModalOpen, setIsCommentModalOpen] = useState<boolean>(false)
  //コメント編集のモーダルの開
  const openCommentModal = (): void => {
    setIsCommentModalOpen(true)
  }
  //コメント編集のモーダルの締
  const closeCommentModal = (): void => {
    setIsCommentModalOpen(false)
  }

  //コメントの追加
  const addComment = async (data) => {
    const newDate = new Date().toLocaleString('ja-JP')
    const postRef = await doc(database, 'comments', routerid + (comments.length + 2).toString())

    await setDoc(postRef, {
      comment: data.comment,
      userid: user?.uid,
      postid: routerid,
      username: myUser?.userName || 'ユーザー名未設定',
      createTime: newDate,
      timestamp: serverTimestamp(),
      userEmail: user?.email,
      isEdit: false,
      userPhoto: myUser?.profileImage || '',
      id: routerid + (comments.length + 1).toString(),
    })
      .then(() => {
        successNotify('コメントを投稿しました')
        getComments(setComments, routerid)
      })
      .catch(() => {
        errorNotify('コメントの投稿に失敗しました')
      })
  }

  //コメントの編集
  const updateComment = (commentId: string) => {
    const commentDate = doc(database, 'comments', commentId)
    updateDoc(commentDate, {
      comment: comment,
      username: myUser?.userName ? myUser.userName : 'ユーザー名未設定',
      userEmail: user?.email,
      userPhoto: myUser?.profileImage ? myUser.profileImage : '',
      isEdit: true,
    })
      .then(() => {
        successNotify('コメントを更新しました')
        // router.push(`/post/${routerid}`)
        setIsCommentModalOpen(false)
      })
      .catch((err) => {
        errorNotify('コメントの更新に失敗しました')
        console.log(err)
      })
  }

  //コメントのいいね
  // const LikeCommentAdd = (routerid, likes) => {
  //   const comment = doc(database, 'comments', routerid)
  //   updateDoc(comment, {
  //     likes: likes + 1,
  //     likes_email: arrayUnion(user.email),
  //   })
  //     .then(() => {
  //       setOn((prev) => !prev)
  //       setLikecount(0)
  //       setTimeout(() => {
  //         useGetPost(setSinglePost, routerid)
  //       }, 2000)
  //     })
  //     .catch((err) => {
  //       console.log(err)
  //     })
  // }

  return (
    <div>
      <div className='my-4 text-center'>
        <p className='text-lg font-bold text-gray-700 lg:text-xl'>
          コメント {comments.length}
          <span className='ml-1 text-base'>件</span>
        </p>
      </div>

      {comments?.map((comment) => {
        return (
          <article className='mb-6 rounded-lg border bg-white p-6 text-base' key={comment.id}>
            <div className='mb-2 flex items-center justify-between'>
              <div className='flex items-center'>
                <Avatar
                  className='m-auto max-w-sm border text-center'
                  alt='プロフィール'
                  sx={{ width: 30, height: 30 }}
                  src={comment.userPhoto}
                />
                <p className='mx-3 inline-flex items-center text-sm font-semibold text-gray-900'>
                  {comment.username}
                </p>
                <p className='text-sm text-gray-600 dark:text-gray-400'>{comment.createTime}</p>
              </div>
            </div>

            <p className='my-4 whitespace-pre-wrap break-words'>{comment.comment}</p>
            {user && (
              <>
                {user.email === comment.userEmail && (
                  <div className='flex'>
                    <button
                      id='edit-comment'
                      onClick={openCommentModal}
                      className='text-whit mx-2 rounded-xl border bg-green-600 px-3 py-1 text-sm text-white'
                    >
                      編集
                    </button>
                    <button
                      onClick={() => deleteComment(comment.id)}
                      className='mx-2 rounded-xl border bg-red-600 px-3 py-1 text-sm text-white'
                      id='delete-comment'
                    >
                      削除
                    </button>
                  </div>
                )}
              </>
            )}
            <Modal
              isOpen={isCommentModalOpen}
              onRequestClose={closeCommentModal}
              contentLabel='comment Modal'
            >
              <div>
                <FormLabel id='demo-radio-buttons-group-label'>
                  コメント<span className='text-red-600'>*</span>
                </FormLabel>
              </div>
              <div>
                <input
                  id='input-update-comment'
                  className='sm:text-md block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                  defaultValue={comment.comment}
                  type='text'
                  onChange={(event) => setComment(event.target.value)}
                />
                <div className='mt-4 flex justify-center'>
                  <button
                    onClick={() => updateComment(comment.id)}
                    className='mx-2 rounded-xl border bg-green-600 px-3 py-1 text-sm text-white '
                    id='update-comment'
                  >
                    更新する
                  </button>
                  <button
                    onClick={closeCommentModal}
                    className='mx-2 rounded-xl border bg-red-600 px-3 py-1 text-sm text-white'
                  >
                    閉じる
                  </button>
                </div>
              </div>
            </Modal>
          </article>
        )
      })}
      {!user && (
        <>
          <div className='my-4 text-center'>
            <p className='text-gray-700'>
              コメントを投稿するには、
              <Link href='/login'>
                <span className='text-blue-500 underline'>ログイン</span>
              </Link>
              or
              <Link href='/register'>
                <span className='text-blue-500 underline'>会員登録</span>
              </Link>
              をする必要があります。
            </p>
          </div>
        </>
      )}
      {user && (
        <section className='bg-white py-8 lg:py-16'>
          <div className='mx-auto max-w-2xl px-4'>
            <form className='mb-6' id='aa'>
              <div className='mb-4 rounded-lg rounded-t-lg border border-gray-200 bg-white py-2 px-4  dark:border-gray-700'>
                <label htmlFor='comment' className='sr-only'>
                  あなたのコメント
                </label>
                <textarea
                  id='input-comment'
                  rows={6}
                  className='w-full border-0 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0  dark:placeholder-gray-400 '
                  placeholder='コメントを入力してください'
                  required
                  {...register('comment', { required: 'コメントは必須です' })}
                ></textarea>
              </div>
              {errors.comment && <p className='text-red-500'>コメントは必須です</p>}
              <button
                id='add-comment'
                type='submit'
                onClick={handleSubmit(addComment)}
                className='focus:ring-primary-200 hover:bg-primary-800 m-auto rounded-lg py-2.5 px-4 text-center text-xs  font-medium focus:ring-4'
              >
                コメントする
              </button>
            </form>
          </div>
        </section>
      )}
    </div>
  )
})
