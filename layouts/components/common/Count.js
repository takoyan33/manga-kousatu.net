import useStore from '../../../stores/store'

const Count = () => {
  const count = useStore((state) => state.count)
  return <div>{count}</div>
}

export default Count
