/* eslint-disable react/display-name */
import Avatar from '@mui/material/Avatar'
import React from 'react'

interface AvatarParams {
  photoURL: string
  displayname: string
}

//React.memo化
const CommonAvatar = React.memo(({ photoURL, displayname }: AvatarParams) => {
  return (
    <>
      <Avatar alt='アバター画像' src={photoURL} />
      <span className='text-xl'>{displayname}</span>
    </>
  )
})

export default CommonAvatar
