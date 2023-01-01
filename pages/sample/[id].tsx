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

  console.log(routerid);

  return (
    <>
      <p>aaaa</p>
    </>
  );
};

export default Post;
