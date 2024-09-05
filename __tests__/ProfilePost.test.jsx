import { render, screen, fireEvent } from '@testing-library/react'
import { ProfilePost } from '../layouts/components/ui/ProfilePost'
import '@testing-library/jest-dom'

describe('A1_Component > ProfilePost', () => {
  it('[A1_4]ProfilePostのテスト', () => {
    //[A1_3_1] レンダリングされているか
    render(
      <ProfilePost
        id={1}
        profileImage='image'
        username='aaaa'
        bio='aaaa'
        favorite={['onepiece']}
      />,
    )

    //[A1_3_4] LINKをクリックできるか
    // const passwordChangeLink = screen.getByRole('link', { name: 'password-change' });
    // fireEvent.click(passwordChangeLink);
  })
})
