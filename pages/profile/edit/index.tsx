import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import { app, database } from "../../../firebaseConfig";
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { getAuth } from "firebase/auth";
import { MuiNavbar } from "../../../layouts/components/MuiNavbar";
import Button from "@mui/material/Button";
import { postImage } from "../../api/upload";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { query, orderBy, limit } from "firebase/firestore";
import Image from "react-image-resizer";
import { TagsInput } from "react-tag-input-component";
import { SiteHead } from "../../../layouts/components/ui/SiteHead";

export default function Edit() {
  const [ID, setID] = useState(null);
  const [image, setImage] = useState<string>();
  const [result, setResult] = useState("");
  const [users, setUsers] = useState(null);
  const [displayName, setDisplayName] = useState<string>();
  let router = useRouter();
  const usersRef = collection(database, "users");
  const databaseRef = collection(database, "posts");
  const [createObjectURL, setCreateObjectURL] = useState<string>(null);
  const [downloadURL, setDownloadURL] = useState<string>(null);
  const [username, setUsername] = useState(null);
  const [bio, setBio] = useState(null);
  const auth = getAuth();
  const user = auth.currentUser;
  const [selected, setSelected] = useState([""]);

  console.log(user);

  useEffect(() => {
    let token = localStorage.getItem("Token");
    if (token) {
      usersData();
    }
    if (!token) {
      router.push("/register");
    }
  }, []);

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

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      if (event == "") {
        setImage("");
        setCreateObjectURL("");
      } else {
        const file = event.target.files[0];
        setImage(file);
        setCreateObjectURL(URL.createObjectURL(file));
      }
    } else {
      setImage("");
      setCreateObjectURL("");
    }
  };

  const updatefields = async (id) => {
    //更新する
    let fieldToEdit = doc(database, "users", id);
    //セットしたIDをセットする
    const result = await postImage(image);
    setResult(result);
    updateDoc(fieldToEdit, {
      username: username,
      bio: bio,
      email: user.email,
      profileimage: result,
      userid: user.uid,
      favarite: selected,
      //改行を保存する
    })
      .then(() => {
        alert("ユーザー情報が更新されました");
        setUsername("");
        setBio("");
        router.push("/profile");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <SiteHead />
      <MuiNavbar />

      {users &&
        users.map((data) => {
          return (
            <>
              {data.email == user.email && (
                <div key={data.id}>
                  <h2 className="my-12 text-center text-2xl font-semibold">
                    プロフィールの編集
                  </h2>

                  <p className="my-12 text-center font-semib">
                    現在のプロフィール画像
                    <br></br>
                    <p className="flex justify-center">
                      <Image
                        className="m-auto text-center max-w-sm"
                        height={100}
                        width={100}
                        src={data.profileimage}
                      />
                    </p>
                  </p>

                  <Box
                    component="form"
                    className=""
                    noValidate
                    autoComplete="off"
                  >
                    <>
                      <p className="text-center my-4">新しいプロフィール画像</p>
                      <br></br>
                      <div className="">
                        <img
                          className="flex justify-center items-center m-auto  w-full"
                          src={createObjectURL}
                          alt="新しいプロフィール画像"
                        />
                      </div>
                      <div className="text-center m-auto my-4">
                        <label
                          htmlFor="file-input"
                          className="bg-primary-900 text-white-900 text-center m-auto dark:bg-dark-900 px-4 py-2 rounded mb-6 w-full"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-10 w-10 hover:cursor-pointer hover:bg-gray-700 text-center m-auto"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                        </label>
                        <input
                          id="file-input"
                          className="hidden text-center m-auto"
                          type="file"
                          accept="image/*"
                          name="myImage"
                          onChange={uploadToClient}
                        />
                      </div>

                      <p className="text-center my-4">
                        現在の名前： <span>{data.username}</span>
                      </p>
                      <p className="text-center my-4">
                        新しい名前（最大10文字）
                      </p>
                      <div className="text-center">
                        <TextField
                          id="outlined-basic"
                          label="名前"
                          variant="outlined"
                          className="m-auto w-80"
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => setUsername(event.target.value)}
                        />
                      </div>
                      <br></br>
                      <p className="text-center my-4">
                        現在のプロフィール： <span>{data.bio}</span>
                      </p>
                      <p className="text-center my-4">
                        新しいプロフィール（最大10文字）
                      </p>
                      <div className="text-center">
                        <TextField
                          id="outlined-basic"
                          label="名前"
                          variant="outlined"
                          className="m-auto w-80"
                          onChange={(
                            event: React.ChangeEvent<HTMLInputElement>
                          ) => setBio(event.target.value)}
                        />
                      </div>
                      <br></br>
                      <p className="text-center my-4">
                        現在の好きな漫画： <span>{data.favarite}</span>
                      </p>
                      <p className="text-center my-4">好きな漫画（最大10）*</p>
                      <div className="text-center m-auto w-80">
                        <TagsInput
                          value={selected}
                          onChange={setSelected}
                          name="selected"
                          placeHolder="タグを追加してください"
                        />
                      </div>
                      <br></br>
                      <div className="text-center">
                        <Button
                          variant="outlined"
                          key={data.id}
                          className="m-auto w-80 text-center"
                          onClick={() => updatefields(data.id)}
                        >
                          プロフィールを更新する
                        </Button>
                      </div>
                      <br></br>
                      <div className="text-center">
                        <Button variant="outlined" className="m-auto w-80 ">
                          <Link href="/profile">戻る</Link>
                        </Button>
                      </div>
                    </>
                  </Box>
                </div>
              )}
            </>
          );
        })}
    </div>
  );
}
