import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { app, database } from "../../../firebaseConfig";
import {
  collection,
  getDocs,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { getAuth, sendEmailVerification } from "firebase/auth";
import { MuiNavbar } from "../../../layouts/components/MuiNavbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Head from "next/head";

export default function Emaildedit() {
  const [email, setEmail] = useState<string>("");
  let router = useRouter();
  const databaseRef = collection(database, "CRUD DATA");
  const [firedata, setFiredata] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;

  console.log(user);
  useEffect(() => {
    let token = sessionStorage.getItem("Token");

    if (token) {
      getData();
    }
    if (!token) {
      router.push("/register");
    }
  }, []);

  const getData = async () => {
    await getDocs(databaseRef).then((response) => {
      setFiredata(
        response.docs.map((data) => {
          return { ...data.data(), id: data.id };
        })
      );
    });
  };

  const updateemail = async () => {
    sendEmailVerification(auth.currentUser).then(() => {
      alert("確認メールを送信しました。");
    });
  };

  return (
    <div>
      <Head>
        <title>漫画考察.net/メールアドレス編集</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MuiNavbar />

      <h2 className="my-5">メールアドレスの編集</h2>

      <p className="my-5">
        メールアドレス： {user && <span>{user.email}</span>}
      </p>

      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <TextField
          id="outlined-basic"
          label="新しいメールアドレス"
          variant="outlined"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
      </Box>
      <Button variant="outlined" className="m-5" onClick={updateemail}>
        更新する
      </Button>
    </div>
  );
}
