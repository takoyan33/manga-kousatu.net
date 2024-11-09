import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { OpenButton } from './components/OpenButton'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof OpenButton> = {
  title: 'ui/OpenButton',
  component: OpenButton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: { text: 'ボタン', onClick: fn() },
}

export default meta
type Story = StoryObj<typeof OpenButton>

export const normalOpenButton: Story = {}
