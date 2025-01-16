import type { VFC } from 'react'

type CommonSelectViewProps = {} & CommonSelectProps

const CommonSelectView: VFC<CommonSelectViewProps> = (props) => {
  return null
}

type CommonSelectProps = {}

export const CommonSelect: VFC<CommonSelectProps> = (props) => {
  return <CommonSelectView {...props} />
}
