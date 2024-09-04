import { ComponentStory, ComponentMeta } from '@storybook/react'
import React from 'react'
import { NotificationModal } from './components/NotificationModal'

export default {
  text: 'NotificationModal',
  component: NotificationModal,
}

const Template = (args) => <NotificationModal {...args} />

export const NotificationModalTes = Template.bind({})

NotificationModalTes.args = {
  open: true,
  handleClose: '',
}
