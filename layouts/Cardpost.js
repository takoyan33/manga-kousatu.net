import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { app, database, ref } from "../firebaseConfig";
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

function Cardpost(
  downloadURL,
  id,
  title,
  categori,
  name,
  email,
  context,
  createtime
) {
  // const [ID, setID] = useState(null);
  // const [title, setTitle] = useState("");
  // const [context, setContext] = useState("");
  // const [name, setName] = useState("");
  // const [age, setAge] = useState(null);
  // const [categori, setCategori] = useState("");
  // const [firedata, setFiredata] = useState([]);
  // const [createtime, setCreatetime] = useState("");
  // const [isUpdate, setIsUpdate] = useState(false);
  // const databaseRef = collection(database, "CRUD DATA");
  // const [displayName, setDisplayName] = useState("");
  // const [createObjectURL, setCreateObjectURL] = useState(null);
  // const [downloadURL, setDownloadURL] = useState(null);
  // const [image, setImage] = useState("");
  // const [result, setResult] = useState("");
  const styles = { whiteSpace: "pre-line" };
  let router = useRouter();

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

  return (
    <div>
      <Grid key={data.id} className="flex m-auto">
        <Card className="lg:w-full my-4">
          <p className="m-auto text-center">
            <Image
              className="m-auto text-center max-w-sm"
              height={300}
              width={300}
              src={downloadURL}
            />
          </p>
          {/* <CardContent>
            <Typography gutterBottom variant="h5" component="div">
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
              <br></br>
              <div className="w-80 m-auto" style={styles}>
                {context}
              </div>
              <br></br>
              {name}
              <br></br>
              {createtime}
            </Typography>
          </CardContent>
          {user.email == email && (
            <CardActions>
              <Button
                variant="outlined"
                onClick={() =>
                  getID(data.id, data.name, data.age, data.title, data.context)
                }
              >
                更新する
              </Button>
              <Button
                variant="outlined"
                onClick={() => deleteDocument(data.id)}
              >
                削除する
              </Button>
            </CardActions>
          )}*/}
        </Card>
      </Grid>
    </div>
  );
}

export default Cardpost;
