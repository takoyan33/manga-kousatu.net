import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { database, storage } from "../../../firebaseConfig";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import TextField from "@mui/material/TextField";
import { getAuth } from "firebase/auth";
import { MuiNavbar } from "../../../layouts/components/MuiNavbar";
import Button from "@mui/material/Button";
import Grid from "@material-ui/core/Grid";
import { Cardpost } from "../../../layouts/Cardpost";
import { query, orderBy } from "firebase/firestore";
import { SiteButton } from "../../../layouts/components/button";
import { Categories, SiteHead } from "../../../layouts/components/ui";

const Category = () => {
  const databaseRef = collection(database, "CRUD DATA");
  //データベースを取得
  const q = query(databaseRef, orderBy("timestamp", "desc"));
  //新しい順
  const u = query(databaseRef, orderBy("timestamp"));
  //古い順
  const f = query(databaseRef, orderBy("likes", "desc"));
  //いいね数順
  const [firedata, setFiredata] = useState([]);
  const [likecount, setLikecount] = useState(0);

  const styles = { whiteSpace: "pre-line" };
  let router = useRouter();
  const { tag } = router.query;
  const auth = getAuth();
  const user = auth.currentUser;
  const [searchName, setSearchName] = useState("");

  console.log({ tag });

  const getData = async () => {
    //firestoreからデータ取得
    await getDocs(q).then((querySnapshot) => {
      //コレクションのドキュメントを取得
      setFiredata(
        querySnapshot.docs
          .map((data) => {
            //配列なので、mapで展開する
            return { ...data.data(), id: data.id };
            //スプレッド構文で展開して、新しい配列を作成
          })
          .filter((data) => {
            if (data.selected === tag) {
              return data;
              //そのまま返す
            } else if (
              data.selected.toLowerCase().includes(tag.toLowerCase())
              //valのnameが含んでいたら小文字で返す　含んでいないvalは返さない
            ) {
              return data;
            }
          })
      );
    });
  };

  //古い順
  const handledesSort = async () => {
    await onSnapshot(u, (querySnapshot) => {
      setFiredata(
        querySnapshot.docs
          .map((data) => {
            //配列なので、mapで展開する
            return { ...data.data(), id: data.id };
            //スプレッド構文で展開して、新しい配列を作成
          })
          .filter((data) => {
            if (data.selected === tag) {
              return data;
              //そのまま返す
            } else if (
              data.selected.toLowerCase().includes(tag.toLowerCase())
              //valのnameが含んでいたら小文字で返す　含んでいないvalは返さない
            ) {
              return data;
            }
          })
      );
    });
  };

  //いいね順
  const handlelikeSort = async () => {
    await onSnapshot(f, (querySnapshot) => {
      setFiredata(
        querySnapshot.docs
          .map((data) => {
            //配列なので、mapで展開する
            return { ...data.data(), id: data.id };
            //スプレッド構文で展開して、新しい配列を作成
          })
          .filter((data) => {
            if (data.selected === Category) {
              return data;
              //そのまま返す
            } else if (
              data.selected.toLowerCase().includes(tag.toLowerCase())
              //valのnameが含んでいたら小文字で返す　含んでいないvalは返さない
            ) {
              return data;
            }
          })
      );
    });
  };

  useEffect(() => {
    getData();
  }, [likecount]);

  return (
    <>
      <SiteHead />
      <MuiNavbar />
      <div className="max-w-7xl m-auto">
        <br></br>
        <p>
          <Link href="/">トップ</Link>　＞　投稿記事　＞　#{tag}
        </p>
        <br></br>
        <h2 className="my-12 text-center text-2xl font-semibold">
          #{tag}の考察記事一覧
        </h2>

        <p className="text-1xl text-center">投稿数　{firedata.length}件</p>

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

        <div className="max-w-7xl m-auto">
          <Grid container spacing={1}>
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
                    selected={data.selected}
                  />
                );
              })}
            {firedata.length == 0 && (
              <p className="text-center m-auto my-6 text-2xl">
                まだ投稿されていません
              </p>
            )}
          </Grid>
          <br></br>
          <br></br>
        </div>
      </div>
    </>
  );
};

export default Category;
