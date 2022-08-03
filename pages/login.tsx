import { app } from "../firebaseConfig.js";
import { getAuth } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { MuiNavbar } from "../layouts/components/MuiNavbar";
import Head from "next/head";
import Loginauth from "./api/auth/Loginauth";

export default function Login() {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>漫画考察.net/ログイン</title>
        <meta name="description" content="漫画考察.net" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MuiNavbar />
      <div className="max-w-7xl m-auto">
        <h2 className="m-5 my-12 text-center text-2xl font-semibold">
          ログイン
        </h2>

        <Loginauth />
      </div>
    </div>
  );
}
