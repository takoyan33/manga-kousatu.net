import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { app, database } from "../../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import { getAuth, sendEmailVerification, updateProfile } from "firebase/auth";
import { MuiNavbar } from "../../../layouts/components/MuiNavbar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { postImage } from "../../api/upload";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Head from "next/head";

import Image from "react-image-resizer";

export default function Edit() {
  const [image, setImage] = useState<string>();
  const [result, setResult] = useState("");
  const [displayName, setDisplayName] = useState<string>();
  let router = useRouter();
  const databaseRef = collection(database, "CRUD DATA");
  const [createObjectURL, setCreateObjectURL] = useState<string>(null);
  const [downloadURL, setDownloadURL] = useState<string>(null);
  const auth = getAuth();
  const user = auth.currentUser;
  console.log(user);
  useEffect(() => {
    let token = sessionStorage.getItem("Token");
    if (token) {
    }
    if (!token) {
      router.push("/register");
    }
  }, []);

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      if (event == "") {
        setImage("");
        setCreateObjectURL("");
      } else {
        const file = event.target.files[0];
        setImage(file);
        setCreateObjectURL(URL.createObjectURL(file));
      }
    } else {
      setImage("");
      setCreateObjectURL("");
    }
  };

  // const uploadToClient = (event) => {
  //   if (event.target.files && event.target.files[0]) {
  //     const file = event.target.files[0];
  //     setImage(file);
  //     setCreateObjectURL(URL.createObjectURL(file));
  //   } else {
  //     setImage("");
  //     setCreateObjectURL("");
  //   }
  // };

  const updatename = async () => {
    if (image == "" || image == null) {
      updateProfile(auth.currentUser, {
        photoURL: user.photoURL,
        displayName: displayName,
      })
        .then(() => {
          alert("プロフィールを更新しました。");
          setResult("");
          setDisplayName("");
          router.push("/profile");
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      const result = await postImage(image);
      setResult(result);
      updateProfile(auth.currentUser, {
        photoURL: result,
        displayName: displayName,
      })
        .then(() => {
          alert("プロフィールを更新しました。");
          setResult("");
          setDisplayName("");
          router.push("/profile");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <Head>
        <title>漫画考察.net/プロフィール編集</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MuiNavbar />

      <h2 className="my-12 text-center text-2xl font-semibold">
        プロフィール画像の編集
      </h2>

      <p className="my-12 text-center font-semib">
        現在のユーザー画像
        <br></br>
        <br></br>
        {user && (
          <p className="flex justify-center">
            <Image
              className="m-auto text-center max-w-sm"
              height={100}
              width={100}
              src={user.photoURL}
            />
          </p>
        )}
        {/* {user.photoURL && (
          <p className="flex justify-center">まだ設定されていません</p>
        )} */}
      </p>

      <Box component="form" className="" noValidate autoComplete="off">
        <>
          <p className="text-center my-4">新しいプロフィール画像</p>
          <br></br>
          <div className="">
            <img
              className="flex justify-center items-center m-auto  w-full"
              src={createObjectURL}
            />
          </div>
          <div className="text-center m-auto my-4">
            <label
              htmlFor="file-input"
              className="bg-primary-900 text-white-900 text-center m-auto dark:bg-dark-900 px-4 py-2 rounded mb-6 w-full"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 hover:cursor-pointer hover:bg-gray-700 text-center m-auto"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </label>
            <input
              id="file-input"
              className="hidden text-center m-auto"
              type="file"
              accept="image/*"
              name="myImage"
              onChange={uploadToClient}
            />
          </div>

          <p className="text-center my-4">
            現在の名前： {user && <span>{user.displayName}</span>}
          </p>
          <p className="text-center my-4">新しい名前（最大10文字）</p>
          <div className="text-center">
            <TextField
              id="outlined-basic"
              label="名前"
              variant="outlined"
              className="m-auto w-80"
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setDisplayName(event.target.value)
              }
            />
          </div>
          <br></br>
          <br></br>
          <div className="text-center">
            <Button
              variant="outlined"
              className="m-auto w-80 text-center"
              onClick={updatename}
            >
              プロフィールを更新する
            </Button>
          </div>
          <br></br>
          <br></br>
          <div className="text-center">
            <Button variant="outlined" className="m-auto w-80 ">
              <Link href="/profile">戻る</Link>
            </Button>
          </div>
        </>
      </Box>
    </div>
  );
}
