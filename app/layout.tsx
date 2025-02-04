'use client'

import 'styles/globals.css'
import 'tailwindcss/tailwind.css'
import type React from 'react'
import { Header, Footer } from 'layouts/components/ui'
import { AuthProvider } from 'layouts/context/AuthContext'

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    // <AuthProvider>
    <html lang='ja'>
      <body>
        <Header />
        <div className='m-auto mt-10 max-w-5xl'>{children}</div>
        <Footer />
      </body>
    </html>
    // </AuthProvider>
  )
}

export default RootLayout
