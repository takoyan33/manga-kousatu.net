import { render, screen, fireEvent } from '@testing-library/react'
import { AccountMenu } from '../layouts/components/ui/AccountMenu'
import '@testing-library/jest-dom'

describe('A1_Component > AccountMenu', () => {
  it('[A1_3]AccountMenuのテスト', () => {
    //[A1_3_1] レンダリングされているか
    render(<AccountMenu />)

    //[A1_3_2] パスワードを変更するの文字があるか
    expect(screen.getByText('パスワードを変更する'))

    //[A1_3_3] buttonをクリックできるか
    fireEvent.click(screen.getByRole('button', { name: 'account-delete' }))

    //[A1_3_4] LINKをクリックできるか
    // const passwordChangeLink = screen.getByRole('link', { name: 'password-change' });
    // fireEvent.click(passwordChangeLink);
  })
})
