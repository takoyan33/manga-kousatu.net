import { app } from "../../../firebaseConfig.js";
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
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { SiteButton } from "../../../layouts/components/button";

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

export default function Index() {
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
        localStorage.setItem("Token", user.accessToken);
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
        localStorage.setItem("Token", token);
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
      <Box
        component="form"
        className="flex justify-center max-w-7xl "
        noValidate
        autoComplete="off"
      >
        <div>
          <label className="text-center my-4">メールアドレス*</label>
          <TextField
            id="outlined-basic"
            label="sample@gmail.com"
            className="m-auto w-80"
            variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setEmail(event.target.value)
            }
            {...register("email")}
            error={"email" in errors}
            helperText={errors.email?.message}
          />

          <label className="text-center my-4">パスワード（8文字以上)*</label>
          <TextField
            id="outlined-basic"
            label="Password"
            variant="outlined"
            type="password"
            className="m-auto w-80"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(event.target.value)
            }
            {...register("password")}
            error={"password" in errors}
            helperText={errors.password?.message}
          />
          <SiteButton
            href=""
            // onClick={SignIn}
            onClick={handleSubmit(SignIn)}
            text="ログイン"
            className="m-auto w-80 my-8"
          />
          <SiteButton
            href=""
            text="Googleでログイン"
            onClick={SignInWithGoogle}
            className="m-auto w-80 my-8"
          />
        </div>
      </Box>
    </>
  );
}
