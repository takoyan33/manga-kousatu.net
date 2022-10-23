import { useEffect, useState, useMemo } from "react";
import { database } from "../firebaseConfig";
import { collection, onSnapshot } from "firebase/firestore";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { MuiNavbar } from "../layouts/components/MuiNavbar";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Grid from "@material-ui/core/Grid";
import { Cardpost } from "../layouts/Cardpost";
import { Loginbutton } from "../layouts/components/button/loginbutton";
import { Registerbutton } from "../layouts/components/button/registerbutton";
import { createContext } from "react";
import { query, orderBy } from "firebase/firestore";
import { SiteButton } from "../layouts/components/button";
import { SiteCategory } from "../layouts/components/text";
import { GetPosts } from "./api/firestore/GetPosts";
import { Categories, SiteHead } from "../layouts/components/ui";

export const LoginContext = createContext(
  {} as {
    text: string;
  }
);

export default function Index() {
  const [firedata, setFiredata] = useState([]);
  // const { getData, handledesSort, handlelikeSort } = GetPosts();

  const databaseRef = collection(database, "CRUD DATA");
  const q = query(databaseRef, orderBy("timestamp", "desc"));
  //新しい順
  const u = query(databaseRef, orderBy("timestamp"));
  //古い順
  const f = query(databaseRef, orderBy("likes", "desc"));
  //いいね数順
  const [searchName, setSearchName] = useState("");
  const [loadIndex, setLoadIndex] = useState(6);
  const [isEmpty, setIsEmpty] = useState(false);

  let router = useRouter();
  const auth = getAuth();
  const user = auth.currentUser;

  // 新着順
  const getData = async () => {
    await onSnapshot(q, (querySnapshot) => {
      setFiredata(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  };

  //古い順
  const handledesSort = async () => {
    await onSnapshot(u, (querySnapshot) => {
      setFiredata(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  };

  //いいね順
  const handlelikeSort = async () => {
    await onSnapshot(f, (querySnapshot) => {
      setFiredata(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  };

  // 絞り込みの分離途中
  // const Searchposts = useMemo(() => {
  //   return firedata
  //     .filter((data) => {
  //       if (searchName === "") {
  //         return data;
  //         //そのまま返す
  //       } else if (
  //         data.title.toLowerCase().includes(searchName.toLowerCase())
  //         //valのnameが含んでいたら小文字で返す　含んでいないvalは返さない
  //       ) {
  //         return data;
  //       }
  //     })
  //     .slice(0, loadIndex);
  // }, [firedata]);

  useEffect(() => {
    getData();
  }, []);

  const displayMore = () => {
    if (loadIndex > firedata.length) {
      setIsEmpty(true);
    } else {
      setLoadIndex(loadIndex + 4);
    }
  };

  return (
    <div>
      <SiteHead />
      <MuiNavbar />

      <div className="max-w-7xl m-auto">
        <br></br>
        <br></br>
        <p className="text-center">
          <img
            src="./images/book-reading.png"
            className="w-40  my-6 m-auto"
            alt="漫画のイラスト"
          />
        </p>
        <h2 className="my-5 text-center">
          <img
            src="./magastudylogo.png"
            className="w-80 my-12 m-auto"
            alt="mangastudyのロゴ"
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
              <LoginContext.Provider value={{ text: "ログイン" }}>
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
            <SiteButton
              href="/post"
              text="新規投稿をする"
              className="m-auto w-50 my-2"
            />
          </div>
        )}

        <h2 className="my-12 text-center text-2xl font-semibold">
          カテゴリから選ぶ
        </h2>
        {Categories.map((categori) => (
          <SiteCategory
            key={categori.id}
            className={`p-1 inline-block text-white text-center m-6 + ${categori.className}`}
            text={categori.title}
            href={categori.link}
          />
        ))}

        <h2 className="my-12 text-center text-2xl font-semibold">
          新規投稿一覧
        </h2>

        <p className="text-1xl text-center">投稿数　{firedata.length}件</p>
        <br></br>
        <TextField
          id="outlined-basic"
          label="考察記事を検索する"
          variant="outlined"
          onChange={(event) => {
            setSearchName(event.target.value);
          }}
        />
        <div className="flex mt-4">
          <SiteButton
            href=""
            text="新しい順"
            className="inline my-2 m-4"
            onClick={getData}
          />
          <SiteButton
            href=""
            text="古い順"
            className="inline my-2 m-4"
            onClick={handledesSort}
          />
          <SiteButton
            href=""
            text="いいね順"
            className="inline my-2 m-4"
            onClick={handlelikeSort}
          />
        </div>

        <br></br>
        <br></br>
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
            .slice(0, loadIndex)
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
        <div className="text-center">
          <SiteButton
            href=""
            text="さらに表示"
            disabled={isEmpty ? true : false}
            onClick={displayMore}
            className="m-auto w-50 my-2"
          />
        </div>
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
