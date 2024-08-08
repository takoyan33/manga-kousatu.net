import { AccountMenu } from './components/AccountMenu'
import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
  text: 'AccountMenu',
  component: AccountMenu,
}

const Template = (args) => <AccountMenu {...args} />

export const AccountMenuTes = Template.bind({})

AccountMenuTes.args = {
  onClick: '',
}
