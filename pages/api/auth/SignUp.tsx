import { app } from "../../../firebaseConfig.js";
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
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

// フォームの型
// interface SampleFormInput {
//   email: string;
//   name: string;
//   password: string;
// }

// // バリデーションルール
// const schema = yup.object({
//   email: yup
//     .string()
//     .required("必須です")
//     .email("正しいメールアドレス入力してください"),
//   name: yup.string().required("必須です"),
//   password: yup.string().required("必須です").min(8, "文字数が足りません"),
// });

export default function SignUp() {
  const auth = getAuth();
  const router = useRouter();
  const googleProvider = new GoogleAuthProvider();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm<SampleFormInput>({
  //   resolver: yupResolver(schema),
  // });

  const SignUp = () => {
    let checkSaveFlg = window.confirm("この内容で登録しても大丈夫ですか？");

    if (checkSaveFlg) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential: any) => {
          const user = userCredential.user;
          sessionStorage.setItem("Token", user.accessToken);
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
      //googleで登録する
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      sessionStorage.setItem("Token", token);
      //tokenをセットする
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
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(event.target.value)
            }
            // {...register("email")}
            // error={"email" in errors}
            // helperText={errors.email?.message}
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
            // {...register("password")}
            // error={"password" in errors}
            // helperText={errors.password?.message}
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
            // error={"password" in errors}
            // helperText={errors.password?.message}
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
