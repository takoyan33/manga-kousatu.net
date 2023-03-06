import '../styles/globals.css'
import 'tailwindcss/tailwind.css'
import { Header, Footer } from '../layouts/components/ui'
import { AuthProvider } from '../layouts/context/AuthContext'

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <>
        <Header />
        <div className='max-w-5xl m-auto mt-10'>
          <Component {...pageProps} />
        </div>
        <Footer />
      </>
    </AuthProvider>
  )
}

export default MyApp
