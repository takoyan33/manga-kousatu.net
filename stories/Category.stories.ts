import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { Category } from './components/Category'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof Category> = {
  title: 'ui/Category',
  component: Category,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    category: {
      description: '漫画のカテゴリー',
    },
  },
  args: {
    category: 'ONEPIECE',
  },
}

export default meta
type Story = StoryObj<typeof Category>

export const onepieceCategory: Story = {
  args: {
    category: 'ONEPIECE',
  },
}

export const zyuzyutuCategory: Story = {
  args: {
    category: '呪術廻戦',
  },
}

export const tooribeCategory: Story = {
  args: {
    category: '東京リベンジャーズ',
  },
}

export const kingdomCategory: Story = {
  args: {
    category: 'キングダム',
  },
}
