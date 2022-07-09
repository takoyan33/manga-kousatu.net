import React from "react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { app, database } from "../firebaseConfig";
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
import { getAuth } from "firebase/auth";
import { updatePassword } from "firebase/auth";
import { MuiNavbar } from "../layouts/MuiNavbar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { postImage } from "./api/upload";

export default function UploadImage() {
  const [image, setImage] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState(null);


  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      setImage(file);
      setCreateObjectURL(URL.createObjectURL(file));
      console.log(file);
    }
  };

  const uploadToServer = async () => {
    const result = await postImage(image);
    console.log(result);
    alert("データを送りました");
  };

  return (
    <div title="upload image">
      <MuiNavbar />
      <div className="mb-4">this is upload image screen</div>
      <img className="flex justify-center items-center" src={createObjectURL} />
      <label
        htmlFor="file-input"
        className="bg-primary-900 text-white-900 dark:bg-dark-900 flex justify-center items-center px-4 py-2 rounded mb-6 w-full"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-10 w-10 hover:cursor-pointer hover:bg-gray-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </label>
      <input
        id="file-input"
        className="hidden"
        type="file"
        accept="image/*"
        name="myImage"
        onChange={uploadToClient}
      />
      <button
        className="btn btn-primary"
        type="submit"
        onClick={uploadToServer}
      >
        投稿する
      </button>
    </div>
  );
}
