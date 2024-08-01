import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface countState {
  count: number
  increase: () => void
  decrease: () => void
  reset: () => void
}

const useStore = create(
  persist(
    (set) => ({
      count: 1,
      increase: () => set((state) => ({ count: state.count + 1 })),
      decrease: () => set((state) => ({ count: state.count - 1 })),
      reset: () => set({ count: 0 }),
    }),
    {
      name: 'count-store',
    },
  ),
)

export default useStore
