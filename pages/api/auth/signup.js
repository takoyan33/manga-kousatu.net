import { app } from "../../../firebaseConfig";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useRouter } from "next/router";
import React from "react";

export const useSignUp = () => {
  const auth = getAuth();
  // const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // let checkSaveFlg = window.confirm("この内容で登録しても大丈夫ですか？");

  // if (checkSaveFlg) {
  //   createUserWithEmailAndPassword(auth, email, password)
  //     .then((response) => {
  //       sessionStorage.setItem("Token", response.user.accessToken);
  //       console.log(response.user.accessToken);
  //       router.push("/home");
  //     })
  //     .catch((err) => {
  //       alert("emailが既にあります");
  //     });
  // } else {
  // }

  createUserWithEmailAndPassword(auth, email, password)
    .then((response) => {
      sessionStorage.setItem("Token", response.user.accessToken);
      console.log(response.user.accessToken);
      // router.push("/home");
    })
    .catch((err) => {
      alert("emailが既にあります");
    });

  return useSignUp;
};
