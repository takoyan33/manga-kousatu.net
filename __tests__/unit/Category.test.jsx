import { render, screen, fireEvent, userEvent } from '@testing-library/react'
import { Category } from '../../layouts/components/text/Category'
import '@testing-library/jest-dom'

describe('A1_Component > Category', () => {
  it('[A1_6_1] レンダリングされているか', () => {
    render(<Category category='ワンピース' />)
  })
  // it('[A1_6_2] buttonをクリックできるか', () => {
  //   render(<Category text='test' />)
  //   fireEvent.click(screen.getByRole('button', { name: 'open-button' }))
  // })

  //[A1_3_4] LINKをクリックできるか
  // const passwordChangeLink = screen.getByRole('link', { name: 'password-change' });
  // fireEvent.click(passwordChangeLink);
})
