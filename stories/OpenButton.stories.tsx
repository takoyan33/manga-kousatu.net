import { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'
import { OpenButton } from './components/OpenButton'

export default {
  text: 'OpenButton',
  component: OpenButton,
}

const Template = (args) => <OpenButton {...args} />

export const AccountMenuTes = Template.bind({})

AccountMenuTes.args = {
  text: 'test',
}
