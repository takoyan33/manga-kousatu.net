import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState, useCallback } from "react";
import { database } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { MuiNavbar } from "../../layouts/components/MuiNavbar";
import { SiteHead } from "../../layouts/components/ui/SiteHead";
import { Profileid } from "../../layouts/components/ui/Profileid";
import Grid from "@material-ui/core/Grid";
import { Cardpost } from "../../layouts/Cardpost";
import { query, where } from "firebase/firestore";
import { useAuthContext } from "../../layouts/context/AuthContext";
const Post = () => {
  const [users, setUsers] = useState(null);
  const databaseRef = collection(database, "posts");
  //データベースを取得
  const [firedata, setFiredata] = useState([]);
  const usersRef = collection(database, "users");
  const [Userid, setUserid] = useState(null);
  const [greeting, setGreeting] = useState("hello");
  const [str, setStr] = useState("");
  const router = useRouter();
  const { userid } = router.query;
  console.log(yourprofile);
  console.log({ userid });

  const { user } = useAuthContext();
  const yourprofile = query(usersRef, where("userid", "==", userid));
  const yourdata = query(databaseRef, where("userid", "==", userid));

  const getallPost = async () => {
    //firestoreからデータ取得
    await getDocs(yourdata).then((response) => {
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

  useEffect(() => {
    if (user) {
      if (userid == user.uid) {
        router.push("/profile");
      } else {
        userData();
        getallPost();
        setUserid({ userid });
        console.log(Userid);
      }
    }
    if (str === "goodbye") {
      const newGreeting = str;
      setGreeting(newGreeting);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [str]);

  const userData = async () => {
    //firestoreからデータ取得
    await getDocs(yourprofile).then((response) => {
      //コレクションのドキュメントを取得
      setUsers(
        response.docs.map((data) => {
          //配列なので、mapで展開する
          return { ...data.data(), id: data.id };
          //スプレッド構文で展開して、新しい配列を作成
        })
      );
    });
  };

  return (
    <>
      <SiteHead />
      <MuiNavbar />

      <div className="max-w-7xl m-auto">
        <>
          {users &&
            users.map((user) => {
              return (
                <>
                  <Profileid
                    key={user.id}
                    profileimage={user.profileimage}
                    username={user.username}
                    bio={user.bio}
                    favarite={user.favarite}
                  />
                </>
              );
            })}
        </>
        <h2 className="m-5 my-12 text-center text-2xl font-semibold">
          過去の投稿
        </h2>
        <Grid container className="m-auto">
          {firedata == [] && <p>まだ投稿していません</p>}
          {firedata &&
            firedata.map((data) => {
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
};

export default Post;
