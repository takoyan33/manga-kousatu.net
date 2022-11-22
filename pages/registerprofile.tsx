import { getAuth } from "firebase/auth";
import { database } from "../firebaseConfig";
import { collection, setDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { useRouter } from "next/router";
import { postImage } from "../layouts/api/upload";
import { MuiNavbar } from "../layouts/components/MuiNavbar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Imageupload from "../packages/utils/Imageupload";
import Imageuploadcontext from "../packages/utils/Imageuploadcontext";
import { Stack } from "@mui/material";
import { TagsInput } from "react-tag-input-component";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { SiteHead } from "../layouts/components/ui/SiteHead";

export default function Registerprofile() {
  const notify = () => toast("登録できました！");
  const [selected, setSelected] = useState(["ワンピース"]);
  const databaseRef = collection(database, "users");
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState(null);
  const [bio, setBio] = useState(null);
  const [createObjectURL, setCreateObjectURL] = useState<string>("");
  const [result, setResult] = useState("");

  const router = useRouter();
  const auth = getAuth();
  const user = auth.currentUser;

  const uploadToClient = (event) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      setImage(file);
      setCreateObjectURL(URL.createObjectURL(file));
      console.log(image);
    }
  };

  const addDate = async () => {
    if (image == null) {
      alert("プロフィール画像を選んでください");
    } else {
      const result = await postImage(image);
      setResult(result);
      const userRef = await doc(database, "users", user.uid);
      //写真のurlをセットする
      await setDoc(userRef, {
        username: username,
        bio: bio,
        email: user.email,
        profileimage: result,
        userid: user.uid,
        favarite: selected,
        admin: 0,
      })
        .then(() => {
          notify();
          setUsername("");
          setBio("");
          router.push("/");
        })
        .catch((err) => {
          console.error(err);
        });
    }
  };

  return (
    <div>
      <SiteHead />
      <MuiNavbar />
      <ToastContainer />
      <div className="max-w-7xl m-auto">
        <Stack
          component="form"
          className="m-auto"
          noValidate
          spacing={2}
          sx={{ width: "38ch" }}
        >
          <h2 className="m-5 my-12 text-center text-2xl font-semibold">
            プロフィール登録
          </h2>
          <p>詳細なプロフィールの記載をお願いします。</p>
          <div>
            <label className="text-center my-4">
              ユーザーの名前*（10文字以内）
            </label>
          </div>
          <TextField
            id="outlined-basic"
            label="太郎"
            className="m-auto w-80"
            variant="outlined"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(event.target.value)
            }
          />
          <div>
            <label className="text-center my-4">ユーザー画像*</label>
          </div>
          <div className="">
            <img
              className="flex justify-center items-center m-auto w-60"
              src={createObjectURL}
              alt="ユーザー画像"
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
          <div>
            <label className="text-center my-4">
              プロフィール（最大50文字）*
            </label>
          </div>
          <TextField
            id="outlined-basic"
            label="よろしくお願いします。"
            type="text"
            variant="outlined"
            className="m-auto w-80"
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setBio(event.target.value)
            }
          />
          <div>
            <label className="text-center my-4">好きな漫画（最大10）*</label>
          </div>
          <TagsInput
            value={selected}
            onChange={setSelected}
            name="selected"
            placeHolder="タグを追加してください"
          />
          <div>
            <Button
              variant="outlined"
              onClick={addDate}
              className="m-auto w-80 my-8"
            >
              新規登録
            </Button>
          </div>
        </Stack>
      </div>
    </div>
  );
}
