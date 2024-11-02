import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { AccountMenu } from './components/AccountMenu'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof AccountMenu> = {
  title: 'ui/AccountMenu',
  component: AccountMenu,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: { onClick: fn() },
}

export default meta
type Story = StoryObj<typeof AccountMenu>

export const normal: Story = {
  // args: {
  //   text: 'AccountMenu',
  // },
}
