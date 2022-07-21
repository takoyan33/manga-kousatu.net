import React from "react";
import Link from "next/link";

export const Registerbutton = () => {
  return (
    <div>
      <button className="text-center m-auto my-2 border-solid  hover:border-dotted">
        <Link href="/register" className=" text-center m-auto my-2">
          新規登録はこちら
        </Link>
      </button>
    </div>
  );
};
