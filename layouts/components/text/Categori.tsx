/* eslint-disable react/display-name */
import React from "react";
import Link from "next/link";

type Props = {
  categori: String;
};

//React.memo化
const Categori: React.VFC<Props> = React.memo(({ categori }) => {
  return (
    <div>
      {categori == "ONE PIECE" && (
        <p className="bg-blue-500 p-1 inline-block text-white text-center">
          <Link href={`/post/category/${categori}`}>{categori}</Link>
        </p>
      )}
      {categori == "呪術廻戦" && (
        <p className="bg-purple-500 p-1 inline-block text-white text-center">
          <Link href={`/post/category/${categori}`}>{categori}</Link>
        </p>
      )}
      {categori == "東京リベンジャーズ" && (
        <p className="bg-rose-500 p-1 inline-block text-white text-center">
          <Link href={`/post/category/${categori}`}>{categori}</Link>
        </p>
      )}
      {categori == "キングダム" && (
        <p className="bg-yellow-500 p-1 inline-block text-white text-center">
          <Link href={`/post/category/${categori}`}>{categori}</Link>
        </p>
      )}
      <br></br>
    </div>
  );
});

export default Categori;
