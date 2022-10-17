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
import Avatar from "@mui/material/Avatar";

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
    const usersRef = collection(database, "users");
    const [users, setUsers] = useState(null);
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

    const usersData = async () => {
      //firestoreからデータ取得
      await getDocs(usersRef).then((response) => {
        //コレクションのドキュメントを取得
        setUsers(
          response.docs.map((data) => {
            //配列なので、mapで展開する
            return { ...data.data(), id: data.id };
            //スプレッド構文で展開して、新しい配列を作成
          })
        );
      });
    };

    useEffect(() => {
      usersData();
    }, []);

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
                {/* <Avater photoURL={photoURL} displayname={displayname} /> */}
                <div key={id}>
                  {users &&
                    users.map((user) => {
                      return (
                        <>
                          {email == user.email && (
                            <div key={user.id}>
                              <div className="bg-slate-200 my-2 py-2">
                                <br></br>
                                <Avatar
                                  alt="Remy Sharp"
                                  src={user.profileimage}
                                />
                                <br></br>
                                <span className="text-xl">
                                  投稿者名：{user.username}
                                </span>
                                <br></br>
                              </div>
                            </div>
                          )}
                        </>
                      );
                    })}
                </div>
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
