import Head from "next/head";
import Link from "next/link";
import styles from "../styles/Home.module.css";
import Button from "@mui/material/Button";
import * as React from "react";
import Stack from "@mui/material/Stack";
import { MuiNavbar } from "../layouts/MuiNavbar";
import { useEffect, useState } from "react";
import { app, database } from "../firebaseConfig";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";

export default function Index() {
  let router = useRouter();

  const auth = getAuth();
  const user = auth.currentUser;
  console.log(user);
  useEffect(() => {
    let token = sessionStorage.getItem("Token");

    if (token) {
      router.push("/home");
    }
    if (!token) {
    }
  }, []);

  return (
    <div className={styles.container}>
      <Head>
        <title>漫画考察.net</title>
        <meta name="description" content="漫画考察.net" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@500&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MuiNavbar />
      <div className="max-w-7xl m-auto">
        <br></br>
        <br></br>
        <p className="text-center">
          <img src="./images/book-reading.png" className="w-40 m-auto my-6" />
        </p>
        <h2 className="m-5 text-2xl font-semibold text-center">漫画考察.net</h2>
        <p className="m-5 text-center">
          漫画考察.netでは、漫画の考察などを自由に投稿・閲覧できるwebサイトです。
        </p>
        <br></br>
        <Stack className="text-center m-auto w-full ">
          <button className=" text-center m-auto my-2 border-solid  hover:border-dotted">
            <Link href="/register" className=" text-center m-auto my-2">
              新規登録はこちら
            </Link>
          </button>
          <button className=" text-center m-auto  my-2 ">
            <Link
              href="/login"
              className=" text-center m-auto my-2 border-solid  hover:border-dotted"
            >
              ログインはこちら
            </Link>
          </button>
        </Stack>
      </div>
    </div>
  );
}
