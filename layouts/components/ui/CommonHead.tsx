import Head from 'next/head'
import React from 'react'

// eslint-disable-next-line react/display-name
export const CommonHead: React.VFC = React.memo(() => {
  return (
    <Head>
      <title>Manga Study</title>
      <meta name='description' content='Manga Study' />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  )
})
