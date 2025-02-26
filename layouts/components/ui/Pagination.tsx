import React from 'react'

type PaginationProps = {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) {
    return null
  }

  return (
    <div className='my-6 flex justify-center'>
      <button
        className='mx-2 rounded border px-4 py-2 disabled:opacity-50'
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
      >
        前へ
      </button>
      <span className='mx-4 text-lg'>
        {currentPage} / {totalPages}
      </span>
      <button
        className='mx-2 rounded border px-4 py-2 disabled:opacity-50'
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
      >
        次へ
      </button>
    </div>
  )
}
