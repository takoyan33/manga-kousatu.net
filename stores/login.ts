import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface UserState {
  token: string
  login: (token: string) => void
  logout: () => void
  isTokenCheck: () => boolean
}

const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      token: '',
      login: (token: string) => set({ token }),
      logout: () => set({ token: '' }),
      isTokenCheck: () => !!get().token,
    }),
    {
      name: 'user-token', // localStorageのkey名
    },
  ),
)

export default useUserStore
