import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { AuthProvider } from "../layouts/context/AuthContext";
import Footer from "../layouts/components/ui/Footer";
import { MuiNavbar } from "../layouts/components";

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <MuiNavbar />
      <div className="max-w-5xl m-auto mt-10">
        <Component {...pageProps} />
      </div>
      <Footer />
    </AuthProvider>
  );
}

export default MyApp;
