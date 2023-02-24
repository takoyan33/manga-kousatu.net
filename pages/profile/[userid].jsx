import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { database } from "../../firebaseConfig";
import { collection, getDocs, query, where } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { SiteHead, Profileid, Cardpost } from "../../layouts/components/ui";
import Grid from "@material-ui/core/Grid";

const Post = () => {
  const [users, setUsers] = useState([]);
  const postsRef = collection(database, "posts");
  const [firedata, setFiredata] = useState([]);
  const usersRef = collection(database, "users");
  const [likes, setLikes] = useState(null);
  const router = useRouter();
  const { userid } = router.query;
  const auth = getAuth();
  const user = auth.currentUser;
  const yourprofile = query(usersRef, where("userid", "==", userid));

  const getallPost = async () => {
    //firestoreからデータ取得
    await getDocs(postsRef).then((response) => {
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
    if (user && userid == user.uid) {
      router.push("/profile");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, userid, router]);

  useEffect(() => {
    fetchUserProfile();
    getallPost();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUserProfile = async () => {
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
                    favorite={user.favarite}
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
        {firedata.length === 0 && <p>まだ投稿していません</p>}
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
