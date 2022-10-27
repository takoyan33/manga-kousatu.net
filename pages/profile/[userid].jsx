import { useRouter } from "next/router";
import React from "react";
import { useEffect, useState, useCallback } from "react";
import { database } from "../../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { MuiNavbar } from "../../layouts/components/MuiNavbar";
import { SiteHead } from "../../layouts/components/ui/SiteHead";
import { Profileid } from "../../layouts/components/ui/Profileid";

const Post = () => {
  const [ID, setID] = useState(null);
  const [context, setContext] = useState("");
  const [file, setFile] = useState("");
  const [categori, setCategori] = useState("");
  const [photoURL, setPhotoURL] = useState();
  const [title1, setTitle1] = useState("");
  const [users, setUsers] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [createtime, setCreatetime] = useState("");
  const [isUpdate, setIsUpdate] = useState(false);
  const [posttitle, setPostTitle] = useState("");
  const databaseRef = collection(database, "CRUD DATA");
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

  console.log({ userid });

  // const getData = async () => {
  //   //firestoreからデータ取得
  //   await getDocs(databaseRef).then((response) => {
  //     //コレクションのドキュメントを取得
  //     setFiredata(
  //       response.docs
  //         .map((data) => {
  //           //配列なので、mapで展開する
  //           return { ...data.data(), id: data.id };
  //           //スプレッド構文で展開して、新しい配列を作成
  //         })
  //         .filter((data) => {
  //           if (data.id === id) {
  //             return data;
  //             //そのまま返す
  //           } else if (
  //             data.id.toLowerCase().includes(id)
  //             //valのnameが含んでいたら小文字で返す　含んでいないvalは返さない
  //           ) {
  //             return data;
  //           }
  //         })
  //     );
  //   });
  // };

  useEffect(() => {
    // getData();
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
      </div>
    </>
  );
};

export default Post;
