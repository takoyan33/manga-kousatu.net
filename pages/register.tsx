import { useRouter } from "next/router";
import { MuiNavbar } from "../packages/components/MuiNavbar";
import Head from "next/head";
import SignUp from "./api/auth/SignUp";

export default function Register() {
  const router = useRouter();

  return (
    <div>
      <Head>
        <title>漫画考察.net/新規登録</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MuiNavbar />

      <div className="max-w-7xl m-auto">
        <h2 className="m-5 my-12 text-center text-2xl font-semibold">
          新規登録
        </h2>
        <SignUp />
      </div>
    </div>
  );
}
