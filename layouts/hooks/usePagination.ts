import { useMemo } from 'react'
import { GetPost } from 'types/post'

type UsePaginationProps = {
  posts: GetPost[]
  currentPage: number
  postsPerPage: number
  sortType?: 'new' | 'recommend' | 'all'
  searchQuery?: string
}

export const usePagination = ({
  posts,
  currentPage,
  postsPerPage,
  sortType = 'all',
  searchQuery = '',
}: UsePaginationProps) => {
  const filteredAndSortedPosts = useMemo(() => {
    let result = [...posts]

    // 検索フィルター
    if (searchQuery) {
      result = result.filter((post) => post.title.toLowerCase().includes(searchQuery.toLowerCase()))
    }

    // ソート
    switch (sortType) {
      case 'new':
        return result.sort(
          (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
      case 'recommend':
        return result
      default:
        return result
    }
  }, [posts, sortType, searchQuery])

  const totalPages = Math.ceil(filteredAndSortedPosts.length / postsPerPage)

  const paginatedPosts = useMemo(() => {
    const startIndex = (currentPage - 1) * postsPerPage
    return filteredAndSortedPosts.slice(startIndex, startIndex + postsPerPage)
  }, [filteredAndSortedPosts, currentPage, postsPerPage])

  return {
    paginatedPosts,
    totalPages,
    totalPosts: filteredAndSortedPosts.length,
  }
}
