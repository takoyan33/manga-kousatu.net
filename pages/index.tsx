import Link from "next/link";
import { useEffect, useState } from "react";
import { app, database } from "../firebaseConfig";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { MuiNavbar } from "../layouts/components/MuiNavbar";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Grid from "@material-ui/core/Grid";
import Head from "next/head";
import { Cardpost } from "../layouts/Cardpost";
import Avatar from "@mui/material/Avatar";
import { Loginbutton } from "../layouts/components/button/loginbutton";
import { Registerbutton } from "../layouts/components/button/registerbutton";
import { createContext } from "react";

export const LoginContext = createContext(
  {} as {
    text: string;
  }
);

export default function Index() {
  const [ID, setID] = useState(null);
  const [title, setTitle] = useState<string>("");
  const [context, setContext] = useState<string>("");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [categori, setCategori] = useState<string>("");
  const [firedata, setFiredata] = useState([]);
  const [createtime, setCreatetime] = useState("");
  const [isUpdate, setIsUpdate] = useState<boolean>(false);
  const databaseRef = collection(database, "CRUD DATA");
  const [displayname, setDisplayName] = useState<string>("");
  const [createObjectURL, setCreateObjectURL] = useState<string>(null);
  const [downloadURL, setDownloadURL] = useState<string>(null);
  const [image, setImage] = useState<string>("");
  const [result, setResult] = useState<string>("");
  const [photoURL, setPhotoURL] = useState<string>("");
  const [likes, setLikes] = useState<number>(null);
  const [userid, setUserid] = useState<string>(null);
  const [netabare, setNetabare] = useState<string>("");
  const [opentext, setOpentext] = useState<boolean>(false);
  const styles = { whiteSpace: "pre-line" };
  const [searchName, setSearchName] = useState("");
  const [selected, setSelected] = useState(["最終回"]);

  let router = useRouter();
  const auth = getAuth();
  const user = auth.currentUser;

  useEffect(() => {
    getData();
  }, []);

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
    title,
    context,
    downloadURL,
    categori,
    cratetime,
    displayname,
    netabare,
    photoURL,
    userid,
    likes,
    selected
  ) => {
    setID(id);
    setContext(context);
    setTitle(title);
    setName(name);
    setDisplayName(displayname);
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
  };

  const updatefields = () => {
    let fieldToEdit = doc(database, "CRUD DATA", ID);
    updateDoc(fieldToEdit, {
      title: title,
      context: context.replace(/\r?\n/g, "\n"),
    })
      .then(() => {
        alert("記事を更新しました");
        setContext("");
        setTitle("");
        setIsUpdate(false);
        getData();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const Opentext = () => {
    if (opentext == false) {
      setOpentext(true);
    } else {
      setOpentext(false);
    }
  };

  return (
    <div>
      <Head>
        <title>Manga Study</title>
        <meta name="description" content="漫画考察.net" />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@500&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <MuiNavbar />
      <div className="max-w-7xl m-auto">
        <br></br>
        <br></br>
        <p className="text-center">
          <img src="./images/book-reading.png" className="w-40  my-6 m-auto" alt="漫画のイラスト" />
        </p>
        <h2 className="my-5 text-center">
          <img
            src="./images/magastudylogo.png"
            className="w-80 my-12 m-auto"
            alt="ロゴ"
          />
        </h2>
        <p className="my-5 text-center">
          Manga Studyでは、人気漫画の考察を<br></br>
          自由に投稿・閲覧できるwebサイトです。
          <br></br> ※非収益サイトです
        </p>
        <br></br>

        {!user && (
          <>
            <Stack className="text-center m-auto w-full ">
              <Registerbutton text="新規登録はこちら" />
              <br></br>
              {/* usecontextを使用 valueを送る*/}
              <LoginContext.Provider value={{ text: "ログインはこちらです" }}>
                {/* loginbuttonに向けて*/}
                <Loginbutton />
              </LoginContext.Provider>
              <br></br>
              <div></div>
            </Stack>
          </>
        )}

        {user && (
          <div className="lg:text-right text-center">
            <Button variant="outlined" className="">
              <Link href="/post">新規投稿をする</Link>
            </Button>
          </div>
        )}
        <h2 className="my-12 text-center text-2xl font-semibold">
          カテゴリから選ぶ
        </h2>
        <p className="bg-blue-500 p-1 inline-block text-white text-center m-6">
          <Link href="/post/category/ONE PIECE">ONE PIECE</Link>
        </p>
        <p className="bg-purple-500 p-1 inline-block text-white text-center m-6">
          <Link href="/post/category/呪術廻戦">呪術廻戦</Link>
        </p>
        <p className="bg-rose-500 p-1 inline-block text-white text-center m-6">
          <Link href="/post/category/東京リベンジャーズ">
            東京リベンジャーズ
          </Link>
        </p>
        <p className="bg-yellow-500 p-1 inline-block text-white text-center m-6">
          <Link href="/post/category/キングダム">キングダム</Link>
        </p>

        <h2 className="my-12 text-center text-2xl font-semibold">
          新規投稿一覧
        </h2>
        <p className="text-1xl text-center">投稿数　{firedata.length}件</p>
        <br></br>
        <input
          type="text"
          placeholder="🔍考察記事を検索する"
          onChange={(event) => {
            setSearchName(event.target.value);
          }}
        />
        <br></br>
        <br></br>
        <Grid container className="m-auto">
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
              );
            })}
        </Grid>

        <br></br>
        <br></br>
        <div>
          <p>© 尾田栄一郎／集英社・フジテレビ・東映アニメーション</p>
          <p>© 和久井健・講談社／アニメ「東京リベンジャーズ」</p>
          <p>©原泰久／集英社・キングダム製作委員会</p>
          <p>©芥見下々／集英社・呪術廻戦製作委員会</p>
        </div>
      </div>
    </div>
  );
}
