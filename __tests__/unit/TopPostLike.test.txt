import { render, screen } from '@testing-library/react'
import { TopPostLike } from '../../layouts/components/post/TopPostLike'
import '@testing-library/jest-dom'

jest.mock('../../layouts/api/auth/useAuth')

jest.mock('@lottiefiles/react-lottie-player', () => ({
  Player: () => <div data-testid='mock-lottie-player' />,
}))

jest.mock('next/router', () => ({
  useRouter: () => ({
    query: { id: 'test-post-id' },
    push: jest.fn(),
  }),
}))

describe('[A1_7] TopPostLike Component', () => {
  const mockProps = {
    postId: '123',
    likes: ['user1', 'user2'],
    userId: 'currentUser',
  }

  it('[A1_7_1] ボタンがレンダリングされているか', () => {
    render(<TopPostLike {...mockProps} />)
    expect(screen.getByRole('button')).toBeVisible()
  })

  // it('displays correct number of likes', () => {
  //   render(<TopPostLike {...mockProps} />)
  //   // expect(screen.getByText('2')).toBeVisible()
  // })
})
