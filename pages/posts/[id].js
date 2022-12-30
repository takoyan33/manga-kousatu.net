import { useEffect, useState, useMemo, useContext } from "react";
import { database } from "../../firebaseConfig";
import {
  collection,
  query,
  getDocs,
  orderBy,
  doc,
  getDoc,
} from "firebase/firestore";

export const getStaticPaths = async () => {
  const databaseRef = collection(database, "posts");
  // const querySnapshot = await getDocs(databaseRef);
  const ret = [];
  const datas = [];
  const getallOldpost = async () => {
    await onSnapshot(u, (querySnapshot) => {
      datas(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };
  getallOldpost();
  // querySnapshot.forEach((doc) => {
  //   ret.push(doc.data());
  // });

  const paths = ret.forEach((post) => {
    return {
      params: { id: post.id },
    };
  });

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const fieldToEdit = doc(database, "posts", id);
  const docSnap = await getDoc(fieldToEdit);

  return {
    props: {
      post: docSnap,
    },
  };
};

const Daitails = ({ post }) => {
  return (
    <div>
      <h1>{post.title}</h1>
      <h1>{post.body}</h1>
    </div>
  );
};

export default Daitails;
