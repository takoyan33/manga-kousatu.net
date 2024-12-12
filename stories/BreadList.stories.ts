import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { Breadcrumbs } from './components/Breadcrumbs'

const meta: Meta<typeof Breadcrumbs> = {
  title: 'ui/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    secondTitle: 'About',
  },
}

export default meta
type Story = StoryObj<typeof Breadcrumbs>

export const normalBreadcrumbs: Story = {}
