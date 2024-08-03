import useStore from '../stores/store'
import Count from '../layouts/components/ui/Count'

function App() {
  const { count } = useStore()
  const increase = useStore((state) => state.increase)
  const decrease = useStore((state) => state.decrease)
  return (
    <div style={{ textAlign: 'center', margin: '1em' }}>
      <h1>Count</h1>
      <div>{count}</div>
      <Count />
      <div>
        <button onClick={() => increase()}>+</button>
        <button onClick={() => decrease()}>-</button>
      </div>
    </div>
  )
}

export default App
