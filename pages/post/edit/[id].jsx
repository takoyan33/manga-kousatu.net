import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { app, database, storage } from "../../../firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { MuiNavbar } from "../../../layouts/components/MuiNavbar";
import { Stack } from "@mui/material";
import TextField from "@mui/material/TextField";
import Image from "react-image-resizer";
import Avatar from "@mui/material/Avatar";
import { Categories, SiteHead } from "../../../layouts/components/ui";

const Post = () => {
  const [ID, setID] = useState(null);
  const [context, setContext] = useState("");
  const [categori, setCategori] = useState("");
  const [photoURL, setPhotoURL] = useState();
  const [users, setUsers] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [createtime, setCreatetime] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [posttitle, setPostTitle] = useState("");
  const databaseRef = collection(database, "posts");
  //データベースを取得
  const [firedata, setFiredata] = useState([]);
  const [downloadURL, setDownloadURL] = useState(null);
  const [likecount, setLikecount] = useState(0);
  const usersRef = collection(database, "users");
  const [userid, setUserid] = useState(null);
  const [netabare, setNetabare] = useState("");
  const [likes, setLikes] = useState(null);
  const [selected, setSelected] = useState(["最終回"]);

  const router = useRouter();
  const { id } = router.query;
  const auth = getAuth();
  const user = auth.currentUser;

  console.log({ id });

  const getallPost = async () => {
    //firestoreからデータ取得
    const data = doc(database, "posts", id);
    getDoc(data).then((documentSnapshot) => {
      setFiredata(documentSnapshot.data());
    });
  };

  useEffect(() => {
    getID();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likes]);

  const getID = () => {
    setID(id);
    setContext(firedata.context);
    setPostTitle(firedata.title);
    // setDownloadURL(downloadURL);
    // setIsUpdate(true);
    // setCategori(categori);
    // setCreatetime(cratetime);
    // setNetabare(netabare);
    // setPhotoURL(photoURL);
    // setUserid(userid);
    // setLikes(likes);
    // setSelected(selected);
    console.log(title);
    console.log(context);
  };

  // getallPost();
  // usersData();

  // const updatefields = () => {
  //   //更新する
  //   let fieldToEdit = doc(database, "posts", ID);
  //   const newdate = new Date().toLocaleString("ja-JP");
  //   //セットしたIDをセットする
  //   updateDoc(fieldToEdit, {
  //     title: posttitle,
  //     context: context.replace(/\r?\n/g, "\n"),
  //     edittime: newdate,
  //     //改行を保存する
  //   })
  //     .then(() => {
  //       alert("記事を更新しました");
  //       setPostTitle("");
  //       setContext("");
  //       setIsUpdate(false);
  //       router.push(`post/${ID}`);
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //     });
  // };

  return (
    <>
      <SiteHead />
      <MuiNavbar />

      <div className="max-w-5xl m-auto">
        <div>
          <div>
            <div className="lg:w-full my-4 ">
              <Stack
                component="form"
                className="m-auto"
                noValidate
                spacing={2}
                sx={{ width: "38ch" }}
              >
                <div>
                  <p>タイトル</p>
                </div>
                <div>
                  <TextField
                    id="outlined-basic"
                    label="タイトル（最大20文字)"
                    variant="outlined"
                    type="text"
                    value={posttitle}
                    onChange={(event) => setPostTitle(event.target.value)}
                  />
                </div>
                <div>
                  <p>内容(最大500文字）</p>
                </div>
                <TextField
                  label="内容(最大500文字）"
                  className="m-auto w-full"
                  id="filled-multiline-static"
                  multiline
                  rows={14}
                  type="text"
                  value={firedata.title}
                  onChange={(event) => setContext(event.target.value)}
                />
                {/* <Button variant="outlined" onClick={updatefields}>
                  更新する
                </Button> */}
              </Stack>
              <Link href="/">トップ</Link>　＞　投稿記事　＞　 {firedata.title}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
