import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { app, database, storage } from "../../firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth, updateProfile, deleteUser } from "firebase/auth";
import { MuiNavbar } from "../../layouts/components/MuiNavbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { postImage } from "../api/upload";
import Typography from "@mui/material/Typography";
import Grid from "@material-ui/core/Grid";
import Head from "next/head";
import Image from "react-image-resizer";
import Openbutton from "../../layouts/components/button/Openbutton";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Post = () => {
  const [ID, setID] = useState(null);
  // const [title, setTitle] = useState("");
  const [context, setContext] = useState("");
  const [file, setFile] = useState("");
  const [categori, setCategori] = useState("");
  const [photoURL, setPhotoURL] = useState();
  const [displayName, setDisplayName] = useState("");
  const [createtime, setCreatetime] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const databaseRef = collection(database, "CRUD DATA");
  //データベースを取得
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [firedata, setFiredata] = useState([]);
  const [downloadURL, setDownloadURL] = useState(null);
  const [likecount, setLikecount] = useState(0);
  const [image, setImage] = useState("");
  const [result, setResult] = useState("");
  const [email, setEmail] = useState("");
  const [userid, setUserid] = useState(null);
  const [netabare, setNetabare] = useState("");
  const [opentext, setOpentext] = useState(false);

  const styles = { whiteSpace: "pre-line" };
  let router = useRouter();
  const { title } = router.query;
  const auth = getAuth();
  const user = auth.currentUser;
  const [searchName, setSearchName] = useState("");

  console.log({ title });

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    //firestoreからデータ取得
    await getDocs(databaseRef).then((response) => {
      //コレクションのドキュメントを取得
      setFiredata(
        response.docs.map((data) => {
          //配列なので、mapで展開する
          return { ...data.data(), id: data.id };
          //スプレッド構文で展開して、新しい配列を作成
        })
      );
    });
  };

  const getID = (
    //セットする
    id,
    title,
    context,
    downloadURL,
    categori,
    cratetime,
    displayname,
    createtime,
    likes
  ) => {
    setID(id);
    setContext(context);
    // setTitle(title);
    setDownloadURL(downloadURL);
    setIsUpdate(true);
    setCategori(categori);
    setCreatetime(cratetime);
    setDisplayName(displayname);
    setLikecount(likes);
  };
  return (
    <>
      <Head>
        <title>漫画考察.net</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MuiNavbar />

      <div className="max-w-7xl m-auto">
        <Grid>
          {firedata
            .filter((data) => {
              if (data.title === { title }) {
                return data;
                //そのまま返す
              } else if (
                data.title.toLowerCase().includes(title.toLowerCase())
                //valのnameが含んでいたら小文字で返す　含んでいないvalは返さない
              ) {
                return data;
              }
            })
            .map((data) => {
              return (
                <Grid key={data.id}>
                  <Card className="lg:w-full w-4/5 my-4">
                    <p className="m-auto text-center">
                      <Image
                        className="m-auto text-center max-w-sm"
                        height={500}
                        width={500}
                        src={data.downloadURL}
                      />
                    </p>
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {data.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {data.categori == "ONE PIECE" && (
                          <p className="bg-blue-500 p-2 inline-block text-white text-center">
                            {data.categori}
                          </p>
                        )}
                        {data.categori == "呪術廻戦" && (
                          <p className="bg-purple-500 p-2 inline-block text-white text-center">
                            {data.categori}
                          </p>
                        )}
                        {data.categori == "東京リベンジャーズ" && (
                          <p className="bg-rose-500 p-2 inline-block text-white text-center">
                            {data.categori}
                          </p>
                        )}
                        {data.categori == "キングダム" && (
                          <p className="bg-yellow-500 p-2 inline-block text-white text-center">
                            {data.categori}
                          </p>
                        )}
                        <br></br>
                        <br></br>
                        {netabare == "ネタバレ有" && (
                          <div>
                            <p className="bg-yellow-500 mt-2 p-1 inline-block text-white text-center">
                              {netabare}
                            </p>
                            <br></br>

                            <Openbutton text="表示します" onClick={Opentext} />

                            {opentext == true && <p className="">{context}</p>}
                          </div>
                        )}
                        {netabare == "ネタバレ無" && (
                          <p className="bg-blue-500 mt-2 p-1 inline-block text-white text-center">
                            {netabare}
                          </p>
                        )}
                        <div className="text-left">{data.context}</div>
                        <br></br>
                        {data.name}
                        <br></br>
                        投稿日時：{data.createtime}
                        <br></br>
                        いいね数：{data.likes}
                        <br></br>
                        {/* <button
                          onClick={() => handleClick(data.id, data.likes)}
                          className=""
                        >
                          いいねする
                        </button> */}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
        <br></br>
        <br></br>
      </div>
    </>
  );
};

export default Post;
