import React from "react";
import { MuiNavbar } from "../layouts/MuiNavbar";
import Head from "next/head";

function Draft() {
  return (
    <div>
      <Head>
        <title>漫画考察.net/About</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MuiNavbar />
      <div className="max-w-7xl m-auto">
        <h2 className="m-5 my-12 text-center text-2xl font-semibold">About</h2>
        <p>
          漫画考察.netでは、漫画の考察などを自由に投稿・閲覧できるwebサイトです。
        </p>
        <br></br>
        <ul>
          <li>運営者　　　　　阿部　舜平</li>
          <li> メールアドレス　harrier2070@gmail.com</li>
        </ul>
      </div>
    </div>
  );
}

export default Draft;
