import type { Meta, StoryObj } from '@storybook/react'
import { ProfilePost } from './components/ProfilePost'

const meta: Meta<typeof ProfilePost> = {
  title: 'ui/ProfilePost',
  component: ProfilePost,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    id: {
      description: '記事ID',
    },
    profileImage: {
      description: 'プロフィール画像',
    },
    username: {
      description: 'ユーザー名',
    },
    bio: {
      description: '自己紹介',
    },
    favorite: {
      description: 'お気に入りの漫画',
    },
  },
  args: {
    id: 1,
    profileImage: '/images/book-reading.png',
    username: '太郎',
    bio: 'こんにちは',
    favorite: ['ワンピース', 'ナルト'],
  },
}

export default meta
type Story = StoryObj<typeof ProfilePost>

export const normalProfilePost: Story = {}

export const noImageProfilePost: Story = {
  args: {
    profileImage: '',
  },
}
