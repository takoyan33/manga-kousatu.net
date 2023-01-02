import { useEffect, useState, useMemo } from "react";
import { database } from "../firebaseConfig";
import { collection, onSnapshot, getDocs } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { MuiNavbar } from "../layouts/components/MuiNavbar";
import TextField from "@mui/material/TextField";
import Grid from "@material-ui/core/Grid";
import { Cardpost } from "../layouts/Cardpost";
import { query, orderBy } from "firebase/firestore";
import { SiteButton } from "../layouts/components/button";
import { SiteCategory } from "../layouts/components/text";
import { useGetPosts } from "../layouts/components/hooks/useGetPosts";
import { Categories, SiteHead } from "../layouts/components/ui";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Changetab } from "../layouts/components/ui/Changetab";

export default function Index() {
  const [firedata, setFiredata] = useState([]);
  const [bool, setBool] = useState([]);
  // const { getallPost, getallOldpost, getallLikepost } = GetPosts();
  const databaseRef = collection(database, "posts");
  const q = query(databaseRef, orderBy("timestamp", "desc"));

  //新しい順
  const u = query(databaseRef, orderBy("timestamp"));
  //古い順
  const f = query(databaseRef, orderBy("likes", "desc"));
  //いいね数順
  const [searchName, setSearchName] = useState("");
  const [loadIndex, setLoadIndex] = useState(6);
  const [isEmpty, setIsEmpty] = useState(false);
  const [loading, setLoading] = useState(false);

  const auth = getAuth();
  const user = auth.currentUser;

  // 新着順…
  const getallPost = async () => {
    console.log(loading);
    await onSnapshot(q, (querySnapshot) => {
      setFiredata(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
    setLoading(false);
  };

  console.log(firedata);

  // const getall = async () => {
  //   const res = await fetch(
  //     "https://firestore.googleapis.com/v1/projects/next-auth-app-2aa40/databases/(default)/documents/posts"
  //   );
  //   const data = await res.json();
  //   var array = Object.keys(data).map(function (key) {
  //     return data[key];
  //   });
  //   // console.log(Array.isArray(data));
  //   console.log(array[0]);

  //   const paths = array[0].map((post) => {
  //     return {
  //       params: { id: post.fields.id.stringValue.toString() },
  //     };
  //   });
  // };

  //古い順
  const getallOldpost = async () => {
    await onSnapshot(u, (querySnapshot) => {
      setFiredata(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  };

  //いいね順
  const getallLikepost = async () => {
    await onSnapshot(f, (querySnapshot) => {
      setFiredata(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  };

  useEffect(() => {
    setLoading(true);
    getallPost();
    // getall();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // const Posts = useMemo(() => {
  //   return firedata
  //     .filter((data) => {
  //       if (searchName === "") {
  //         return data;
  //         //そのまま返す
  //       } else if (
  //         data.title.toLowerCase().includes(searchName.toLowerCase())
  //         //data.titleが含んでいたら小文字で返す　含んでいないdataは返さない
  //       ) {
  //         return data;
  //       }
  //     })
  //     .slice(0, loadIndex);
  // }, [firedata]);

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

      <div className="text-center">
        <img
          src="./images/book-reading.png"
          className="w-40  my-6 m-auto"
          alt="漫画のイラスト"
        />
      </div>
      <div className="my-5 text-center">
        <img
          src="./magastudylogo.png"
          className="w-80 my-12 m-auto"
          alt="mangastudyのロゴ"
        />
      </div>
      <p className="my-5 text-center">
        Manga Studyでは、人気漫画の考察を<br></br>
        自由に投稿・閲覧できるwebサイトです。
        <br></br> ※非収益サイトです
      </p>
      {!user && (
        <>
          <SiteButton
            href="/register"
            text="新規登録"
            className="m-auto w-50 my-2 text-center"
          />

          <SiteButton
            href="/login"
            text="ログイン"
            className="m-auto w-50 my-2 text-center"
          />
        </>
      )}
      {user && (
        <div className="lg:text-right text-center">
          <SiteButton
            href="/post/new"
            text="新規投稿をする"
            className="m-auto w-50 my-2"
          />
        </div>
      )}

      <h2 className="my-12 text-center text-2xl font-semibold">
        カテゴリから選ぶ
      </h2>

      {Categories.map((categori) => {
        // userの情報
        const CategoriesInfo = {
          id: categori.id,
          title: categori.title,
        };
        return (
          <span key={categori.id}>
            <span
              className={`p-1 inline-block text-white text-center m-6 + ${categori.className}`}
            >
              <Link
                as={`/post/categories/${categori.title}`}
                href={{
                  pathname: categori.link,
                  query: CategoriesInfo,
                }}
              >
                <a>{categori.title}</a>
              </Link>
            </span>
          </span>
        );
      })}
      <Link href={"/sample/aaaa"} passHref>
        <a>aaaa</a>
      </Link>

      {/* {Categories.map((categori) => (
          <SiteCategory
            key={categori.id}
            className={`p-1 inline-block text-white text-center m-6 + ${categori.className}`}
            text={categori.title}
            href={categori.link}
          />
        ))} */}

      <h2 className="my-12 text-center text-2xl font-semibold">新規投稿一覧</h2>

      <p className="text-1xl text-center">投稿数　{firedata.length}件</p>
      <TextField
        id="outlined-basic"
        type="search"
        label="考察記事を検索する"
        variant="outlined"
        onChange={(event) => {
          setSearchName(event.target.value);
        }}
      />

      <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel id="demo-select-small">並び順</InputLabel>
        <Select
          labelId="demo-select-small"
          id="demo-select-small"
          label="並び順"
        >
          <MenuItem value="新しい順" onClick={getallPost}>
            新しい順
          </MenuItem>
          <MenuItem value="古い順" onClick={getallOldpost}>
            古い順
          </MenuItem>
          <MenuItem value="いいね順" onClick={getallLikepost}>
            いいね順
          </MenuItem>
        </Select>
      </FormControl>
      <Grid container className="m-auto">
        {firedata.length == 0 && (
          <p className="ext-cneter my-2">読み込み中・・・</p>
        )}
        {firedata
          .filter((data) => {
            if (searchName === "") {
              return data;
              //そのまま返す
            } else if (
              data.title.toLowerCase().includes(searchName.toLowerCase())
              //data.titleが含んでいたら小文字で返す　含んでいないdataは返さない
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
        {firedata.length > 6 && (
          <SiteButton
            href=""
            text="さらに表示"
            disabled={isEmpty ? true : false}
            onClick={displayMore}
            className="m-auto w-50 my-2"
          />
        )}
      </div>
      <div className="my-4">
        <p>© 尾田栄一郎／集英社・フジテレビ・東映アニメーション</p>
        <p>© 和久井健・講談社／アニメ「東京リベンジャーズ」</p>
        <p>©原泰久／集英社・キングダム製作委員会</p>
        <p>©芥見下々／集英社・呪術廻戦製作委員会</p>
      </div>
    </div>
  );
}
