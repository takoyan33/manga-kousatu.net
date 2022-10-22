import { useEffect, useState, useMemo } from "react";
import { query, orderBy, limit } from "firebase/firestore";
import { app, database } from "../../../firebaseConfig";
import {
  collection,
  getDocs,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";

type Type = {
  getData: () => Promise<void>;
  handledesSort: () => Promise<void>;
  handlelikeSort: () => Promise<void>;
};

export const GetPosts = (): Type => {
  const [firedata, setFiredata] = useState([]);
  const databaseRef = collection(database, "CRUD DATA");
  const q = query(databaseRef, orderBy("timestamp", "desc"));

  //新しい順
  const u = query(databaseRef, orderBy("timestamp"));
  //古い順
  const f = query(databaseRef, orderBy("likes", "desc"));
  //新着順
  const getData = async () => {
    await onSnapshot(q, (querySnapshot) => {
      setFiredata(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  };

  //古い順
  const handledesSort = async () => {
    await onSnapshot(u, (querySnapshot) => {
      setFiredata(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  };

  //いいね順
  const handlelikeSort = async () => {
    await onSnapshot(f, (querySnapshot) => {
      setFiredata(
        querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  };

  return { getData, handledesSort, handlelikeSort };
};
