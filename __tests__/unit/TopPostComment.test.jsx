import { render, fireEvent, screen } from '@testing-library/react'
import { TopPostComment } from '../../layouts/components/post/TopPostComment'
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

describe('[A1_8] TopPostComment Component', () => {
  const mockProps = {
    postId: '123',
    comments: [
      { id: '1', text: 'Test comment', username: 'test', userId: 'user1', createdAt: new Date() },
    ],
  }

  it('[A1_8_1] レンダリングされているか', () => {
    render(<TopPostComment {...mockProps} />)
    // expect(screen.getByText('コメント')).toBeVisible()
  })

  // it('displays comments correctly', () => {
  //   render(<TopPostComment {...mockProps} />)
  //   expect(screen.getByText('Test comment')).toBeVisible()
  // })
})
