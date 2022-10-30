/* eslint-disable react/display-name */
import React from "react";
import Link from "next/link";
import { SiteCategory } from "./SiteCategory";

type Props = {
  categori: String;
};

//React.memo化
const Categori: React.VFC<Props> = React.memo(({ categori }) => {
  return (
    <div className="my-1">
      {categori == "ONE PIECE" && (
        <SiteCategory
          className="bg-blue-500 p-1 inline-block text-white text-center hover:bg-blue-700"
          text="ONE PIECE"
          href={`/post/category/${categori}`}
        />
      )}
      {categori == "呪術廻戦" && (
        <SiteCategory
          className="bg-purple-500 p-1 inline-block text-white text-center hover:bg-purple-700"
          text="呪術廻戦"
          href={`/post/category/${categori}`}
        />
      )}
      {categori == "東京リベンジャーズ" && (
        <SiteCategory
          className="bg-rose-500 p-1 inline-block text-white text-center hover:bg-yellow-700"
          text="東京リベンジャーズ"
          href={`/post/category/${categori}`}
        />
      )}
      {categori == "キングダム" && (
        <SiteCategory
          className="bg-yellow-500 p-1 inline-block text-white text-center"
          text="キングダム"
          href={`/post/category/${categori}`}
        />
      )}
    </div>
  );
});

export default Categori;
