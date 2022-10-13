import React from "react";
import Link from "next/link";
import { useEffect, useState, useMemo, useCallback } from "react";
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
import Categori from "./components/text/Categori";
import Avater from "./components/text/Avater";
import Openbutton from "./components/button/Openbutton";

type Props = {
  downloadURL: string;
  id: number;
  title: string;
  categori: string;
  netabare: string;
  context: string;
  email: string;
  photoURL: string;
  displayname: string;
  createtime: string;
  likes: string;
  selected: string[];
};

// eslint-disable-next-line react/display-name
export const Cardpost: React.VFC<Props> = React.memo(
  ({
    downloadURL,
    id,
    likes,
    title,
    categori,
    netabare,
    displayname,
    context,
    email,
    photoURL,
    createtime,
    selected,
  }) => {
    const [opentext, setOpentext] = useState<boolean>(false);
    const databaseRef = collection(database, "CRUD DATA");
    const style: React.CSSProperties = {
      whiteSpace: "pre-line",
    };
    const cardstyles: React.CSSProperties = {
      margin: "10px",
    };

    let router = useRouter();
    const auth = getAuth();
    const user = auth.currentUser;

    const deleteDocument = useCallback((id) => {
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
        router.push("/");
      }
    }, []);

    const Opentext = () => {
      if (opentext == false) {
        setOpentext(true);
      } else {
        setOpentext(false);
      }
    };

    // const Opentext = useCallback(() => {
    //   if (opentext == false) {
    //     setOpentext(true);
    //   } else {
    //     setOpentext(false);
    //   }
    // }, []);

    // console.log(displayname);
    // console.log(photoURL);
    // console.log(categori);
    // console.log(user);
    // console.log(id);
    // console.log(selected);

    return (
      <div className="">
        <Link href={`/post/${id}`}>
          <Grid key={id} className="flex  m-auto">
            <Card
              className="my-8 m-auto hover:shadow-2xl border"
              style={cardstyles}
            >
              <p className="flex justify-center m-auto">
                <Image
                  className="m-auto text-center max-w-sm"
                  height={300}
                  width={300}
                  src={downloadURL}
                />
              </p>

              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {title}
                </Typography>
                <Categori categori={categori} />
                {netabare == "ネタバレ有" && (
                  <div>
                    <p className="bg-yellow-500 mt-2 p-1 inline-block text-white text-center">
                      {netabare}
                    </p>
                    <br></br>

                    {/* <Openbutton text="表示します" onClick={Opentext} /> */}

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
                  {/* {netabare == "ネタバレ無" && (
                    <p className="text-left">{context}</p>
                  )} */}
                </div>
                <p className="max-w-xs">
                  {selected &&
                    selected.map((tag, i) => (
                      <span className="text-cyan-700" key={i}>
                        #{tag}　
                      </span>
                    ))}
                </p>
                <Avater photoURL={photoURL} displayname={displayname} />
                投稿日時：{createtime}
                <br></br>
                いいね数：{likes}
              </CardContent>
            </Card>
          </Grid>
        </Link>
      </div>
    );
  }
);
