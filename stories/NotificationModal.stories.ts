import type { Meta, StoryObj } from '@storybook/react'
import { fn } from '@storybook/test'

import { NotificationModal } from './components/NotificationModal'

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta: Meta<typeof NotificationModal> = {
  title: 'ui/NotificationModal',
  component: NotificationModal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: { open: false, handleClose: fn() },
}

export default meta
type Story = StoryObj<typeof NotificationModal>

export const closedNotificationModal: Story = {}

// export const opened: Story = {
// args: {
//   open: true,
// },
//}
