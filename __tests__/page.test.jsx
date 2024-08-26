import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import React from 'react'
import Page from '../pages/page'

describe('Page', () => {
  it('renders a heading', () => {
    render(<Page />)

    // h1要素が存在するか確認
    const heading = screen.getByRole('heading', { level: 1 })

    expect(heading).toBeInTheDocument()
  })
})
