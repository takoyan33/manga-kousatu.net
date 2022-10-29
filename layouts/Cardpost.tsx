import React from "react";
import Link from "next/link";
import { useEffect, useState, useMemo, useCallback } from "react";
import { database } from "../firebaseConfig";
import { collection, getDocs, doc, Firestore } from "firebase/firestore";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import styles from "../styles/Home.module.css";
import { updatePassword } from "firebase/auth";
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
import { getStorage } from "firebase/storage";
import Image from "react-image-resizer";
import Categori from "./components/text/Categori";
import Avatar from "@mui/material/Avatar";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

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
      <div className="cursor-pointer">
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
                  alt="画像"
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
                  </div>
                )}
                {netabare == "ネタバレ無" && (
                  <p className="bg-blue-500 mt-2 p-1 inline-block text-white text-center">
                    {netabare}
                  </p>
                )}
                <div className="w-80 m-auto" style={styles}></div>
                <p className="max-w-xs">
                  {selected &&
                    selected.map((tag, i) => (
                      // <Link href={`/post/tag/${tag}`} key={i}>
                      <span className="text-cyan-700" key={i}>
                        #{tag}　
                      </span>
                      // </Link>
                    ))}
                </p>
                <div key={id} className="cursor-pointer">
                  {users &&
                    users.map((user) => {
                      return (
                        <>
                          {email == user.email && (
                            <div key={user.id} className="">
                              <div className="bg-slate-200 my-2 py-4 flex m-auto">
                                <div className="">
                                  <Avatar
                                    className="m-auto text-center max-w-sm border"
                                    sx={{ width: 50, height: 50 }}
                                    alt="投稿者プロフィール"
                                    src={user.profileimage}
                                  />
                                </div>
                                <div className=" pt-2">
                                  <span className="text-xl my-2 ml-2 ">
                                    投稿者名：{user.username}
                                  </span>
                                </div>
                              </div>
                            </div>
                          )}
                        </>
                      );
                    })}
                </div>
                <FavoriteIcon /> {likes}　<AccessTimeIcon /> {createtime}
              </CardContent>
            </Card>
          </Grid>
        </Link>
      </div>
    );
  }
);
