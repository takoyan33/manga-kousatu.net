import { useEffect, useState } from "react";
import { query, orderBy, limit } from "firebase/firestore";
import { app, database } from "../../../firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";

// type Type = {
//   getallPost: () => Promise<void>,
//   getallOldpost: () => Promise<void>,
//   getallLikepost: () => Promise<void>,
//   firedata: any,
// };

export const useGetPosts = () => {
  const [firedata, setFiredata] = useState([]);
  const databaseRef = collection(database, "posts");
  const q = query(databaseRef, orderBy("timestamp", "desc"));

  //新着順
  const getallPost = async () => {
    await onSnapshot(q, (querySnapshot) => {
      setFiredata(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  };
  useEffect(() => {
    getallPost();
  }, []);

  return { firedata };
};
