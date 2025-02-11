'use client'

import { yupResolver } from '@hookform/resolvers/yup'
import { FormLabel, Avatar } from '@mui/material'
import { getAuth } from 'firebase/auth'
import { doc, setDoc, updateDoc, serverTimestamp } from 'firebase/firestore'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState, useCallback } from 'react'
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

interface CommentForm {
  comment: string
}

// eslint-disable-next-line react/display-name
export const TopPostComment = React.memo(({ routerid }: any) => {
  const auth = getAuth()
  const user = auth.currentUser
  const router = useRouter()
  const routerid: any = router.query.id

  const [comment, setComment] = useState<string>('')
  const [comments, setComments] = useState<Array<GetComment>>([])
  const [myUser, setMyUser] = useState<any>(null)
  const [isCommentModalOpen, setIsCommentModalOpen] = useState<boolean>(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommentForm>({
    resolver: yupResolver(schema),
  })

  const fetchComments = useCallback(() => {
    getComments(setComments, routerid)
  }, [routerid])

  useEffect(() => {
    if (user) {
      useGetMyUser(setMyUser, user.uid)
    }
    fetchComments()
  }, [user, fetchComments])

  const openCommentModal = () => {
    setIsCommentModalOpen(true)
  }

  const closeCommentModal = () => {
    setIsCommentModalOpen(false)
  }

  const addComment = async (data: CommentForm) => {
    const newDate = new Date().toLocaleString('ja-JP')
    const postRef = doc(database, 'comments', routerid + (comments.length + 2).toString())

    try {
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
      successNotify('コメントを投稿しました')
      fetchComments()
    } catch (error) {
      errorNotify('コメントの投稿に失敗しました')
    }
  }

  const updateComment = async (commentId: string) => {
    const commentDate = doc(database, 'comments', commentId)
    try {
      await updateDoc(commentDate, {
        comment,
        username: myUser?.userName || 'ユーザー名未設定',
        userEmail: user?.email,
        userPhoto: myUser?.profileImage || '',
        isEdit: true,
      })
      successNotify('コメントを更新しました')
      router.push(`/post/${routerid}`)
      setIsCommentModalOpen(false)
    } catch (err) {
      errorNotify('コメントの更新に失敗しました')
      console.log(err)
    }
  }

  const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComment(event.target.value)
  }

  return (
    <div>
      <div className='my-4 text-center'>
        <p className='text-lg font-bold text-gray-700 lg:text-xl'>
          コメント {comments.length} <span className='ml-1 text-base'>件</span>
        </p>
      </div>

      {comments?.map((comment) => (
        <article className='mb-6 rounded-lg border bg-white p-6 text-base' key={comment.id}>
          <div className='mb-2 flex items-center justify-between'>
            <div className='flex items-center'>
              <Avatar alt='プロフィール' sx={{ width: 30, height: 30 }} src={comment.userPhoto} />
              <p className='mx-3 inline-flex items-center text-sm font-semibold text-gray-900'>
                {comment.username}
              </p>
              <p className='text-sm text-gray-600 dark:text-gray-400'>{comment.createTime}</p>
            </div>
          </div>

          <p className='my-4 whitespace-pre-wrap break-words'>{comment.comment}</p>
          {user?.email === comment.userEmail && (
            <div className='flex'>
              <button
                      id='edit-comment'
                onClick={openCommentModal}
                className='mx-2 rounded-xl border bg-green-600 px-3 py-1 text-sm text-white'
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

          <Modal
            isOpen={isCommentModalOpen}
            onRequestClose={closeCommentModal}
            contentLabel='comment Modal'
          >
            <div>
              <FormLabel id='demo-radio-buttons-group-label'>
                コメント<span className='text-red-600'>*</span>
              </FormLabel>
              <input
                  id='input-update-comment'
                className='sm:text-md block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500'
                defaultValue={comment.comment}
                type='text'
                onChange={handleCommentChange}
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
      ))}

      {!user && (
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
            が必要です。
          </p>
        </div>
      )}

      {user && (
        <section className='bg-white py-8 lg:py-16'>
          <div className='mx-auto max-w-2xl px-4'>
            <form className='mb-6'>
              <div className='mb-4 rounded-lg rounded-t-lg border border-gray-200 bg-white py-2 px-4 dark:border-gray-700'>
                <label htmlFor='comment' className='sr-only'>
                  あなたのコメント
                </label>
                <textarea
                  id='input-comment'
                  rows={6}
                  className='w-full border-0 px-0 text-sm text-gray-900 focus:outline-none focus:ring-0 dark:placeholder-gray-400'
                  placeholder='コメントを入力してください'
                  required
                  {...register('comment')}
                />
              </div>
              {errors.comment && <p className='text-red-500'>コメントは必須です</p>}
              <button
                id='add-comment'
                type='submit'
                onClick={handleSubmit(addComment)}
                className='focus:ring-primary-200 hover:bg-primary-800 m-auto rounded-lg py-2.5 px-4 text-center text-xs font-medium focus:ring-4'
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
