/* eslint-disable react/display-name */
import React from 'react'
import { SiteCategory } from './SiteCategory'

interface CategoryParams {
  category: string
}

//React.memo化
const Category: React.VFC<CategoryParams> = React.memo(({ category }) => {
  return (
    <div className='my-1'>
      {category === 'ONEPIECE' && (
        <SiteCategory
          className='inline-block rounded border border-cyan-500  py-1 px-2 text-center  text-sm  font-bold hover:bg-cyan-500 hover:text-white'
          text={`#${category}`}
          href={`/post/categories/${category}`}
        />
      )}
      {category === '呪術廻戦' && (
        <SiteCategory
          className='inline-block rounded border border-purple-500  p-1 text-center text-sm  font-bold hover:bg-purple-700 hover:text-white'
          text={`#${category}`}
          href={`/post/categories/${category}`}
        />
      )}
      {category === '東京リベンジャーズ' && (
        <SiteCategory
          className='inline-block rounded border border-rose-500  p-1 text-center text-sm  font-bold hover:bg-rose-500 hover:text-white'
          text={`#${category}`}
          href={`/post/categories/${category}`}
        />
      )}
      {category === 'キングダム' && (
        <SiteCategory
          className='inline-block rounded border border-yellow-500  p-1 text-center text-sm  font-bold hover:bg-yellow-500 hover:text-white'
          text={`#${category}`}
          href={`/post/categories/${category}`}
        />
      )}
    </div>
  )
})

export default Category
