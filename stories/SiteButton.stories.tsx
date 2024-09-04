import { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'
import { SiteButton } from './components/SiteButton'

export default {
  text: 'SiteButton',
  component: SiteButton,
}

const Template = (args) => <SiteButton {...args} />

export const SiteButtonDisabled = Template.bind({})
SiteButtonDisabled.args = {
  href: 'string',
  onClick: '',
  text: 'ボタン',
  className: 'string',
  disabled: true,
}

export const SiteButtonEnabled = Template.bind({})
SiteButtonEnabled.args = {
  href: 'string',
  onClick: '',
  text: 'ボタン',
  className: 'string',
  disabled: false,
}
