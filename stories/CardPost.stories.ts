import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { CardPost } from './components/CardPost'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CardPost> = {
  title: 'ui/CardPost',
  component: CardPost,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    downloadURL: '/images/book-reading.png',
    id: '1',
    likes: 10,
    title: 'タイトル',
    category: 'ボタン',
    netabare: 'ボタン',
    createTime: '2024-01-01T00:00:00.000Z',
    userid: 'ボタン',
  },
}

export default meta
type Story = StoryObj<typeof CardPost>

export const normal: Story = {}
