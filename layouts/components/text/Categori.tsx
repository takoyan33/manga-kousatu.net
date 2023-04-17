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
    <div className='my-1'>
      {categori == 'ONEPIECE' && (
        <SiteCategory
          className='p-1 inline-block font-bold  border rounded-xl text-center  hover:text-white border-cyan-500 text-cyan-500 hover:bg-cyan-700'
          text='ONE PIECE'
          href={`/post/categories/${categori}`}
        />
      )}
      {categori == '呪術廻戦' && (
        <SiteCategory
          className='p-1 inline-block font-bold  border rounded-xl text-center  hover:text-white border-purple-500 text-purple-500 hover:bg-purple-700'
          text='呪術廻戦'
          href={`/post/categories/${categori}`}
        />
      )}
      {categori == '東京リベンジャーズ' && (
        <SiteCategory
          className='p-1 inline-block font-bold  border rounded-xl text-center  hover:text-white border-rose-500 text-rose-500 hover:bg-rose-700'
          text='東京リベンジャーズ'
          href={`/post/categories/${categori}`}
        />
      )}
      {categori == 'キングダム' && (
        <SiteCategory
          className='p-1 inline-block font-bold  border rounded-xl text-center  hover:text-white border-yellow-500 text-yellow-500 hover:bg-yellow-700'
          text='キングダム'
          href={`/post/categories/${categori}`}
        />
      )}
    </div>
  )
});

export default Categori;
