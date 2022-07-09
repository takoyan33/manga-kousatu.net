import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { app, database } from "../../firebaseConfig";
import {
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
  Firestore,
} from "firebase/firestore";
import { useRouter } from "next/router";
import {
  getAuth,
  updateProfile,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { MuiNavbar } from "../../layouts/MuiNavbar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Head from "next/head";

export default function Profile() {
  const [image, setImage] = useState();
  const [photoURL, setPhotoURL] = useState();
  const [name, setName] = useState("");
  const [age, setAge] = useState(null);
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

  if (user) {
    updateProfile(user, {
      displayName: name,
      // setPhotoURL: photoURL,
    })
      .then(() => {
        setName("");
        // setPhotoURL("");
        router.push("/profile");
      })
      .catch((error) => {
        console.error(error);
      });
  }

  return (
    <div>
      <MuiNavbar />

      <h2 className="m-5">プロフィール編集</h2>

      <p className="m-5">現在の名前： {user && <span>{user.name}</span>}</p>

      <p className="m-5">
        現在のユーザー画像： {user && <img src={user.photoURL} />}
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
          label="名前"
          variant="outlined"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
      </Box>
      <Button variant="outlined" className="m-5" onClick={updateProfile}>
        更新する
      </Button>
    </div>
  );
}
