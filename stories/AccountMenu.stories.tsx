import { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'
import { AccountMenu } from './components/AccountMenu'

export default {
  text: 'AccountMenu',
  component: AccountMenu,
}

const Template = (args) => <AccountMenu {...args} />

export const AccountMenuTes = Template.bind({})

AccountMenuTes.args = {
  onClick: '',
}
