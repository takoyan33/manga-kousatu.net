import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { ProfilePost } from './components/ProfilePost'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof ProfilePost> = {
  title: 'ui/ProfilePost',
  component: ProfilePost,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: { id: 1, profileImage: 'aaa' },
}

export default meta
type Story = StoryObj<typeof ProfilePost>

export const closed: Story = {}

// export const opened: Story = {
// args: {
//   open: true,
// },
//}
