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
          className='inline-block rounded-xl border  border-cyan-500 p-1 text-center  font-bold text-cyan-500 hover:bg-cyan-700 hover:text-white'
          text='ONE PIECE'
          href={`/post/categories/${category}`}
        />
      )}
      {category === '呪術廻戦' && (
        <SiteCategory
          className='inline-block rounded-xl border  border-purple-500 p-1 text-center  font-bold text-purple-500 hover:bg-purple-700 hover:text-white'
          text='呪術廻戦'
          href={`/post/categories/${category}`}
        />
      )}
      {category === '東京リベンジャーズ' && (
        <SiteCategory
          className='inline-block rounded-xl border  border-rose-500 p-1 text-center  font-bold text-rose-500 hover:bg-rose-700 hover:text-white'
          text='東京リベンジャーズ'
          href={`/post/categories/${category}`}
        />
      )}
      {category === 'キングダム' && (
        <SiteCategory
          className='inline-block rounded-xl border  border-yellow-500 p-1 text-center  font-bold text-yellow-500 hover:bg-yellow-700 hover:text-white'
          text='キングダム'
          href={`/post/categories/${category}`}
        />
      )}
    </div>
  )
})

export default Category
