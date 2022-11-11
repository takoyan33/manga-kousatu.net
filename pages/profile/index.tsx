import React from "react";
import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { database } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/router";
import { getAuth, deleteUser } from "firebase/auth";
import { MuiNavbar } from "../../layouts/components/MuiNavbar";
import TextField from "@mui/material/TextField";
import Grid from "@material-ui/core/Grid";
import { SiteHead } from "../../layouts/components/ui";
import Image from "react-image-resizer";
import { Profileid } from "../../layouts/components/ui/Profileid";
import { Cardpost } from "../../layouts/Cardpost";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import DraftsIcon from "@mui/icons-material/Drafts";
import SendIcon from "@mui/icons-material/Send";
import { query, orderBy, where } from "firebase/firestore";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import StarBorder from "@mui/icons-material/StarBorder";
import { Legend, PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export default function Profile() {
  const databaseRef = collection(database, "posts");
  const q = query(databaseRef, where("email", "==", "harrier2070@gmail.com"));
  console.log(q);
  const usersRef = collection(database, "users");
  const [users, setUsers] = useState(null);
  //データベースを取得
  const [firedata, setFiredata] = useState([]);
  const [searchName, setSearchName] = useState("");
  const [onpiece, setOnpiece] = useState(0);
  const [kingdom, setKingdom] = useState([]);
  const [tokyo, setTokyo] = useState([]);
  const [kaisen, setKaisen] = useState([]);

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
    await getDocs(q).then((querySnapshot) => {
      //コレクションのドキュメントを取得
      setFiredata(
        querySnapshot.docs.map((data) => {
          //配列なので、mapで展開する
          return { ...data.data(), id: data.id };
          //スプレッド構文で展開して、新しい配列を作成
        })
      );
    });
  };

  // const getData = async () => {
  //   //firestoreからデータ取得
  //   await getDocs(databaseRef).then((response) => {
  //     //コレクションのドキュメントを取得
  //     setFiredata(
  //       response.docs.map((data) => {
  //         //配列なので、mapで展開する
  //         return { ...data.data(), id: data.id };
  //         //スプレッド構文で展開して、新しい配列を作成
  //       })
  //     );
  //   });
  // };

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
  //   let fieldToEdit = doc(database, "posts", id);
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

  const sample_data = [
    { name: "ONE PIECE", value: 2 },
    { name: "呪術廻戦", value: 0 },
    { name: "キングダム", value: 1 },
    { name: "東京リベンジャーズ", value: 0 },
    // { name: "data5", value: 10 },
  ];

  const COLORS = [
    "#0088FE",
    "#00C49F",
    "#FFBB28",
    "#FF8042",
    "#ff6361",
    "#8884d8",
    "#C1C1C1",
  ];
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  return (
    <>
      <SiteHead />
      <MuiNavbar />
      <div className="max-w-7xl m-auto">
        <h2 className="m-5 my-12 text-center text-2xl font-semibold">
          プロフィール
        </h2>

        <List
          sx={{ width: "100%", maxWidth: 300, bgcolor: "background.paper" }}
          component="nav"
          aria-labelledby="nested-list-subheader"
          subheader={
            <ListSubheader component="div" id="nested-list-subheader">
              アカウントメニュー
            </ListSubheader>
          }
        >
          <ListItemButton>
            <ListItemIcon>
              <SendIcon />
            </ListItemIcon>
            <button className="">
              <Link href="/profile/edit"> プロフィールを変更する</Link>
            </button>
          </ListItemButton>
          <ListItemButton>
            <ListItemIcon>
              <DraftsIcon />
            </ListItemIcon>
            <button className="" onClick={deleteuser}>
              アカウントを退会する
            </button>
            {/* <button className="m-5">
          <Link href="/profile/emailedit">メールアドレスを変更する</Link>
        </button> */}
            {/* <button className="myy-5">
          <Link href="/profile/passwordedit">パスワードを変更する</Link>
        </button> */}
          </ListItemButton>
        </List>

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

        <p className="my-12 text-center text-2xl font-semibold">過去の投稿</p>
        <p className="text-1xl text-center">投稿数　{firedata.length}件</p>
        <p>ワンピースのカテゴリ数{onpiece}</p>
        <p>キングダムのカテゴリ数</p>
        <div>
          <ResponsiveContainer height={256}>
            <PieChart margin={{ top: 0, left: 0, right: 0, bottom: 0 }}>
              <Pie
                dataKey="value"
                data={sample_data}
                cx="50%"
                cy="50%"
                outerRadius={80}
                labelLine={false}
                label={renderCustomizedLabel}
                isAnimationActive={true}
              >
                {sample_data.map((entry, index) => (
                  <Cell fill={COLORS[index % COLORS.length]} key={index} />
                ))}
              </Pie>
              <Legend verticalAlign="bottom" wrapperStyle={{ bottom: 18 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

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
            // .filter((data) => {
            //   if (data.categori === "ONE PIECE") {
            //     console.log(data.categori);
            //     setOnpiece(+1);
            //     return data;
            //   }
            //   {
            //     console.log(data.categori);
            //     return data;
            //   }
            // })
            .map((data) => {
              return (
                <>
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
                </>
              );
            })}
        </Grid>
      </div>
    </>
  );
}
