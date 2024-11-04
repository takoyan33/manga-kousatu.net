import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { ProfilePost } from './components/ProfilePost'

const meta: Meta<typeof ProfilePost> = {
  title: 'ui/ProfilePost',
  component: ProfilePost,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    id: 1,
    profileImage: '/images/book-reading.png',
    username: '太郎',
    bio: 'こんにちは',
    favorite: ['a', 'b'],
  },
}

export default meta
type Story = StoryObj<typeof ProfilePost>

export const closed: Story = {}
