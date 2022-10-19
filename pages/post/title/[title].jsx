import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { app, database, storage } from "../../../firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth, updateProfile, deleteUser } from "firebase/auth";
import { MuiNavbar } from "../../../layouts/components/MuiNavbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import { postImage } from "../../api/upload";
import Typography from "@mui/material/Typography";
import Grid from "@material-ui/core/Grid";
import Head from "next/head";
import Image from "react-image-resizer";
import Openbutton from "../../../layouts/components/button/Openbutton";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Avatar from "@mui/material/Avatar";

const Post = () => {
  const [ID, setID] = useState(null);
  const [id, setid] = useState(null);
  const [context, setContext] = useState("");
  const [file, setFile] = useState("");
  const [categori, setCategori] = useState("");
  const [photoURL, setPhotoURL] = useState();
  const [title1, setTitle1] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [createtime, setCreatetime] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [posttitle, setPostTitle] = useState("");
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
  const [likes, setLikes] = useState(null);
  const [selected, setSelected] = useState(["最終回"]);
  const [opentext, setOpentext] = useState(false);

  const styles = { whiteSpace: "pre-line" };
  let router = useRouter();
  const { title } = router.query;
  const auth = getAuth();
  const user = auth.currentUser;
  const [searchName, setSearchName] = useState("");

  console.log({ title });

  const getData = async () => {
    //firestoreからデータ取得
    await getDocs(databaseRef).then((response) => {
      //コレクションのドキュメントを取得
      setFiredata(
        response.docs
          .map((data) => {
            //配列なので、mapで展開する
            return { ...data.data(), id: data.id };
            //スプレッド構文で展開して、新しい配列を作成
          })
          .filter((data) => {
            if (data.title === title) {
              return data;
              //そのまま返す
            } else if (
              data.title.toLowerCase().includes(title)
              //valのnameが含んでいたら小文字で返す　含んでいないvalは返さない
            ) {
              return data;
            }
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
    netabare,
    photoURL,
    userid,
    likes,
    selected
  ) => {
    setID(id);
    setContext(context);
    setTitle1(title);
    setDisplayName(displayname);
    setDownloadURL(downloadURL);
    setIsUpdate(true);
    setCategori(categori);
    setCreatetime(cratetime);
    setNetabare(netabare);
    setPhotoURL(photoURL);
    setUserid(userid);
    setLikes(likes);
    setSelected(selected);
    console.log(title);
    console.log(context);
  };

  useEffect(() => {
    getData();
  }, [likes]);

  // const Opentext = () => {
  //   if (opentext == false) {
  //     setOpentext(true);
  //   } else {
  //     setOpentext(false);
  //   }
  // };

  const updatefields = () => {
    //更新する
    let fieldToEdit = doc(database, "CRUD DATA", ID);
    //セットしたIDをセットする
    updateDoc(fieldToEdit, {
      title: posttitle,
      context: context.replace(/\r?\n/g, "\n"),
      //改行を保存する
    })
      .then(() => {
        alert("記事を更新しました");
        setPostTitle("");
        setContext("");
        setIsUpdate(false);
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteDocument = (id) => {
    //data.idを送っているのでidを受け取る
    let fieldToEdit = doc(database, "CRUD DATA", id);
    let checkSaveFlg = window.confirm("削除しても大丈夫ですか？");
    //確認画面を出す

    if (checkSaveFlg) {
      deleteDoc(fieldToEdit)
        //記事を削除する
        .then(() => {
          alert("記事を削除しました");
          getData();
        })
        .catch((err) => {
          alert("記事の削除に失敗しました");
        });
    } else {
      router.push("/");
    }
  };

  const handleClick = (id, likes) => {
    // setLikecount(likes + 1);
    console.log(likes);

    let fieldToEdit = doc(database, "CRUD DATA", id);
    updateDoc(fieldToEdit, {
      likes: likes + 1,
    })
      .then(() => {
        alert("いいねしました");
        console.log(likecount);
        setLikecount(0);
        getData();
      })
      .catch((err) => {
        alert("失敗しました");
        console.log(err);
      });
  };
  return (
    <>
      <Head>
        <title>Manga Study</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MuiNavbar />

      <div className="max-w-5xl m-auto">
        <br></br>
        <p>
          <Link href="/">トップ</Link>　＞　投稿記事　＞　{title}
        </p>
        <div>
          {firedata.map((data) => {
            return (
              <div key={data.id}>
                <div className="lg:w-full my-4 ">
                  {user && (
                    <>
                      {user.email == data.email && (
                        <div>
                          <Button
                            variant="outlined"
                            onClick={() =>
                              getID(data.id, data.title, data.context)
                            }
                            className="m-4"
                          >
                            更新する
                          </Button>
                          <Button
                            variant="outlined"
                            key={data.id}
                            onClick={() => deleteDocument(data.id)}
                            className="m-4"
                          >
                            削除する
                          </Button>
                        </div>
                      )}
                    </>
                  )}

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
                        value={title1}
                        onChange={(event) => setPostTitle(event.target.value)}
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
                        onChange={(event) => setContext(event.target.value)}
                      />
                      <br></br>
                      <Button variant="outlined" onClick={updatefields}>
                        更新する
                      </Button>
                      <br></br>
                    </Box>
                  )}
                  <p className="flex justify-center">
                    <Image
                      className="m-auto text-center max-w-sm"
                      height={500}
                      width={500}
                      src={data.downloadURL}
                    />
                  </p>
                  <div>
                    {data.id}
                    <div gutterBottom variant="h5" component="div">
                      {data.title}
                    </div>
                    <br></br>
                    投稿日時：{data.createtime}
                    <br></br>
                    <br></br>
                    {data.selected &&
                      data.selected.map((tag, i) => (
                        <span className="text-cyan-700" key={i}>
                          #{tag}　
                        </span>
                      ))}
                    <br></br>
                    <br></br>
                    <div variant="body2" color="text.secondary">
                      {data.categori == "ONE PIECE" && (
                        <span className="bg-blue-500 p-2 inline-block text-white text-center">
                          <Link href={`/post/category/${data.categori}`}>
                            {data.categori}
                          </Link>
                        </span>
                      )}
                      {data.categori == "呪術廻戦" && (
                        <span className="bg-purple-500 p-2 inline-block text-white text-center">
                          <Link href={`/post/category/${data.categori}`}>
                            {data.categori}
                          </Link>
                        </span>
                      )}
                      {data.categori == "東京リベンジャーズ" && (
                        <span className="bg-rose-500 p-2 inline-block text-white text-center">
                          <Link href={`/post/category/${data.categori}`}>
                            {data.categori}
                          </Link>
                        </span>
                      )}
                      {data.categori == "キングダム" && (
                        <span className="bg-yellow-500 p-2 inline-block text-white text-center">
                          <Link href={`/post/category/${data.categori}`}>
                            {data.categori}
                          </Link>
                        </span>
                      )}
                      {data.netabare == "ネタバレ有" && (
                        <span className="bg-yellow-500 mt-2 p-1 inline-block text-white text-center m-4">
                          {data.netabare}
                        </span>
                      )}
                      {data.netabare == "ネタバレ無" && (
                        <span className="bg-blue-500 mt-2 p-1 inline-block text-white text-center m-4">
                          {data.netabare}
                        </span>
                      )}
                      <p className="text-left">{data.context}</p>
                      <br></br>
                      <br></br>
                      <p>いいね数：{data.likes}</p>
                      <br></br>
                      {user && (
                        <button
                          onClick={() => handleClick(data.id, data.likes)}
                          className=""
                        >
                          いいねする
                        </button>
                      )}
                      {data.contextimage && (
                        <p className="flex justify-center">
                          <Image
                            className="m-auto text-center max-w-sm"
                            height={500}
                            width={500}
                            src={data.contextimage}
                          />
                        </p>
                      )}
                      <div className="bg-slate-200 my-8 py-8">
                        <br></br>
                        <Avatar alt="Remy Sharp" src={data.photoURL} />
                        <br></br>
                        <span className="text-xl">
                          投稿者名：{data.displayname}
                        </span>
                        <br></br>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <br></br>
        <br></br>
      </div>
    </>
  );
};

export default Post;