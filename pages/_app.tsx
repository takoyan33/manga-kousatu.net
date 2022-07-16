import Head from "next/head";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";

function MyApp({ Component, pageProps }) {
  <Head>
    <title>漫画考察.net</title>
    <meta name="description" content="漫画考察サイトです。" />
    <link rel="icon" href="/favicon.ico" />
  </Head>;
  return <Component {...pageProps} />;
}

export default MyApp;
