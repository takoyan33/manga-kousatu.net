import 'styles/globals.css'
import 'tailwindcss/tailwind.css'
import { Header, Footer } from 'layouts/components/ui'
import { AuthProvider } from 'layouts/context/auth-context'

export default function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      {/* <head> */}
      {/* <script src='https://unpkg.com/react-scan/dist/auto.global.js' /> */}
      {/* </head> */}
      {/* <ReactScan /> */}
      <Header />
      <div className='m-auto mt-10 max-w-5xl'>
        <Component {...pageProps} />
      </div>
      <Footer />
    </AuthProvider>
  )
}
