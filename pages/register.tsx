import { app } from "../firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { MuiNavbar } from "../layouts/components/MuiNavbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Head from "next/head";
import Link from "next/link";

export default function Register() {
  const auth = getAuth();
  const router = useRouter();
  const googleProvider = new GoogleAuthProvider();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const SignUp = () => {
    let checkSaveFlg = window.confirm("この内容で登録しても大丈夫ですか？");

    if (checkSaveFlg) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((response: any) => {
          sessionStorage.setItem("Token", response.user.accessToken);
          console.log(response.user.accessToken);
          router.push("/home");
        })
        .catch((err) => {
          alert("emailが既にあります");
        });
    } else {
    }
  };

  const SignUpWithGoogle = () => {
    signInWithPopup(auth, googleProvider).then((response: any) => {
      console.log(response.user);
      sessionStorage.setItem("Token", response.user.accessToken);
      router.push("/home");
    });
  };

  useEffect(() => {
    let token = sessionStorage.getItem("Token");

    if (token) {
      router.push("/home");
    }
  }, []);

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

        <Box
          component="form"
          className="flex justify-center max-w-7xl "
          noValidate
          autoComplete="off"
        >
          <div>
            <label className="text-center my-4">メールアドレス*</label>
            <br></br>
            <TextField
              id="outlined-basic"
              label="sample@gmail.com"
              className="m-auto w-80"
              variant="outlined"
              onChange={(event) => setEmail(event.target.value)}
            />
            <br></br>
            <br></br>

            <label className="text-center my-4">パスワード（8文字以上)*</label>
            <br></br>
            <TextField
              id="outlined-basic"
              label="Password"
              type="password"
              variant="outlined"
              className="m-auto w-80"
              onChange={(event) => setPassword(event.target.value)}
            />
            <br></br>
            <br></br>

            <label className="text-center my-4">
              確認用パスワード（8文字以上)*
            </label>
            <br></br>
            <TextField
              id="outlined-basic"
              label="Password"
              type="password"
              variant="outlined"
              className="m-auto w-80"
              onChange={(event) => setPassword(event.target.value)}
            />
            <br></br>
            <br></br>
            <Button
              variant="outlined"
              onClick={SignUp}
              className="m-auto w-80 my-8"
            >
              新規登録
            </Button>
            <br></br>
            <br></br>
            <Button
              variant="outlined"
              onClick={SignUpWithGoogle}
              className="m-auto w-80 "
            >
              Googleで新規登録
            </Button>
            <br></br>
            <br></br>
            <Button variant="outlined" className="m-auto w-80 my-8">
              <Link href="/login">ログインはこちら</Link>
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
}
