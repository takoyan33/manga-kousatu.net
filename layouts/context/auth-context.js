'use client'

import { createContext, useState, useContext, useEffect } from 'react'
import { auth } from '../../firebaseConfig'

const AuthContext = createContext(null)

export function useAuthContext() {
  return useContext(AuthContext)
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState('')
  const [loading, setLoading] = useState(true)

  const value = {
    user,
    loading,
  }

  useEffect(() => {
    const unsubscribed = auth.onAuthStateChanged((user) => {
      setUser(user)
      setLoading(false)
    })
    return () => {
      unsubscribed()
    }
  }, [children])

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}
