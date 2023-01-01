/* eslint-disable jsx-a11y/alt-text */
import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { database } from "../../firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Image from "react-image-resizer";
import Avatar from "@mui/material/Avatar";
import { SiteButton } from "../../layouts/components/button";
import { SiteCategory } from "../../layouts/components/text";
import { Cardpost } from "../../layouts/Cardpost";
import { SiteHead } from "../../layouts/components/ui";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import { query, orderBy } from "firebase/firestore";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const Post = () => {
  const [ID, setID] = useState(null);
  const [context, setContext] = useState("");
  const [categori, setCategori] = useState("");
  const [photoURL, setPhotoURL] = useState();
  const [users, setUsers] = useState(null);
  const [postid, setPostid] = useState("");
  const [createtime, setCreatetime] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [posttitle, setPostTitle] = useState("");
  const databaseRef = collection(database, "posts");
  //データベースを取得
  const [firedata, setFiredata] = useState([]);
  const [recfiredata, setRecfiredata] = useState([]);
  const [downloadURL, setDownloadURL] = useState(null);
  const [likecount, setLikecount] = useState(0);
  const usersRef = collection(database, "users");
  const [userid, setUserid] = useState(null);
  const [netabare, setNetabare] = useState("");
  const [likes, setLikes] = useState(null);
  const [selected, setSelected] = useState(["最終回"]);
  //データベースを取得
  const q = query(databaseRef, orderBy("timestamp", "desc"));

  const router = useRouter();
  const routerid = router.query.id;
  // const { id } = router.query;
  const auth = getAuth();
  const user = auth.currentUser;
  const styles = { whiteSpace: "pre-line" };

  // console.log({ id });

  const getallPost = async () => {
    const ref = doc(database, "posts", routerid);
    getDoc(ref).then((snap) => {
      setRecfiredata(snap.data());
    });
  };

  const categoriFiredata = async () => {
    //firestoreからデータ取得
    await getDocs(q).then((querySnapshot) => {
      //コレクションのドキュメントを取得
      setRecfiredata(
        querySnapshot.docs.map((data) => {
          //配列なので、mapで展開する
          return { ...data.data(), id: data.id };
          //スプレッド構文で展開して、新しい配列を作成
        })
        // .filter((data) => {
        //   if (data.categori === firedata.categori) {
        //     return data;
        //     //そのまま返す
        //   } else if (
        //     data.categori.toLowerCase().includes(firedata.categori)
        //     //valのnameが含んでいたら小文字で返す　含んでいないvalは返さない
        //   ) {
        //     return data;
        //   }
        // })
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
    netabare,
    photoURL,
    userid,
    likes,
    selected
  ) => {
    setID(id);
    setContext(context);
    setPostTitle(title);
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
    // categoriFiredata();
    getallPost();
    // usersData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [routerid]);

  const updatefields = () => {
    //更新する
    const fieldToEdit = doc(database, "posts", ID);
    const newdate = new Date().toLocaleString("ja-JP");
    //セットしたIDをセットする
    updateDoc(fieldToEdit, {
      title: posttitle,
      context: context.replace(/\r?\n/g, "\n"),
      edittime: newdate,
      //改行を保存する
    })
      .then(() => {
        alert("記事を更新しました");
        setPostTitle("");
        setContext("");
        setIsUpdate(false);
        // router.push(`${ID}`);
        // getallPost();
        // usersData();
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteDocument = (id) => {
    //data.idを送っているのでidを受け取る
    let fieldToEdit = doc(database, "posts", id);
    let checkSaveFlg = window.confirm("削除しても大丈夫ですか？");
    //確認画面を出す

    if (checkSaveFlg) {
      deleteDoc(fieldToEdit)
        //記事を削除する
        .then(() => {
          alert("記事を削除しました");
          router.push("/");
          getallPost();
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

    let fieldToEdit = doc(database, "posts", id);
    updateDoc(fieldToEdit, {
      likes: likes + 1,
    })
      .then(() => {
        console.log(likecount);
        setLikecount(0);
        getallPost();
      })
      .catch((err) => {
        alert("失敗しました");
        console.log(err);
      });
  };
  return <>{routerid}</>;
};

export default Post;
