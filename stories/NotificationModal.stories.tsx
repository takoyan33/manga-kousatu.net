import { NotificationModal } from './components/NotificationModal'
import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

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
