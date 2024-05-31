import React, { useContext } from 'react'
// import { LoginContext } from "../../../pages/index";
import Link from 'next/link'
import Button from '@mui/material/Button'

type Context = {
  text: string
}

// eslint-disable-next-line react/display-name
export const LoginButton = React.memo(() => {
  // const loginContext = useContext<Context>(LoginContext);
  return (
    <div>
      <Button variant='outlined' className='w-50 m-auto my-2'>
        {/* <Link href="/login">{loginContext.text}</Link> */}
      </Button>
    </div>
  )
})
