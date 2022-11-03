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
//   getData: () => Promise<void>,
//   handledesSort: () => Promise<void>,
//   handlelikeSort: () => Promise<void>,
//   firedata: any,
// };

export const useGetPosts = () => {
  const [firedata, setFiredata] = useState([]);
  const databaseRef = collection(database, "posts");
  const q = query(databaseRef, orderBy("timestamp", "desc"));

  //新着順
  const getData = async () => {
    await onSnapshot(q, (querySnapshot) => {
      setFiredata(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  };
  useEffect(() => {
    getData();
  }, []);

  return { firedata };
};
