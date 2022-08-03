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

// フォームの型
interface SampleFormInput {
  email: string;
  name: string;
  password: string;
}

// バリデーションルール
const schema = yup.object({
  email: yup
    .string()
    .required("必須です")
    .email("正しいメールアドレス入力してください"),
  name: yup.string().required("必須です"),
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

  const SignIn: SubmitHandler<SampleFormInput> = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential: any) => {
        const user = userCredential.user;
        sessionStorage.setItem("Token", user.accessToken);
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
      sessionStorage.setItem("Token", token);
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
            {...register("email")}
            error={"email" in errors}
            helperText={errors.email?.message}
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
            {...register("password")}
            error={"password" in errors}
            helperText={errors.password?.message}
          />
          <br></br>
          <br></br>
          <Button
            variant="outlined"
            onClick={handleSubmit(SignIn)}
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
