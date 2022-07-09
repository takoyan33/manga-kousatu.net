import Link from "next/link";
import { useEffect, useState } from "react";
import { app, database, ref } from "../firebaseConfig";
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
import { MuiNavbar } from "../layouts/MuiNavbar";
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

export default function Home() {
  const [ID, setID] = useState(null);
  const [title, setTitle] = useState("");
  const [context, setContext] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState(null);
  const [categori, setCategori] = useState("");
  const [firedata, setFiredata] = useState([]);
  const [createtime, setCreatetime] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const databaseRef = collection(database, "CRUD DATA");
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [downloadURL, setDownloadURL] = useState(null);
  const [image, setImage] = useState("");
  const [result, setResult] = useState("");
  let router = useRouter();

  const auth = getAuth();
  const user = auth.currentUser;
  console.log(user);
  useEffect(() => {
    let token = sessionStorage.getItem("Token");

    if (token) {
      getData();
    }
    if (!token) {
      router.push("/register");
    }
  }, []);

  const addDate = () => {
    addDoc(databaseRef, {
      title: title,
      context: context,
      // name: name,
      email: user.email,
      downloadURL: result,
      email: user.email,
      categori: categori,
      // age: Number(age),
    })
      .then(() => {
        alert("データ送った");
        setContext("");
        setTitle("");
        setCategori("");
        // setName("");
        getData();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const getData = async () => {
    await getDocs(databaseRef).then((response) => {
      setFiredata(
        response.docs.map((data) => {
          return { ...data.data(), id: data.id };
        })
      );
    });
  };

  const getID = (
    id,
    name,
    age,
    title,
    context,
    downloadURL,
    categori,
    cratetime
  ) => {
    setID(id);
    setContext(context);
    setTitle(title);
    setName(name);
    setAge(age);
    setDownloadURL(downloadURL);
    setIsUpdate(true);
    setCategori(categori);
    setCreatetime(cratetime);
  };

  const updatefields = () => {
    let fieldToEdit = doc(database, "CRUD DATA", ID);
    updateDoc(fieldToEdit, {
      title: title,
      context: context,
      email: user.email,
      downloadURL: result,
      categori: categori,
      // name: name,
    })
      .then(() => {
        alert("更新したよ");
        setContext("");
        setTitle("");
        setName("");
        setAge(null);
        setIsUpdate(false);
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteDocument = (id) => {
    let fieldToEdit = doc(database, "CRUD DATA", id);
    let checkSaveFlg = window.confirm("削除しても大丈夫ですか？");

    if (checkSaveFlg) {
      deleteDoc(fieldToEdit)
        .then(() => {
          alert("削除しました");
          getData();
        })
        .catch((err) => {
          alert("削除に失敗しました");
        });
    } else {
      router.push("/home");
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>漫画考察.net/ホーム画面</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <MuiNavbar />
      <br></br>
      <div className="max-w-7xl m-auto">
        <div className="lg:text-right text-center">
          <Button variant="outlined" className="">
            <Link href="/post">新規投稿をする</Link>
          </Button>
        </div>
        <h2 className="m-5 my-12 text-center text-2xl font-semibold">
          投稿一覧
        </h2>
        {/* <p className="">投稿数　</p> */}

        <Grid container spacing={1}>
          {firedata.map((data) => {
            return (
              <Grid key={data.id} className="flex m-auto">
                <Card className="lg:w-full my-4">
                  {/* <CardMedia
                    component="img"
                    height="140"
                    className="w-100 h-100"
                    image={data.downloadURL}
                    alt=""
                  /> */}
                  <p className="m-auto text-center">
                    <Image
                      className="m-auto text-center"
                      height={300}
                      width={300}
                      src={data.downloadURL}
                    />
                  </p>
                  {/* <img src={data.downloadURL} /> */}
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {data.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      <p className="bg-blue-500 p-2 inline-block text-white text-center">
                        {data.categori}
                      </p>
                      <br></br>
                      <br></br>
                      {data.context}
                      <br></br>
                      {data.name}
                      <br></br>
                      {data.createtime}
                    </Typography>
                  </CardContent>
                  {user.email == data.email && (
                    <CardActions>
                      <Button
                        variant="outlined"
                        onClick={() =>
                          getID(
                            data.id,
                            data.name,
                            data.age,
                            data.title,
                            data.context
                          )
                        }
                      >
                        更新する
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => deleteDocument(data.id)}
                      >
                        削除する
                      </Button>
                    </CardActions>
                  )}
                </Card>
              </Grid>
            );
          })}
        </Grid>

        <br></br>
        <br></br>
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
              value={title}
              onChange={(event) => setTitle(event.target.value)}
            />
            <br></br>
            <TextField
              id="outlined-basic"
              label="内容(最大500文字）"
              variant="outlined"
              type="text"
              value={context}
              onChange={(event) => setContext(event.target.value)}
            />
            <br></br>
            <TextField
              id="outlined-basic"
              label="名前(最大20文字）"
              variant="outlined"
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
            />
            <br></br>
            <Button variant="outlined" onClick={updatefields}>
              更新する
            </Button>
          </Box>

          // {isUpdate ? (
          //   <Button variant="outlined" onClick={updatefields}>
          //     更新する
          //   </Button>
          // ) : (
          //   <Button variant="outlined" onClick={addDate}>
          //     投稿する
          //   </Button>
          // )}
        )}
      </div>
    </div>
  );
}
