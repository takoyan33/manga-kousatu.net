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
export const Profileid: React.VFC<Props> = React.memo(
  ({ id, profileimage, username, bio, favarite }) => {
    return (
      <div className="">
        <h2 className="m-5 my-12 text-center text-2xl font-semibold">
          {username} さんのプロフィール
        </h2>
        <div className="flex m-auto max-w-md">
          <div key={id}>
            <p>
              <Avatar
                className="m-auto text-center max-w-sm border"
                alt="プロフィール"
                sx={{ width: 150, height: 150 }}
                src={profileimage}
              />
            </p>
          </div>
          <div className="">
            <p className="m-5 text-lg">{username}</p>
            <h2 className="m-5">好きな漫画</h2>
            <div className="m-5">
              {favarite &&
                favarite.map((favarite, i) => (
                  <p className="text-cyan-700 my-2" key={i}>
                    {favarite}　
                  </p>
                ))}
            </div>
          </div>
        </div>
        <div className="max-w-md m-auto my-10">
          <h2 className="m-5">プロフィール</h2>
          <p className="m-5">{bio}</p>
        </div>
      </div>
    );
  }
);
