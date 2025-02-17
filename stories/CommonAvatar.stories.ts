import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import CommonAvatar from './components/CommonAvatar'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof CommonAvatar> = {
  title: 'ui/CommonAvatar',
  component: CommonAvatar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    displayname: {
      description: 'ユーザー名',
    },
  },
  args: {
    displayname: 'ONEPIECE',
  },
}

export default meta
type Story = StoryObj<typeof CommonAvatar>

export const normalTopTitle: Story = {
  args: {
    displayname: 'ONEPIECE',
  },
}
