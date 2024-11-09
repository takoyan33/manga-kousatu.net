import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { Footer } from './components/Footer'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Footer> = {
  title: 'ui/Footer',
  component: Footer,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: { onClick: fn() },
}

export default meta
type Story = StoryObj<typeof Footer>

export const normalFooter: Story = {}
