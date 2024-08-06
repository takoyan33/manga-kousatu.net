import { ProfilePost } from './ProfilePost'
import React from 'react'
import { ComponentStory, ComponentMeta } from '@storybook/react'

export default {
  text: 'ProfilePost',
  component: ProfilePost,
}

const Template = (args) => <ProfilePost {...args} />

export const Test = Template.bind({})
Test.args = {
  id: 1,
  profileImage: 'https://example.com',
  username: 'test',
  bio: 'test bio',
  favorite: ['test1', 'test2'],
}
