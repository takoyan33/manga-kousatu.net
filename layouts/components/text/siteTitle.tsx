/* eslint-disable react/display-name */
import React from 'react'
import { SiteCategory } from './SiteCategory'

interface TitleParams {
  title: string
}

//React.memo化
export const siteTitle: React.VFC<TitleParams> = React.memo(({ title }) => {
  return <div className='my-1'>{title}</div>
})
