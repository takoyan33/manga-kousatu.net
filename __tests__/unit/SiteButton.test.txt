import { render, screen, fireEvent, userEvent } from '@testing-library/react'
import { SiteButton } from '../../layouts/components/button/SiteButton'
import '@testing-library/jest-dom'

describe('A1_Component > SiteButton', () => {
  it('[A1_10_1] レンダリングされているか', () => {
    render(<SiteButton text='test' />)
  })
  it('[A1_10_2] buttonをクリックできるか', () => {
    render(<SiteButton text='test' />)
    fireEvent.click(screen.getByRole('button', { name: 'site-button' }))
  })

  it('[A1_10_3] SiteButtonのスナップショット', () => {
    const { container } = render(<SiteButton text='test' />)
    expect(container).toMatchSnapshot()
  })

  //[A1_3_4] LINKをクリックできるか
  // const passwordChangeLink = screen.getByRole('link', { name: 'password-change' });
  // fireEvent.click(passwordChangeLink);
})
