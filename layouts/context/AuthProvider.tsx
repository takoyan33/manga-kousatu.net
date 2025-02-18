import { ReactNode } from 'react'
import AuthProviderClient from './AuthProviderClient'

export function AuthProvider({ children }: { children: ReactNode }) {
  return <AuthProviderClient>{children}</AuthProviderClient>
}
