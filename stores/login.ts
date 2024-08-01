import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface countState {
  token: string
  login: () => void
  logout: () => void
  isTokenCheck: () => void
}

const useUserStore = create(
  persist(
    (set) => ({
      token: '',
      login: () => set((state) => ({ token: state.token })),
      logout: () => set({ token: '' }),
      // isTokenCheck: () => set((state) => ({ state.token})),
    }),
    {
      name: 'token',
    },
  ),
)

export default useUserStore
