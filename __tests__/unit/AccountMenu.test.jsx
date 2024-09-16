import { render, screen, fireEvent } from '@testing-library/react'
import { AccountMenu } from '../../layouts/components/ui/AccountMenu'
import '@testing-library/jest-dom'

describe('A1_Component > AccountMenu', () => {
  it('[A1_3_1]レンダリングされているか', () => {
    const testFunction = jest.fn()
    render(<AccountMenu onClick={testFunction} />)
  })

  it('[A1_3_2]パスワードを変更するの文字があるか', () => {
    const testFunction = jest.fn()
    render(<AccountMenu onClick={testFunction} />)
    expect(screen.getByText('パスワードを変更する'))
  })

  it('[A1_3_3]buttonをクリックできるか', () => {
    const testFunction = jest.fn()
    render(<AccountMenu onClick={testFunction} />)

    // ボタンをクリック
    const button = screen.getByRole('button', { name: 'account-delete' })
    fireEvent.click(button)

    // testFunction が呼び出されたことを確認
    expect(testFunction).toHaveBeenCalledTimes(1)

    // testFunction に渡された引数を確認
    expect(testFunction).toHaveBeenCalledWith(expect.any(Object))
  })

  it('[A1_3_4] スナップショット', () => {
    const testFunction = jest.fn()
    const { container } = render(<AccountMenu onClick={testFunction} />)
    expect(container).toMatchSnapshot()
  })
})
