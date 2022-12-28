import React from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getAuth, updatePassword } from "firebase/auth";
import { MuiNavbar } from "../../../layouts/components/MuiNavbar";
import { SiteHead } from "../../../layouts/components/ui/SiteHead";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export default function Password() {
  const [password, setPassword] = useState<string>("");
  const router = useRouter();
  const [firedata, setFiredata] = useState([]);
  const auth = getAuth();
  const user = auth.currentUser;
  // const newPassword = getASecureRandomPassword();

  console.log(user);

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

      <h2 className="my-5">パスワード再設定</h2>

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
