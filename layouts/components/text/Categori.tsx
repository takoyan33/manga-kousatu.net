/* eslint-disable react/display-name */
import React from "react";
import Link from "next/link";

type Props = {
  categori: String;
};

//React.memo化
const Categori: React.VFC<Props> = React.memo(({ categori }) => {
  return (
    <>
      {categori == "ONE PIECE" && (
        <span className="bg-blue-500 p-1 inline-block text-white text-center">
          <Link href={`/post/category/${categori}`}>{categori}</Link>
        </span>
      )}
      {categori == "呪術廻戦" && (
        <span className="bg-purple-500 p-1 inline-block text-white text-center">
          <Link href={`/post/category/${categori}`}>{categori}</Link>
        </span>
      )}
      {categori == "東京リベンジャーズ" && (
        <span className="bg-rose-500 p-1 inline-block text-white text-center">
          <Link href={`/post/category/${categori}`}>{categori}</Link>
        </span>
      )}
      {categori == "キングダム" && (
        <span className="bg-yellow-500 p-1 inline-block text-white text-center">
          <Link href={`/post/category/${categori}`}>{categori}</Link>
        </span>
      )}
      <br></br>
    </>
  );
});

export default Categori;
