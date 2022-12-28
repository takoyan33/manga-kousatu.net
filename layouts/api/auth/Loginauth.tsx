import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/router";
import TextField from "@mui/material/TextField";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SiteButton } from "../../components/button";
import Link from "next/link";
import { Stack } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SignInWithGoogle } from "../../api/auth/useAuth";

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

export default function Loginauth() {
  const signupnotify = () =>
    toast.success("ログインしました!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  const signupmissnotify = () =>
    toast.error("ユーザー登録失敗!", {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });

  const auth = getAuth();
  const router = useRouter();
  const googleProvider = new GoogleAuthProvider();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SampleFormInput>({
    resolver: yupResolver(schema),
  });

  const SignIn: SubmitHandler<SampleFormInput> = (email: any) => {
    console.log(email.email);
    console.log(email.password);
    signInWithEmailAndPassword(auth, email.email, email.password)
      .then(() => {
        signupnotify();
        setTimeout(() => {
          router.push("/");
        }, 2000);
      })
      .catch((err) => {
        signupmissnotify();
        console.log(err);
      });
  };

  const SignInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then(() => {
        signupnotify();
        setTimeout(() => {
          router.push("/");
        }, 2000);
      })
      .catch((err) => {
        signupmissnotify();
        console.log(err);
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
        <>
          <ToastContainer />
          <div>
            <label className="text-center my-4">メールアドレス*</label>
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="sample@gmail.com"
              className="m-auto w-80 mb-6"
              variant="outlined"
              {...register("email")}
              error={"email" in errors}
              helperText={errors.email?.message}
            />
            <div>
              <label className="text-center my-4">
                パスワード（8文字以上)*
              </label>
            </div>
          </div>
          <div className="m-auto">
            <TextField
              id="outlined-basic"
              label="Password"
              variant="outlined"
              type="password"
              className="m-auto w-80 mb-6"
              {...register("password")}
              error={"password" in errors}
              helperText={errors.password?.message}
            />
          </div>
          <SiteButton
            href=""
            onClick={handleSubmit(SignIn)}
            text="ログイン"
            className="m-auto text-center w-80 my-4"
          />
          <SiteButton
            href=""
            text="Googleでログイン"
            onClick={SignInWithGoogle}
            className="m-auto text-center w-80 my-4"
          />
          <p className="my-4">
            ユーザー未登録の方はこちら
            <Link href="/register">
              <span className="text-blue-500 underline">新規登録</span>
            </Link>
          </p>
          <p className="my-4">
            パスワードを忘れた方はこちら<br></br>
            <Link href="/profile/edit/password">
              <span className="text-blue-500 underline">パスワード再設定</span>
            </Link>
          </p>
        </>
      </Stack>
    </>
  );
}
