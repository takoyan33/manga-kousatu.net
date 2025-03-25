import { expect } from '@storybook/jest'
import type { Meta, StoryObj } from '@storybook/react'
import { userEvent, within } from '@storybook/testing-library'
import { Breadcrumbs } from './components/Breadcrumbs'

const meta: Meta<typeof Breadcrumbs> = {
  title: 'ui/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    secondTitle: {
      description: '２階層のタイトル',
    },
    secondUrl: {
      description: '２階層のUrl',
    },
    thirdTitle: {
      description: '3階層のタイトル',
    },
    thirdUrl: {
      description: '3階層のUrl',
    },
  },
  args: {
    secondTitle: 'About',
  },
}

export default meta
type Story = StoryObj<typeof Breadcrumbs>

export const secondBreadcrumbs: Story = {}

export const thirdBreadcrumbs: Story = {
  args: {
    thirdTitle: '呪術廻戦',
    thirdUrl: 'test',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // タイトルが表示されているかチェック
    expect(canvas.getByText('呪術廻戦')).toBeInTheDocument()

    // リンクが正しく設定されているかチェック
    const link = canvas.getByRole('link', { name: '呪術廻戦' })
    expect(link).toHaveAttribute('href', '/test')

    // ユーザー操作のシミュレーション（例: クリック）
    await userEvent.click(link)
  },
}
