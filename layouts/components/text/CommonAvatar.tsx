/* eslint-disable react/display-name */
import Avatar from '@mui/material/Avatar'
import React from 'react'

type Props = {
  photoURL: string
  displayname: string
}

//React.memo化
const CommonAvatar = React.memo(({ photoURL, displayname }: Props) => {
  return (
    <>
      <Avatar alt='Remy Sharp' src={photoURL} />
      <span className='text-xl'>{displayname}</span>
    </>
  )
})

export default CommonAvatar
