import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { Header, Footer } from '../layouts/components/ui'
import { AuthProvider } from '../layouts/context/AuthContext'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <>
        <Header />
        <div className='m-auto mt-10 max-w-5xl'>
          <Component {...pageProps} />
        </div>
        <Footer />
      </>
    </AuthProvider>
  )
}

export default MyApp
