import { render, screen } from '@testing-library/react'
import { Breadcrumbs } from '../../layouts/components/layout/Breadcrumbs'
import '@testing-library/jest-dom'

describe('[A1_9] Breadcrumbs Component', () => {
  it('全てのリンクが遷移できるか', () => {
    render(<Breadcrumbs secondTitle='ONEPIECE' />)
    expect(screen.getByText('ONEPIECE')).toBeInTheDocument()
  })
})
