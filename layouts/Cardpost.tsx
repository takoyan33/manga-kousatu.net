import React from "react";
import Link from "next/link";
import { useEffect, useState, useMemo, useCallback } from "react";
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
import styles from "../styles/Home.module.css";
import { updatePassword } from "firebase/auth";
import { MuiNavbar } from "./components/MuiNavbar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@material-ui/core/Grid";
import Head from "next/head";
import { getStorage } from "firebase/storage";
import Image from "react-image-resizer";
import Categori from "./components/text/Categori";
import Avater from "./components/text/Avater";
import Openbutton from "./components/button/Openbutton";

type Props = {
  downloadURL: string;
  id: number;
  title: string;
  categori: string;
  netabare: string;
  context: string;
  email: string;
  photoURL: string;
  displayname: string;
  createtime: string;
  likecount: number;
};

// eslint-disable-next-line react/display-name
export const Cardpost: React.VFC<Props> = React.memo(
  ({
    downloadURL,
    id,
    title,
    categori,
    netabare,
    displayname,
    context,
    email,
    photoURL,
    createtime,
    likecount,
  }) => {
    const [opentext, setOpentext] = useState<boolean>(false);
    const databaseRef = collection(database, "CRUD DATA");
    const style: React.CSSProperties = {
      whiteSpace: "pre-line",
    };
    const cardstyles: React.CSSProperties = {
      margin: "15px",
    };

    let router = useRouter();
    const auth = getAuth();
    const user = auth.currentUser;

    const deleteDocument = useCallback((id) => {
      let fieldToEdit = doc(database, "CRUD DATA", id);
      let checkSaveFlg = window.confirm("????????????????????????????????????");

      if (checkSaveFlg) {
        deleteDoc(fieldToEdit)
          .then(() => {
            alert("???????????????????????????");
          })
          .catch((err) => {
            alert("????????????????????????????????????");
          });
      } else {
        router.push("/home");
      }
    }, []);

    const Opentext = () => {
      if (opentext == false) {
        setOpentext(true);
      } else {
        setOpentext(false);
      }
    };

    // const Opentext = useCallback(() => {
    //   if (opentext == false) {
    //     setOpentext(true);
    //   } else {
    //     setOpentext(false);
    //   }
    // }, []);

    console.log(displayname);
    console.log(photoURL);
    console.log(categori);
    console.log(user);
    console.log(id);
    console.log(title);

    return (
      <div>
        <Grid key={id} className="flex m-auto">
          <Card className="m-8" style={cardstyles}>
            <p className="m-auto text-center">
              <Image
                className="m-auto text-center max-w-sm"
                height={300}
                width={300}
                src={downloadURL}
              />
            </p>

            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                {title}
              </Typography>
              <Categori categori={categori} />
              {netabare == "???????????????" && (
                <div>
                  <p className="bg-yellow-500 mt-2 p-1 inline-block text-white text-center">
                    {netabare}
                  </p>
                  <br></br>

                  <Openbutton text="???????????????" onClick={Opentext} />

                  {opentext == true && <p className="">{context}</p>}
                </div>
              )}
              {netabare == "???????????????" && (
                <p className="bg-blue-500 mt-2 p-1 inline-block text-white text-center">
                  {netabare}
                </p>
              )}
              <br></br>
              <div className="w-80 m-auto" style={styles}>
                {netabare == "???????????????" && <p className="">{context}</p>}
              </div>
              <Avater photoURL={photoURL} displayname={displayname} />
              ???????????????{createtime}
              {/* {likecount}
              <button onClick={() => setcount(count + 1)}>???????????????</button> */}
            </CardContent>
          </Card>
        </Grid>
      </div>
    );
  }
);
