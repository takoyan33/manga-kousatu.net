import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { SiteSpoil } from './components/SiteSpoil'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof SiteSpoil> = {
  title: 'ui/SiteSpoil',
  component: SiteSpoil,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    netabare: {
      description: 'ネタバレかどうか',
    },
  },
  args: {
    netabare: 'spoil',
  },
}

export default meta
type Story = StoryObj<typeof SiteSpoil>

export const normalSiteSpoil: Story = {
  args: {
    netabare: 'spoil',
  },
}
