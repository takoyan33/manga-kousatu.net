import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { app, database } from "../../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import { getAuth, updatePassword } from "firebase/auth";
import { MuiNavbar } from "../../../layouts/components/MuiNavbar";
import { SiteHead } from "../../../layouts/components/ui/SiteHead";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Head from "next/head";

export default function Passworddedit() {
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const databaseRef = collection(database, "posts");
  const [firedata, setFiredata] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;
  // const newPassword = getASecureRandomPassword();

  console.log(user);
  useEffect(() => {
    let token = localStorage.getItem("Token");

    if (token) {
      getData();
    }
    if (!token) {
      router.push("/register");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // const updatepassword = async () => {
  //   updatePassword(user, newPassword)
  //     .then(() => {
  //       alert("パスワードを変更しました");
  //     })
  //     .catch((error) => {
  //       // An error ocurred
  //       // ...
  //     });
  // };

  return (
    <div>
      <SiteHead />
      <MuiNavbar />

      <h2 className="my-5">パスワードの編集</h2>

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
          label="新しいパスワード*8文字以上"
          variant="outlined"
          value={password}
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />

        <TextField
          id="outlined-basic"
          label="新しいパスワード*8文字以上"
          variant="outlined"
          value={password}
          type="password"
          onChange={(event) => setPassword(event.target.value)}
        />
      </Box>
      {/* <Button variant="outlined" className="m-5" onClick={updatepassword}>
        更新する
      </Button> */}
    </div>
  );
}
