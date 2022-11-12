import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState, useCallback } from "react";
import { database } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { MuiNavbar } from "../../layouts/components/MuiNavbar";
import { SiteHead } from "../../layouts/components/ui/SiteHead";
import { Profileid } from "../../layouts/components/ui/Profileid";
import Grid from "@material-ui/core/Grid";
import { Cardpost } from "../../layouts/Cardpost";

const Post = () => {
  const [users, setUsers] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [createtime, setCreatetime] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [posttitle, setPostTitle] = useState("");
  const databaseRef = collection(database, "posts");
  //データベースを取得
  const [createObjectURL, setCreateObjectURL] = useState(null);
  const [firedata, setFiredata] = useState([]);
  const [downloadURL, setDownloadURL] = useState(null);
  const [likecount, setLikecount] = useState(0);
  const usersRef = collection(database, "users");
  const [image, setImage] = useState("");
  const [result, setResult] = useState("");
  const [email, setEmail] = useState("");
  const [netabare, setNetabare] = useState("");
  const [likes, setLikes] = useState(null);
  const [selected, setSelected] = useState(["最終回"]);
  let router = useRouter();
  const { userid } = router.query;
  const auth = getAuth();
  const user = auth.currentUser;
  const [searchName, setSearchName] = useState("");
  // const yourprofile = query(usersRef, where("userid", "==",userid ));
  console.log({ userid });

  const getData = async () => {
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
    getData();
    usersData();
  }, [likes]);

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
  };

    // const usersData = async () => {
    //   //firestoreからデータ取得
    //   await getDocs(yourprofile).then((querySnapshot) => {
    //     //コレクションのドキュメントを取得
    //     setUsers(
    //       querySnapshot.docs.map((data) => {
    //         //配列なので、mapで展開する
    //         return { ...data.data(), id: data.id };
    //         //スプレッド構文で展開して、新しい配列を作成
    //       })
    //     );
    //   });
    //   console.log(firedata);
    // };

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
                  {userid == user.userid && (
                    <Profileid
                      key={user.id}
                      profileimage={user.profileimage}
                      username={user.username}
                      bio={user.bio}
                      favarite={user.favarite}
                      id={0}
                    />
                  )}
                  <p></p>
                </>
              );
            })}
        </>
        <h2 className="m-5 my-12 text-center text-2xl font-semibold">
          過去の投稿
        </h2>
        <Grid container className="m-auto">
          {firedata == [] && <p>まだ投稿していません</p>}
          {firedata.map((data) => {
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
