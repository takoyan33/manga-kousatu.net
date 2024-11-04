import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { SiteLabel } from './components/SiteLabel'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof SiteLabel> = {
  title: 'ui/SiteLabel',
  component: SiteLabel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: { name: 'ラベル', required: false, htmlFor: 'label' },
}

export default meta
type Story = StoryObj<typeof SiteLabel>

export const normal: Story = {
  args: {
    required: false,
  },
}

export const required: Story = {
  args: {
    required: true,
  },
}
