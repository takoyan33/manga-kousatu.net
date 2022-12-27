import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { AuthProvider } from "../layouts/context/AuthContext";
import Footer from "../layouts/components/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
      <Footer />
    </AuthProvider>
  );
}

export default MyApp;
