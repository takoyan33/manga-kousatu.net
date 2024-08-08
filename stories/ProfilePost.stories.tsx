import { ProfilePost } from './components/ProfilePost'
import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
  text: 'ProfilePost',
  component: ProfilePost,
}

const Template = (args) => <ProfilePost {...args} />

export const ProfilePostTest = Template.bind({})

ProfilePostTest.args = {
  id: 1,
  profileImage: '/images/logo.png',
  username: 'test',
  bio: 'test bio',
  favorite: ['test1', 'test2'],
}
