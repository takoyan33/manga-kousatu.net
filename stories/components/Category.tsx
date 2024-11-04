/* eslint-disable react/display-name */
import React from 'react'
import { SiteCategory } from './SiteCategory'

interface CategoryParams {
  category: string
}

//React.memo化
export const Category = React.memo(({ category }: CategoryParams) => {
  return (
    <div className='my-1'>
      {category === 'ONEPIECE' && (
        <SiteCategory
          className='border border-cyan-500  py-1 px-2  hover:bg-cyan-500 hover:text-white'
          text={`#${category}`}
          href={`/post/categories/${category}`}
        />
      )}
      {category === '呪術廻戦' && (
        <SiteCategory
          className='border border-purple-500  p-1 hover:bg-purple-700 hover:text-white'
          text={`#${category}`}
          href={`/post/categories/${category}`}
        />
      )}
      {category === '東京リベンジャーズ' && (
        <SiteCategory
          className=' border border-rose-500  p-1  hover:bg-rose-500 hover:text-white'
          text={`#${category}`}
          href={`/post/categories/${category}`}
        />
      )}
      {category === 'キングダム' && (
        <SiteCategory
          className='border border-yellow-500  p-1  hover:bg-yellow-500 hover:text-white'
          text={`#${category}`}
          href={`/post/categories/${category}`}
        />
      )}
    </div>
  )
})
