import Head from 'next/head'
import React from 'react'

// 定数の定義
const DEFAULT_META = {
  description: 'Manga Studyでは、漫画の考察などを自由に投稿・閲覧できる web サイトです。',
  url: 'https://manga-kousatu-net.vercel.app/',
  imgUrl: '/images/logo.png',
  imgWidth: 1280,
  imgHeight: 640,
} as const

interface HeadProps {
  title: string
  isNoIndex?: boolean
  description?: string
  url?: string
  imgUrl?: string
  imgWidth?: number
  imgHeight?: number
}

/**
 * 共通のヘッドコンポーネント
 * @param title - ページタイトル
 * @param isNoIndex - インデックスを禁止するかどうか
 * @param description - ページの説明
 * @param url - ページのURL
 * @param imgUrl - OGP画像のURL
 * @param imgWidth - OGP画像の幅
 * @param imgHeight - OGP画像の高さ
 */
export const CommonHead = React.memo(
  ({
    title,
    isNoIndex = false,
    description = DEFAULT_META.description,
    url = DEFAULT_META.url,
    imgUrl = DEFAULT_META.imgUrl,
    imgWidth = DEFAULT_META.imgWidth,
    imgHeight = DEFAULT_META.imgHeight,
  }: HeadProps) => {
    return (
      <Head>
        <title>{title}</title>
        {isNoIndex && <meta name='robots' content='noindex' />}
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
  },
)

CommonHead.displayName = 'CommonHead'
