import { render, screen, fireEvent } from '@testing-library/react'
import { OpenButton } from '../layouts/components/button/OpenButton'
import '@testing-library/jest-dom'

describe('A1_Component > OpenButton', () => {
  it('[A1_4]OpenButtonのテスト', () => {
    //[A1_4_1] レンダリングされているか
    render(<OpenButton text='test' />)

    //[A1_4_2] buttonをクリックできるか
    fireEvent.click(screen.getByRole('button', { name: 'open-button' }))

    //[A1_3_4] LINKをクリックできるか
    // const passwordChangeLink = screen.getByRole('link', { name: 'password-change' });
    // fireEvent.click(passwordChangeLink);
  })
})
