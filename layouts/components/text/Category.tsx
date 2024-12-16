/* eslint-disable react/display-name */
import React from 'react'
import { SiteCategory } from './SiteCategory'

interface CategoryParams {
  category: 'ONEPIECE' | '呪術廻戦' | '東京リベンジャーズ' | 'キングダム'
}

// スタイルと色をマッピング
const categoryStyles: Record<CategoryParams['category'], { border: string; hover: string }> = {
  ONEPIECE: { border: 'border-cyan-500', hover: 'hover:bg-cyan-500 hover:text-white' },
  呪術廻戦: { border: 'border-purple-500', hover: 'hover:bg-purple-700 hover:text-white' },
  東京リベンジャーズ: { border: 'border-rose-500', hover: 'hover:bg-rose-500 hover:text-white' },
  キングダム: { border: 'border-yellow-500', hover: 'hover:bg-yellow-500 hover:text-white' },
}

// React.memo化
export const Category = React.memo(({ category }: CategoryParams) => {
  const { border, hover } = categoryStyles[category]

  return (
    <div className='my-1'>
      <SiteCategory
        className={`border ${border} p-1 ${hover}`}
        text={category}
        href={`/post/categories/${category}`}
      />
    </div>
  )
})
