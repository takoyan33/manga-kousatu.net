import Head from "next/head";
import "../styles/globals.css";
import "tailwindcss/tailwind.css";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { textAlign } from "@mui/system";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [pageLoading, setPageLoading] = useState(false);

  useEffect(() => {
    const handleStart = (url) => url !== router.asPath && setPageLoading(true); //urlはbasepathが入る
    const handleComplete = () => setPageLoading(false);
    //読み込み完了するとローディングがfalseになる

    router.events.on("routeChangeStart", handleStart);
    //ページ移動すると発火する　 ルーティング開始はrouteChangeStart
    router.events.on("routeChangeComplete", handleComplete);
    //ページ移動すると発火する　 完了はrouteChangeComplete
    router.events.on("routeChangeError", handleComplete);
    //ページ移動すると発火する　 エラー時はrouteChangeError

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  const style: React.CSSProperties = {
    fontSize: "20px",
    // display: "table-cell",
    verticalAlign: "middle",
    margin: "auto",
    position: "absolute",
    top: "300px",
  };

  const loadingbg: React.CSSProperties = {
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
    // display: "table",
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
