import Head from 'next/head'
import React from 'react'

interface CommonHeadParams {
  title: string
}

// eslint-disable-next-line react/display-name
export const CommonHead = React.memo(({ title }: CommonHeadParams) => {
  const description = 'Manga Studyでは、漫画の考察などを自由に投稿・閲覧できる web サイトです。'
  const url = 'https://manga-kousatu-net.vercel.app/'
  const imgUrl = '/images/logo.png'
  const imgWidth = 1280
  const imgHeight = 640
  return (
    <Head>
      <title>{title}</title>
      <meta name='viewport' content='width=device-width,initial-scale=1.0' />
      <meta name='description' content={description} />
      <meta property='og:url' content={url} />
      <meta property='og:title' content={title} />
      <meta property='og:site_name' content={title} />
      <meta property='og:description' content={description} />
      <meta property='og:type' content='website' />
      <meta property='og:image' content={imgUrl} />
      <meta property='og:image:width' content={String(imgWidth)} />
      <meta property='og:image:height' content={String(imgHeight)} />
      <link rel='canonical' href={url} />
      <link rel='icon' href='/favicon.ico' />
    </Head>
  )
})
