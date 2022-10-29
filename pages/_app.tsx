import Head from "next/head";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { textAlign } from "@mui/system";
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
