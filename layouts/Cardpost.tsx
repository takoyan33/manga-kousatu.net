import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { app, database } from "../firebaseConfig";
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
import { getAuth } from "firebase/auth";
import styles from "../styles/Home.module.css";
import { updatePassword } from "firebase/auth";
import { MuiNavbar } from "./components/MuiNavbar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@material-ui/core/Grid";
import Head from "next/head";
import { getStorage } from "firebase/storage";
import Image from "react-image-resizer";
import Avatar from "@mui/material/Avatar";

export const Cardpost = ({
  downloadURL,
  id,
  title,
  categori,
  netabare,
  displayname,
  context,
  email,
  photoURL,
  createtime,
}) => {
  const [ID, setID] = useState(null);
  // const [title, setTitle] = useState("");
  // const [context, setContext] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState(null);
  // const [categori, setCategori] = useState("");
  const [firedata, setFiredata] = useState([]);
  // const [createtime, setCreatetime] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [opentext, setOpentext] = useState(false);
  const databaseRef = collection(database, "CRUD DATA");
  const [displayName, setDisplayName] = useState("");
  const [createObjectURL, setCreateObjectURL] = useState(null);
  // const [downloadURL, setDownloadURL] = useState(null);
  const [image, setImage] = useState("");
  const [result, setResult] = useState("");
  const style: React.CSSProperties = {
    whiteSpace: "pre-line",
  };
  const cardstyles: React.CSSProperties = {
    margin: "15px",
  };

  let router = useRouter();
  const auth = getAuth();
  const user = auth.currentUser;

  const deleteDocument = (id) => {
    let fieldToEdit = doc(database, "CRUD DATA", id);
    let checkSaveFlg = window.confirm("削除しても大丈夫ですか？");

    if (checkSaveFlg) {
      deleteDoc(fieldToEdit)
        .then(() => {
          alert("記事を削除しました");
        })
        .catch((err) => {
          alert("記事の削除に失敗しました");
        });
    } else {
      router.push("/home");
    }
  };

  const Opentext = () => {
    if (opentext == false) {
      setOpentext(true);
    } else {
      setOpentext(false);
    }
  };

  return (
    <div>
      <Grid key={id} className="flex m-auto">
        <Card className="m-8" style={cardstyles}>
          <p className="m-auto text-center">
            <Image
              className="m-auto text-center max-w-sm"
              height={300}
              width={300}
              src={downloadURL}
            />
          </p>
          <CardContent>
            <Typography gutterBottom component="div" className="w-3/5 text-xl ">
              {title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {categori == "ONE PIECE" && (
                <p className="bg-blue-500 p-2 inline-block text-white text-center">
                  {categori}
                </p>
              )}
              {categori == "呪術廻戦" && (
                <p className="bg-purple-500 p-2 inline-block text-white text-center">
                  {categori}
                </p>
              )}
              {categori == "東京リベンジャーズ" && (
                <p className="bg-rose-500 p-2 inline-block text-white text-center">
                  {categori}
                </p>
              )}
              {categori == "キングダム" && (
                <p className="bg-yellow-500 p-2 inline-block text-white text-center">
                  {categori}
                </p>
              )}
              <br></br>

              {netabare == "ネタバレ有" && (
                <div>
                  <p className="bg-yellow-500 mt-2 p-1 inline-block text-white text-center">
                    {netabare}
                  </p>
                  <br></br>
                  <button
                    onClick={Opentext}
                    className="bg-yellow-500 mt-2 p-1 inline-block text-white text-center"
                  >
                    表示する
                  </button>
                  {opentext == true && <p className="">{context}</p>}
                </div>
              )}

              {netabare == "ネタバレ無" && (
                <p className="bg-blue-500 mt-2 p-1 inline-block text-white text-center">
                  {netabare}
                </p>
              )}

              <br></br>
              <div className="w-80 m-auto" style={styles}>
                {netabare == "ネタバレ無" && <p className="">{context}</p>}
              </div>

              <br></br>
              <Avatar alt="Remy Sharp" src={photoURL} />
              <span>{displayname}</span>
              <br></br>
              {createtime}
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};
