import type { Meta, StoryObj } from '@storybook/react'
import { RecommendCardPost } from './components/RecommendCardPost'

const meta: Meta<typeof RecommendCardPost> = {
  title: 'ui/RecommendCardPost',
  component: RecommendCardPost,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    id: '1',
    downloadURL: '/images/book-reading.png',
    title: '太郎',
    category: '呪術廻戦',
    createdAt: '2025-01-01',
  },
}

export default meta
type Story = StoryObj<typeof RecommendCardPost>

export const normalRecommendCardPost: Story = {}

export const noImageRecommendCardPost: Story = {
  args: {
    downloadURL: '',
  },
}
