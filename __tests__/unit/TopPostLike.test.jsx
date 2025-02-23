import { render, screen } from '@testing-library/react'
import { TopPostLike } from '../../layouts/components/post/TopPostLike'
import '@testing-library/jest-dom'

jest.mock('../../layouts/api/auth/useAuth')

describe('TopPostLike Component', () => {
  const mockProps = {
    postId: '123',
    likes: ['user1', 'user2'],
    userId: 'currentUser',
  }

  it('renders like button correctly', () => {
    render(<TopPostLike {...mockProps} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('displays correct number of likes', () => {
    render(<TopPostLike {...mockProps} />)
    expect(screen.getByText('2')).toBeInTheDocument()
  })
})
