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

export default function Login() {
  const auth = getAuth();
  const router = useRouter();
  const googleProvider = new GoogleAuthProvider();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const SignUp = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((response:any) => {
        sessionStorage.setItem("Token", response.user.accessToken);
        console.log(response.user);
        router.push("/home");
      })
      .catch((err) => {
        alert("ログインできません");
      });
  };

  const SignUpWithGoogle = () => {
    signInWithPopup(auth, googleProvider).then((response:any) => {
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
        <title>漫画考察.net/ログイン</title>
        <meta name="description" content="漫画考察.net" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MuiNavbar />
      <div className="max-w-7xl m-auto">
        <h2 className="m-5 my-12 text-center text-2xl font-semibold">
          ログイン
        </h2>

        <Box
          component="form"
          className="flex justify-center max-w-7xl "
          noValidate
          autoComplete="off"
        >
          <div>
            <label className="text-center my-4">
              {/* <FontAwesomeIcon icon={faEnvelope} className="w-2" /> */}
              メールアドレス*
            </label>
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
            <br></br>
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
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
              ログイン
            </Button>
            <br></br>
            <br></br>
            <Button
              variant="outlined"
              onClick={SignUpWithGoogle}
              className="m-auto w-80"
            >
              Googleでログイン
            </Button>
          </div>
        </Box>
      </div>
    </div>
  );
}
