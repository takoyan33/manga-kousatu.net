import { app } from "../../../firebaseConfig.js";
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendSignInLinkToEmail,
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
import { SiteButton } from "../../components/button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Stack } from "@mui/material";

// フォームの型
interface SampleFormInput {
  email: string;
  password: string;
}

// バリデーションルール
const schema = yup.object({
  email: yup
    .string()
    .required("必須です")
    .email("正しいメールアドレス入力してください"),
  password: yup.string().required("必須です").min(8, "文字数が足りません"),
});

export default function SignUp() {
  const signupnotify = () => toast("登録できました！");
  const signupmissnotify = () => toast("登録失敗しました！");
  const router = useRouter();
  const googleProvider = new GoogleAuthProvider();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SampleFormInput>({
    resolver: yupResolver(schema),
  });

  const auth = getAuth();

  const SignUp = (data) => {
    let checkSaveFlg = window.confirm("この内容で登録しても大丈夫ですか？");
    console.log(data.email);
    console.log(data.password);
    if (checkSaveFlg) {
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((userCredential: any) => {
          const user = userCredential.user;
          localStorage.setItem("Token", user.accessToken);
          // firebase.firestore().collection("users").doc(user.uid);
          signupnotify();
          router.push("/registerprofile");
        })
        .catch((err) => {
          signupmissnotify();
        });
    } else {
    }
  };

  const SignUpWithGoogle = () => {
    const auth = getAuth();
    signInWithPopup(auth, googleProvider).then((result) => {
      //googleで登録する
      const credential = GoogleAuthProvider.credentialFromResult(result);
      const token = credential.accessToken;
      localStorage.setItem("Token", token);
      //tokenをセットする
      const user = result.user;
      router.push("/registerprofile");
    });
  };

  return (
    <>
      <Stack
        component="form"
        className="m-auto"
        noValidate
        spacing={2}
        sx={{ width: "38ch" }}
      >
        <ToastContainer />
        <div>
          <label className="text-center my-4">メールアドレス*</label>
        </div>
        <TextField
          id="outlined-basic"
          label="sample@gmail.com"
          className="m-auto w-80"
          variant="outlined"
          // onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          //   setEmail(event.target.value)
          // }
          {...register("email", { required: true })}
        />
        <div>
          <label className="text-center my-4">パスワード（8文字以上)*</label>
        </div>
        <TextField
          id="outlined-basic"
          label="Password"
          type="password"
          variant="outlined"
          className="m-auto w-80"
          {...register("password", { required: true })}
        />
        <div>
          <label className="text-center my-4">
            確認用パスワード（8文字以上)*
          </label>
        </div>
        <TextField
          id="outlined-basic"
          label="Password"
          type="password"
          variant="outlined"
          className="m-auto w-80"
          {...register("password", { required: true })}
        />
        <SiteButton
          href=""
          onClick={handleSubmit(SignUp)}
          text="新規登録"
          className="m-auto w-80 my-8 text-center"
        />
        <SiteButton
          href=""
          text="Googleで新規登録"
          onClick={SignUpWithGoogle}
          className="m-auto text-center w-80 my-4"
        />
        <p className="my-4">
          登録済みの方はこちら
          <Link href="/login">
            <span className="text-blue-500 underline">ログイン</span>
          </Link>
          <ToastContainer
            position="top-right"
            autoClose={6000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
        </p>
      </Stack>
    </>
  );
}