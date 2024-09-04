import { render, screen } from '@testing-library/react'
import { AccountMenu } from '../layouts/components/ui/AccountMenu'
import '@testing-library/jest-dom'

describe('A1_Component > AccountMenu', () => {
  it('[A1_3]Headerのテスト', () => {
    //[A1_2_3] レンダリングされているか
    render(<AccountMenu />)
  })
})
