import Head from "next/head";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { textAlign } from "@mui/system";

/**
 * @jest-environment jsdom
 */

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setPageLoading(true);
    const handleComplete = () => setPageLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  let style = {
    fontSize: "20px",
    verticalAlign: "middle",
    margin: "auto",
    position: "absolute",
    top: "300px",
  };

  const loadingbg = {
    fontSize: "20px",
    position: "absolute",
    top: "0px",
    left: "0px",
    right: "0px",
    width: "100%",
    margin: "auto",
    backgroundColor: "white",
    height: "100%",
    zIndex: "200",
    textAlign: "center",
  };

  // TODO 正式なローディングコンポーネントにする
  const loadingComponent = (
    <div style={loadingbg}>
      <span style={style}>
        <ClipLoader color={"#FFBB7A"} size={80} />
      </span>
    </div>
  );

  return (
    <div>
      {pageLoading && loadingComponent}
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;
