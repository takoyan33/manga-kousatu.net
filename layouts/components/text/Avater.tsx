/* eslint-disable react/display-name */
import Avatar from '@mui/material/Avatar'
import React from 'react'

type Props = {
  photoURL: string
  displayname: string
}

//React.memo化
const Avater: React.VFC<Props> = React.memo(({ photoURL, displayname }) => {
  return (
    <div>
      <Avatar alt='Remy Sharp' src={photoURL} />
      <span className='text-xl'>{displayname}</span>
    </div>
  )
})

export default Avater
