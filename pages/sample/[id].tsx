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
  const router = useRouter();
  const routeId = router.query.id;
  console.log(routeId);

  return (
    <>
      <p>aaaa</p>
    </>
  );
};

export default Post;
