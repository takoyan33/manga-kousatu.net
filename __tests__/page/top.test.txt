import { render, screen, fireEvent } from '@testing-library/react'
import Top from '../../pages/top/index'
import '@testing-library/jest-dom'

describe('A2_Page > Top', () => {
  it('[A2_1_1]レンダリングされているか', () => {
    render(<Top />)
  })
})
