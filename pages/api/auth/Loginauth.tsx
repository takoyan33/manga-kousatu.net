import { app } from "../../../firebaseConfig";
import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";

export default function Loginauth() {
  const auth = getAuth();
  const router = useRouter();
  const googleProvider = new GoogleAuthProvider();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const SignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        router.push("/home");
      })
      .catch((err) => {
        alert("ログインできません");
      });
  };

  const SignInWithGoogle = () => {
    signInWithPopup(auth, googleProvider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      router.push("/home");
    });
  };

  return (
    <>
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
            onClick={SignIn}
            className="m-auto w-80 my-8"
          >
            ログイン
          </Button>
          <br></br>
          <br></br>
          <Button
            variant="outlined"
            onClick={SignInWithGoogle}
            className="m-auto w-80"
          >
            Googleでログイン
          </Button>
        </div>
      </Box>
    </>
  );
}
