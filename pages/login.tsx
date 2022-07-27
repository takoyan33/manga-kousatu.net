import { app } from "../firebaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { MuiNavbar } from "../layouts/components/MuiNavbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Head from "next/head";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import Loginauth from "./api/auth/Loginauth";

export default function Login() {
  const router = useRouter();

  // useEffect(() => {
  //   let token = sessionStorage.getItem("Token");

  //   if (token) {
  //     router.push("/home");
  //   }
  // }, []);

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
