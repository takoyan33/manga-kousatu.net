import React from "react";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { app, database, storage } from "../../firebaseConfig.js";
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
import { getAuth, updateProfile, deleteUser } from "firebase/auth";
import { MuiNavbar } from "../../packages/components/MuiNavbar";
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
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Nameauth from "../api/auth/Nameauth";

export default function Profile() {
  const [ID, setID] = useState(null);
  const [title, setTitle] = useState<string>("");
  const [context, setContext] = useState<string>("");
  const [file, setFile] = useState("");
  const [categori, setCategori] = useState<string>("");
  const [photoURL, setPhotoURL] = useState<string>();
  const [displayName, setDisplayName] = useState<string>("");
  let router = useRouter();
  const [createtime, setCreatetime] = useState<string>("");
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const databaseRef = collection(database, "CRUD DATA");
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [firedata, setFiredata] = useState([]);
  const [downloadURL, setDownloadURL] = useState<string>(null);
  const [likecount, setLikecount] = useState("");
  const [image, setImage] = useState("");
  const [result, setResult] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [userid, setUserid] = useState<string>(null);
  const [netabare, setNetabare] = useState<string>("");
  const [opentext, setOpentext] = useState<boolean>(false);
  const styles = { whiteSpace: "pre-line" };

  const auth = getAuth();
  const user = auth.currentUser;

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

  const getID = (
    id,
    title,
    context,
    downloadURL,
    categori,
    cratetime,
    displayname,
    createtime,
    likecount
  ) => {
    setID(id);
    setContext(context);
    setTitle(title);
    setDownloadURL(downloadURL);
    setIsUpdate(true);
    setCategori(categori);
    setCreatetime(cratetime);
    setDisplayName(displayname);
  };

  console.log(downloadURL);

  const deleteuser = async () => {
    if (user) {
      deleteUser(user)
        .then(() => {
          sessionStorage.removeItem("Token");
          alert("退会しました。TOP画面に戻ります。");
          router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const updatefields = () => {
    let fieldToEdit = doc(database, "CRUD DATA", ID);
    updateDoc(fieldToEdit, {
      title: title,
      context: context.replace(/\r?\n/g, "\n"),
    })
      .then(() => {
        alert("記事を更新しました");
        setContext("");
        setTitle("");
        setIsUpdate(false);
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteDocument = (id): void => {
    let fieldToEdit = doc(database, "CRUD DATA", id);
    let checkSaveFlg = window.confirm("削除しても大丈夫ですか？");

    if (checkSaveFlg) {
      deleteDoc(fieldToEdit)
        .then(() => {
          alert("記事を削除しました");
          getData();
        })
        .catch((err) => {
          alert("記事の削除に失敗しました");
        });
    } else {
      router.push("/profile");
    }
  };

  // const deleteDocument = useCallback((id) => {
  //   let fieldToEdit = doc(database, "CRUD DATA", id);
  //   let checkSaveFlg = window.confirm("削除しても大丈夫ですか？");

  //   if (checkSaveFlg) {
  //     deleteDoc(fieldToEdit)
  //       .then(() => {
  //         alert("記事を削除しました");
  //         getData();
  //       })
  //       .catch((err) => {
  //         alert("記事の削除に失敗しました");
  //       });
  //   } else {
  //     router.push("/profile");
  //   }
  // }, []);

  console.log(downloadURL);
  console.log(categori);

  return (
    <>
      <Head>
        <title>漫画考察.net</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MuiNavbar />
      <div className="max-w-7xl m-auto">
        <h2 className="m-5 my-12 text-center text-2xl font-semibold">
          プロフィール
        </h2>
        <p className="m-5">
          ユーザー画像
          {user && (
            <Image
              className="m-auto text-center max-w-sm"
              height={100}
              width={100}
              src={user.photoURL}
            />
          )}
        </p>
        <p className="m-5">名前： {user && <span>{user.displayName}</span>}</p>
        <p className="m-5">
          メールアドレス： {user && <span>{user.email}</span>}
        </p>

        <p className="m-5">過去の投稿</p>

        <Grid container spacing={1}>
          {firedata.map((data) => {
            return (
              <Grid key={data.id} className="flex m-auto">
                {data.email == user.email && (
                  <Card className="lg:w-full w-4/5 my-4">
                    <p className="m-auto text-center">
                      <Image
                        className="m-auto text-center max-w-sm"
                        height={300}
                        width={300}
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
                        {netabare == "ネタバレ無" && (
                          <p className="bg-blue-500 mt-2 p-1 inline-block text-white text-center">
                            {netabare}
                          </p>
                        )}
                        <div className="w-80 m-auto">{data.context}</div>
                        <br></br>
                        {data.name}
                        <br></br>
                        投稿日時：{data.createtime}
                      </Typography>
                    </CardContent>

                    {user.email == data.email && (
                      <CardActions>
                        <Button
                          variant="outlined"
                          onClick={() =>
                            getID(
                              data.id,
                              data.categori,
                              data.createtime,
                              data.title,
                              data.downloadURL,
                              data.email,
                              data.displayname,
                              data.context,
                              data.likecount
                            )
                          }
                        >
                          更新する
                        </Button>
                        <Button
                          variant="outlined"
                          key={data.id}
                          onClick={() => deleteDocument(data.id)}
                        >
                          削除する
                        </Button>
                      </CardActions>
                    )}
                  </Card>
                )}
              </Grid>
            );
          })}
        </Grid>
        <br></br>
        <br></br>
        {isUpdate && (
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
              label="タイトル（最大20文字)"
              variant="outlined"
              type="text"
              value={title}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setTitle(event.target.value)
              }
            />

            <br></br>

            <TextField
              label="内容(最大500文字）"
              className="m-auto w-full"
              id="filled-multiline-static"
              multiline
              rows={14}
              type="text"
              value={context}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setContext(event.target.value)
              }
            />
            <Button variant="outlined" onClick={updatefields}>
              更新する
            </Button>
            <br></br>
          </Box>
        )}
        <Nameauth />
        {/* <Button variant="outlined" className="m-5">
          <Link href="/profile/emailedit">メールアドレスを変更する</Link>
        </Button> */}

        <br></br>
        <br></br>
        {/* <Button variant="outlined" className="m-5">
          <Link href="/profile/edit/passwordedit">パスワードを変更する</Link>
        </Button> */}
        <br></br>
        <br></br>
        <Button variant="outlined" className="m-5">
          <Link href="/profile/edit/photoedit">プロフィール画像を更新する</Link>
        </Button>
        <br></br>
        <br></br>
        <Button variant="outlined" className="m-5" onClick={deleteuser}>
          アカウントを退会する
        </Button>
      </div>
    </>
  );
}
