import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'
import { TopTitle } from './components/TopTitle'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof TopTitle> = {
  title: 'ui/TopTitle',
  component: TopTitle,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    title: 'ONEPIECE',
  },
}

export default meta
type Story = StoryObj<typeof TopTitle>

export const normalTopTitle: Story = {
  args: {
    title: 'ONEPIECE',
  },
}
