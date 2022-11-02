import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { app, database, storage } from "../../firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { MuiNavbar } from "../../layouts/components/MuiNavbar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Image from "react-image-resizer";
import Avatar from "@mui/material/Avatar";
import { SiteButton } from "../../layouts/components/button";
import { SiteCategory } from "../../layouts/components/text";
import { Cardpost } from "../../layouts/Cardpost";
import { Categories, SiteHead } from "../../layouts/components/ui";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import BorderColorIcon from "@mui/icons-material/BorderColor";

const Post = () => {
  const [ID, setID] = useState(null);
  const [context, setContext] = useState("");
  const [categori, setCategori] = useState("");
  const [photoURL, setPhotoURL] = useState();
  const [users, setUsers] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [createtime, setCreatetime] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [posttitle, setPostTitle] = useState("");
  const databaseRef = collection(database, "CRUD DATA");
  //データベースを取得
  const [firedata, setFiredata] = useState([]);
  const [downloadURL, setDownloadURL] = useState(null);
  const [likecount, setLikecount] = useState(0);
  const usersRef = collection(database, "users");
  const [userid, setUserid] = useState(null);
  const [netabare, setNetabare] = useState("");
  const [likes, setLikes] = useState(null);
  const [selected, setSelected] = useState(["最終回"]);

  let router = useRouter();
  const { id } = router.query;
  const auth = getAuth();
  const user = auth.currentUser;

  console.log({ id });

  const getData = async () => {
    //firestoreからデータ取得
    const data = doc(database, "CRUD DATA", id);
    getDoc(data).then((documentSnapshot) => {
      setFiredata(documentSnapshot.data());
    });
  };

  const getID = (
    id,
    title,
    context,
    downloadURL,
    categori,
    cratetime,
    netabare,
    photoURL,
    userid,
    likes,
    selected
  ) => {
    setID(id);
    setContext(context);
    setPostTitle(title);
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
    console.log(context);
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
    // const userdata = doc(database, "users", id);
    // getDoc(userdata).then((documentSnapshot) => {
    //   setFiredata(documentSnapshot.data());
    // });
  };

  useEffect(() => {
    getData();
    usersData();
  }, [likes]);

  // getData();
  // usersData();

  const updatefields = () => {
    //更新する
    let fieldToEdit = doc(database, "CRUD DATA", ID);
    const newdate = new Date().toLocaleString("ja-JP");
    //セットしたIDをセットする
    updateDoc(fieldToEdit, {
      title: posttitle,
      context: context.replace(/\r?\n/g, "\n"),
      edittime: newdate,
      //改行を保存する
    })
      .then(() => {
        alert("記事を更新しました");
        setPostTitle("");
        setContext("");
        setIsUpdate(false);
        // router.push(`${ID}`);
        // getData();
        // usersData();
        router.push("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const deleteDocument = (id) => {
    //data.idを送っているのでidを受け取る
    let fieldToEdit = doc(database, "CRUD DATA", id);
    let checkSaveFlg = window.confirm("削除しても大丈夫ですか？");
    //確認画面を出す

    if (checkSaveFlg) {
      deleteDoc(fieldToEdit)
        //記事を削除する
        .then(() => {
          alert("記事を削除しました");
          router.push("/");
          getData();
        })
        .catch((err) => {
          alert("記事の削除に失敗しました");
        });
    } else {
      router.push("/");
    }
  };

  const handleClick = (id, likes) => {
    // setLikecount(likes + 1);
    console.log(likes);

    let fieldToEdit = doc(database, "CRUD DATA", id);
    updateDoc(fieldToEdit, {
      likes: likes + 1,
    })
      .then(() => {
        console.log(likecount);
        setLikecount(0);
        getData();
      })
      .catch((err) => {
        alert("失敗しました");
        console.log(err);
      });
  };
  return (
    <>
      <SiteHead />
      <MuiNavbar />

      <div className="max-w-5xl m-auto">
        <div>
          <div>
            <div className="lg:w-full my-4 ">
              {user && (
                <>
                  {user.email == firedata.email && (
                    <div>
                      <SiteButton
                        href=""
                        text="更新する"
                        className=" my-2 m-4"
                        onClick={() =>
                          getID(
                            id,
                            firedata.title,
                            firedata.context,
                            firedata.edittime
                          )
                        }
                      />
                      <SiteButton
                        href=""
                        text="削除する"
                        className=" my-2 m-4"
                        onClick={() => deleteDocument(id)}
                      />
                    </div>
                  )}
                </>
              )}

              {/* <Link href={`/post/edit/${id}`}>編集</Link> */}
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
                    value={posttitle}
                    onChange={(event) => setPostTitle(event.target.value)}
                  />

                  <br></br>

                  <TextField
                    label="内容(最大500文字）"
                    className="m-auto w-full"
                    id="filled-multiline-static"
                    multiline
                    rows={14}
                    type="text"
                    value={context}
                    onChange={(event) => setContext(event.target.value)}
                  />
                  <br></br>
                  <Button variant="outlined" onClick={updatefields}>
                    更新する
                  </Button>
                  <br></br>
                </Box>
              )}
              <br></br>
              <p>
                <Link href="/">トップ</Link>　＞　投稿記事　＞　
                {firedata.title}
              </p>
              <p className="flex justify-center my-6">
                <Image
                  className="m-auto text-center max-w-sm"
                  height={500}
                  width={500}
                  src={firedata.downloadURL}
                />
              </p>
              <div>
                <div className="text-2xl my-4">{firedata.title}</div>
                <br></br>
                <p>
                  <AccessTimeIcon /> 投稿日時：{firedata.createtime}
                </p>
                <br></br>
                {firedata.edittime && (
                  <p>
                    <AccessTimeIcon />
                    編集日時：{firedata.edittime}
                  </p>
                )}
                <br></br>
                {firedata.selected &&
                  firedata.selected.map((tag, i) => (
                    <span className="text-cyan-700" key={i}>
                      #{tag}　
                    </span>
                  ))}
                <br></br>
                <div variant="body2" color="text.secondary">
                  {/* <SiteCategory
                    className={Categories[firedata.categori].className}
                    text={Categories[firedata.categori].title}
                    href={Categories[firedata.categori].link}
                  /> */}
                  {/* 
                  {Categories.map((categori) => (
                    <SiteCategory
                      key={categori.id}
                      className={`p-1 inline-block text-white text-center m-6 + ${
                        categori[firedata.categori].className
                      }`}
                      text={categori[firedata.categori].title}
                      href={categori[firedata.categori].link}
                    />
                  ))} */}

                  {firedata.categori == "ONE PIECE" && (
                    <SiteCategory
                      className="bg-blue-500 p-1 inline-block text-white text-center m-6"
                      text="ONE PIECE"
                      href="/post/category/ONE PIECE"
                    />
                  )}
                  {firedata.categori == "呪術廻戦" && (
                    <SiteCategory
                      className="bg-purple-500 p-1 inline-block text-white text-center m-6"
                      text="呪術廻戦"
                      href="/post/category/呪術廻戦"
                    />
                  )}
                  {firedata.categori == "東京リベンジャーズ" && (
                    <SiteCategory
                      className="bg-rose-500 p-1 inline-block text-white text-center m-6"
                      text="東京リベンジャーズ"
                      href="/post/category/東京リベンジャーズ"
                    />
                  )}
                  {firedata.categori == "キングダム" && (
                    <SiteCategory
                      className="bg-yellow-500 p-1 inline-block text-white text-center m-6"
                      text="キングダム"
                      href="/post/category/キングダム"
                    />
                  )}

                  {firedata.netabare == "ネタバレ有" && (
                    <span className="bg-yellow-500 mt-2 p-1 inline-block text-white text-center m-4">
                      {firedata.netabare}
                    </span>
                  )}
                  {firedata.netabare == "ネタバレ無" && (
                    <span className="bg-blue-500 mt-2 p-1 inline-block text-white text-center m-4">
                      {firedata.netabare}
                    </span>
                  )}
                  <p className="text-left">{firedata.context}</p>
                  <br></br>
                  {firedata.contextimage && (
                    <p className="flex justify-center">
                      <Image
                        className="m-auto text-center max-w-sm"
                        height={500}
                        width={500}
                        src={firedata.contextimage}
                      />
                    </p>
                  )}
                  <br></br>
                  <p>
                    <FavoriteIcon />
                    {firedata.likes}
                  </p>
                  <br></br>
                  {user && (
                    <SiteButton
                      href=""
                      text="いいねする"
                      className="inline my-2 m-4"
                      onClick={() => handleClick(id, firedata.likes)}
                    />
                  )}
                  <div key={id} className="cursor-pointer">
                    {users &&
                      users.map((user) => {
                        return (
                          <>
                            {firedata.email == user.email && (
                              <Link href={`/profile/${user.userid}`}>
                                <div key={user.userid}>
                                  <div className="bg-slate-200 my-8 py-8 flex m-auto">
                                    <div key={user.id}>
                                      <p>
                                        <Avatar
                                          className="m-auto text-center max-w-sm border"
                                          alt="プロフィール"
                                          sx={{ width: 100, height: 100 }}
                                          src={user.profileimage}
                                        />
                                      </p>
                                    </div>
                                    <div className="ml-6 mt-4 ">
                                      <span className="text-xl">
                                        <AccountBoxIcon /> {user.username}
                                      </span>
                                      <p className="text-xl">
                                        <BorderColorIcon />
                                        {user.bio}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            )}
                          </>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
            {/* <>
                  <h2 className="text-2xl">こちらもおすすめ</h2>
                  <div className="max-w-7xl m-auto">
                    <Grid container spacing={1}>
                      {categoriFiredata.map((firedata) => {
                        return (
                          <Cardpost
                            key={firedata.id}
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
                      {categoriFiredata.length == 0 && (
                        <p className="text-center m-auto my-6 text-2xl">
                          まだ投稿されていません
                        </p>
                      )}
                    </Grid>
                  </div> */}
            {/* </> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
