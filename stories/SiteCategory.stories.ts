import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { SiteCategory } from './components/SiteCategory'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof SiteCategory> = {
  title: 'ui/SiteCategory',
  component: SiteCategory,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {
    text: '呪術廻戦',
    href: '/aa/',
    className: 'border border-cyan-500 py-1 px-2 hover:bg-cyan-500 hover:text-white',
  },
}

export default meta
type Story = StoryObj<typeof SiteCategory>

export const onepieceSiteCategory: Story = {
  args: {
    text: 'ONEPIECE',
    className: 'border border-cyan-500 py-1 px-2 hover:bg-cyan-500 hover:text-white',
  },
}

export const zyuzyutuSiteCategory: Story = {
  args: {
    text: '呪術廻戦',
    className: 'border border-purple-500  p-1 hover:bg-purple-700 hover:text-white',
  },
}

export const tooribeSiteCategory: Story = {
  args: {
    text: '東京リベンジャーズ',
    className: 'border border-rose-500  p-1  hover:bg-rose-500 hover:text-white',
  },
}

export const kingdomSiteCategory: Story = {
  args: {
    text: 'キングダム',
    className: 'border border-yellow-500  p-1  hover:bg-yellow-500 hover:text-white',
  },
}
