import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import Footer from "../layouts/components/Footer";

function MyApp({ Component, pageProps }) {
  return (
    <div>
      <Component {...pageProps} />
      <Footer />
    </div>
  );
}

export default MyApp;
