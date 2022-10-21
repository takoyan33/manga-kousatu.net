import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { app, database } from "../../../firebaseConfig";
import { collection, getDocs, doc, Firestore } from "firebase/firestore";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import Image from "react-image-resizer";
import Avatar from "@mui/material/Avatar";

type Props = {
  profileimage: string;
  id: number;
  username: string;
  bio: string;
  favarite: string[];
};

// eslint-disable-next-line react/display-name
export const Profilepost: React.VFC<Props> = React.memo(
  ({ id, profileimage, username, bio, favarite }) => {
    return (
      <div key={id}>
        <p>
          <Image
            className="m-auto text-center max-w-sm"
            height={100}
            width={100}
            src={profileimage}
          />
        </p>
        <p className="m-5">名前：{username}</p>
        <p className="m-5">プロフィール：{bio}</p>
        <p className="m-5">好きな漫画：{favarite}</p>
      </div>
    );
  }
);
