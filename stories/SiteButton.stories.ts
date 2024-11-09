import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { SiteButton } from './components/SiteButton'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof SiteButton> = {
  title: 'ui/SiteButton',
  component: SiteButton,
  // parameters: {
  //   layout: 'centered',
  // },
  tags: ['autodocs'],
  argTypes: {},
  args: { onClick: fn() },
}

export default meta
type Story = StoryObj<typeof SiteButton>

export const outlinedButton: Story = {}
export const containedButton: Story = {
  args: {
    varient: 'contained',
  },
}
export const disabledButton: Story = {
  args: {
    disabled: true,
  },
}
export const centerOutlinedButton: Story = {
  args: {
    className: 'text-center',
  },
}

export const googleContainedButton: Story = {
  args: {
    google: true,
  },
}
