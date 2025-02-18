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
  argTypes: {
    secondTitle: {
      description: '２階層のタイトル',
    },
    secondUrl: {
      description: '２階層のUrl',
    },
    thirdTitle: {
      description: '3階層のタイトル',
    },
    thirdUrl: {
      description: '3階層のUrl',
    },
  },
  args: {
    secondTitle: 'About',
  },
}

export default meta
type Story = StoryObj<typeof Breadcrumbs>

export const secondBreadcrumbs: Story = {}

export const thridBreadcrumbs: Story = {
  args: {
    thirdTitle: '呪術廻戦',
    thirdUrl: 'test',
  },
}
