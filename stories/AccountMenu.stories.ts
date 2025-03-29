import { expect } from '@storybook/jest'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { userEvent, within } from '@storybook/testing-library'

import { AccountMenu } from './components/AccountMenu'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof AccountMenu> = {
  title: 'ui/AccountMenu',
  component: AccountMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    onClick: {
      description: 'クリック時に呼び出されるイベントハンドラー',
      action: 'clicked',
    },
  },
  args: { onClick: fn() },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // タイトルが表示されているかチェック
    expect(canvas.getByText('アカウントメニュー')).toBeVisible()
    expect(canvas.getByText('プロフィールを変更する')).toBeVisible()

    // // リンクが正しく設定されているかチェック
    const link = canvas.getByRole('link', { name: 'プロフィールを変更する' })
    expect(link).toHaveAttribute('href', '/profile/edit')
    expect(link).toBeEnabled()

    // ユーザー操作のシミュレーション（例: クリック）
    await userEvent.click(link)
  },
}

export default meta
type Story = StoryObj<typeof AccountMenu>

export const normalAccountMenu: Story = {}
