import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState, useCallback } from "react";
import { database } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { SiteHead } from "../../layouts/components/ui/SiteHead";
import { Profileid } from "../../layouts/components/ui/Profileid";
import Grid from "@material-ui/core/Grid";
import { Cardpost } from "../../layouts/Cardpost";
import { query, where } from "firebase/firestore";

const Post = () => {
  const [users, setUsers] = useState(null);
  const databaseRef = collection(database, "posts");
  //データベースを取得
  const [firedata, setFiredata] = useState([]);
  const usersRef = collection(database, "users");
  const [likes, setLikes] = useState(null);
  const router = useRouter();
  const { userid } = router.query;
  const auth = getAuth();
  const user = auth.currentUser;
  const yourprofile = query(usersRef, where("userid", "==", userid));
  console.log(yourprofile);
  console.log({ userid });

  const getallPost = async () => {
    //firestoreからデータ取得
    await getDocs(databaseRef).then((response) => {
      //コレクションのドキュメントを取得
      setFiredata(
        response.docs
          .map((data) => {
            //配列なので、mapで展開する
            return { ...data.data(), id: data.id };
            //スプレッド構文で展開して、新しい配列を作成
          })
          .filter((data) => {
            if (data.userid === userid) {
              return data;
              //そのまま返す
            } else if (
              data.userid.toLowerCase().includes(userid)
              //valのnameが含んでいたら小文字で返す　含んでいないvalは返さない
            ) {
              return data;
            }
          })
      );
    });
  };

  useEffect(() => {
    if (user) {
      if (userid == user.uid) {
        router.push("/profile");
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    userData();
    getallPost();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [likes]);

  // const userData = async () => {
  //   //firestoreからデータ取得
  //   const data = doc(database, "users", "ilvobFpZAceNGncxNWwPOE88kvu1");
  //   // const data = doc(database, "users", userid);

  //   getDoc(data)
  //     .then((documentSnapshot) => {
  //       setUsers(documentSnapshot.data());
  //     })
  //     .catch((error) => {
  //       console.log("Error getting document:", error);
  //     });
  // };
  // console.log(users);

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
        <>
          {users &&
            users.map((user) => {
              return (
                <>
                  {userid == user.userid && (
                    <Profileid
                      key={user.id}
                      profileimage={user.profileimage}
                      username={user.username}
                      bio={user.bio}
                      favarite={user.favarite}
                    />
                  )}
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
    </>
  );
};

export default Post;
