import { expect } from '@storybook/jest'
import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { userEvent, within } from '@storybook/testing-library'

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
    createdAt: {
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
    createdAt: '2024-01-01T00:00:00.000Z',
    userid: 'ボタン',
  },
}

export default meta
type Story = StoryObj<typeof CardPost>

export const normalCardPost: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // タイトルが表示されているかチェック
    expect(canvas.getByText('タイトル')).toBeVisible()

    // いいねの数が表示されているか
    expect(canvas.getByText('10')).toBeVisible()

    // ユーザー名が表示されているか
    expect(canvas.getByText('ユーザー名未設定')).toBeVisible()

    // カテゴリが表示されているか
    expect(canvas.getByText('#呪術廻戦')).toBeVisible()

    // ネタバレタグが表示されているか
    expect(canvas.getByText('ネタバレ有')).toBeVisible()

    // 投稿日が表示されているか
    expect(canvas.getByText('453日前')).toBeVisible()

    // アバター画像が表示されているか
    const avatar = canvas.getByAltText('投稿者プロフィール画像')
    expect(avatar).toBeVisible()
  },
}

export const noImageCardPost: Story = {
  args: {
    downloadURL: '',
  },
}
