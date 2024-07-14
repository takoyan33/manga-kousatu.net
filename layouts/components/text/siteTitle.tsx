/* eslint-disable react/display-name */
import React from 'react'
import { SiteCategory } from './SiteCategory'

interface CategoryParams {
  title: string
}

//React.memo化
const siteTitle: React.VFC<CategoryParams> = React.memo(({ title }) => {
  return (
    <div className='my-1'>
      
    </div>
  )
})

export default siteTitle
