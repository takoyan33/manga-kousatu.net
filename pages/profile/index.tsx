import React from "react";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { database } from "../../firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { useRouter } from "next/router";
import { getAuth, deleteUser } from "firebase/auth";
import { MuiNavbar } from "../../layouts/components/MuiNavbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Grid from "@material-ui/core/Grid";
import { SiteHead } from "../../layouts/components/ui";
import Image from "react-image-resizer";
import { Profileid } from "../../layouts/components/ui/Profileid";
import { Cardpost } from "../../layouts/Cardpost";

export default function Profile() {
  const [ID, setID] = useState(null);
  const [title, setTitle] = useState<string>("");
  const [context, setContext] = useState<string>("");
  const [file, setFile] = useState("");
  const [categori, setCategori] = useState<string>("");
  const [photoURL, setPhotoURL] = useState<string>();
  const [displayName, setDisplayName] = useState<string>("");
  const [createtime, setCreatetime] = useState<string>("");
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const databaseRef = collection(database, "CRUD DATA");
  const usersRef = collection(database, "users");
  const [users, setUsers] = useState(null);
  //データベースを取得
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [firedata, setFiredata] = useState([]);
  const [downloadURL, setDownloadURL] = useState<string>(null);
  const [likecount, setLikecount] = useState(0);
  const [image, setImage] = useState("");
  const [result, setResult] = useState<string>("");
  const [email, setEmail] = useState("");
  const [userid, setUserid] = useState<string>(null);
  const [netabare, setNetabare] = useState<string>("");
  const [opentext, setOpentext] = useState<boolean>(false);
  const [searchName, setSearchName] = useState("");

  const styles = { whiteSpace: "pre-line" };
  let router = useRouter();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    let token = sessionStorage.getItem("Token");
    if (!token) {
      router.push("/register");
    } else {
      getData();
      usersData();
    }
  }, []);

  const getData = async () => {
    //firestoreからデータ取得
    await getDocs(databaseRef).then((response) => {
      //コレクションのドキュメントを取得
      setFiredata(
        response.docs.map((data) => {
          //配列なので、mapで展開する
          return { ...data.data(), id: data.id };
          //スプレッド構文で展開して、新しい配列を作成
        })
      );
    });
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
    // const uid = user.uid;
    // const userdata = doc(database, "users", uid);
    // getDoc(userdata).then((documentSnapshot) => {
    //   setFiredata(documentSnapshot.data());
    // });
  };

  const deleteuser = async () => {
    //userを削除する
    if (user) {
      deleteUser(user)
        //user削除
        .then(() => {
          sessionStorage.removeItem("Token");
          //tokenを削除
          alert("退会しました。TOP画面に戻ります。");
          router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
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

  return (
    <>
      <SiteHead />
      <MuiNavbar />
      <div className="max-w-7xl m-auto">
        <h2 className="m-5 my-12 text-center text-2xl font-semibold">
          プロフィール
        </h2>

        <>
          {users &&
            users.map((data) => {
              return (
                <>
                  {data.email == user.email && (
                    <Profileid
                      key={data.id}
                      profileimage={data.profileimage}
                      username={data.username}
                      bio={data.bio}
                      favarite={data.favarite}
                      id={0}
                    />
                  )}
                </>
              );
            })}
        </>
        <Button variant="outlined" className="my-5">
          <Link href="/profile/edit"> プロフィールを変更する</Link>
        </Button>

        <p className="my-12 text-center text-2xl font-semibold">過去の投稿</p>
        <p className="text-1xl text-center">投稿数　{firedata.length}件</p>
        <TextField
          type="text"
          id="outlined-basic"
          label="考察記事を検索する"
          variant="outlined"
          onChange={(event) => {
            setSearchName(event.target.value);
          }}
        />

        <Grid container className="m-auto">
          {firedata == [] && <p>まだ投稿していません</p>}
          {firedata
            .filter((data) => {
              if (searchName === "") {
                return data;
                //そのまま返す
              } else if (
                data.title.toLowerCase().includes(searchName.toLowerCase())
                //valのnameが含んでいたら小文字で返す　含んでいないvalは返さない
              ) {
                return data;
              }
            })
            .map((data) => {
              return (
                <>
                  {data.email == user.email && (
                    <Cardpost
                      key={data.id}
                      downloadURL={data.downloadURL}
                      title={data.title}
                      categori={data.categori}
                      netabare={data.netabare}
                      context={data.context}
                      createtime={data.createtime}
                      displayname={data.displayname}
                      email={data.email}
                      id={data.id}
                      photoURL={data.photoURL}
                      likes={data.likes}
                      selected={data.selected}
                    />
                  )}
                </>
              );
            })}
        </Grid>

        <br></br>

        {/* <Button variant="outlined" className="m-5">
          <Link href="/profile/emailedit">メールアドレスを変更する</Link>
        </Button> */}
        {/* <Button variant="outlined" className="myy-5">
          <Link href="/profile/passwordedit">パスワードを変更する</Link>
        </Button> */}
        <br></br>

        <Button variant="outlined" className="my-5" onClick={deleteuser}>
          アカウントを退会する
        </Button>
      </div>
    </>
  );
}
