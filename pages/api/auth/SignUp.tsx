import { app } from "../../../firebaseConfig";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/router";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Link from "next/link";

export default function SignUp() {
  const auth = getAuth();
  const router = useRouter();
  const googleProvider = new GoogleAuthProvider();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const SignUp = () => {
    let checkSaveFlg = window.confirm("この内容で登録しても大丈夫ですか？");

    if (checkSaveFlg) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          router.push("/home");
        })
        .catch((err) => {
          alert("emailが既にあります");
        });
    } else {
    }
  };

  const SignUpWithGoogle = () => {
    signInWithPopup(auth, googleProvider).then((result) => {
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      const user = result.user;
      router.push("/home");
    });
  };

  console.log(setEmail);
  console.log(password);

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
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(event.target.value)
            }
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
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(event.target.value)
            }
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
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(event.target.value)
            }
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
    </>
  );
}
