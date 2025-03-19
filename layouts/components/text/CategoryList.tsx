/* eslint-disable react/display-name */
import Link from 'next/link'
import React from 'react'
import { POST_CATEGORIES } from 'layouts/components/ui'

export const CategoryList = () => {
  return (
    <div className='flex flex-wrap gap-4'>
      {POST_CATEGORIES.map((category) => (
        <Link key={category.id} href={'/post/categories/' + category.title}>
          <span
            className={`inline-block rounded border px-4 py-2 text-center font-bold hover:opacity-50 ${category.className}`}
          >
            {category.title}
          </span>
        </Link>
      ))}
    </div>
  )
}
