import {
  getAuth,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/router";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SiteButton } from "../../../layouts/components/button";
import Link from "next/link";
import { SiteInput } from "../../../layouts/components/ui/SiteInput";
import { Grid } from "@material-ui/core";
import { Stack, Button } from "@mui/material";

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
  const auth = getAuth();
  const router = useRouter();
  const googleProvider = new GoogleAuthProvider();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SampleFormInput>({
    resolver: yupResolver(schema),
  });

  const SignIn: SubmitHandler<SampleFormInput> = (email: any) => {
    alert("ログインしました");
    console.log(email.email);
    console.log(email.password);
    signInWithEmailAndPassword(auth, email.email, email.password)
      .then((userCredential: any) => {
        const user = userCredential.user;
        sessionStorage.setItem("Token", user.accessToken);
        router.push("/");
      })
      .catch((err) => {
        alert("ログインできません");
        console.log(err);
      });
  };

  const SignInWithGoogle = () => {
    signInWithPopup(auth, googleProvider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        sessionStorage.setItem("Token", token);
        alert("ログインしました");
        router.push("/");
      })
      .catch((err) => {
        alert("登録できませんでした");
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
        sx={{ m: 2, width: "38ch" }}
      >
        <>
          <div>
            <label className="text-center my-4">メールアドレス*</label>
          </div>
          <div>
            <TextField
              id="outlined-basic"
              label="sample@gmail.com"
              className="m-auto w-80 mb-6"
              variant="outlined"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setEmail(event.target.value)
              }
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
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setPassword(event.target.value)
              }
              {...register("password")}
              error={"password" in errors}
              helperText={errors.password?.message}
            />
          </div>
          <SiteButton
            href=""
            // onClick={SignIn}
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
        </>
      </Stack>
    </>
  );
}
