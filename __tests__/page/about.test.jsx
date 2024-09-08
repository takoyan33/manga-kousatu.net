import { render, screen, fireEvent } from '@testing-library/react'
import About from '../../pages/about/index'
import '@testing-library/jest-dom'

describe('A2_Page > About', () => {
  it('[A2_1_1]レンダリングされているか', () => {
    render(<About />)
  })
})
