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
  argTypes: {
    downloadURL: {
      description: 'サムネイル',
    },
    id: {
      description: '記事ID',
    },
    likes: {
      description: 'いいね数',
    },
    title: {
      description: 'タイトル',
    },
    category: {
      description: '漫画のカテゴリー',
    },
    netabare: {
      description: 'ネタバレがあるか',
    },
    createTime: {
      description: '投稿時間',
    },
    userid: {
      description: '投稿者のID',
    },
  },
  args: {
    downloadURL: '/images/book-reading.png',
    id: '1',
    likes: 10,
    title: 'タイトル',
    category: '呪術廻戦',
    netabare: 'spoil',
    createTime: '2024-01-01T00:00:00.000Z',
    userid: 'ボタン',
  },
}

export default meta
type Story = StoryObj<typeof CardPost>

export const normalCardPost: Story = {}

export const noImageCardPost: Story = {
  args: {
    downloadURL: '',
  },
}
