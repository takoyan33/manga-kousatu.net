import React from "react";
import Link from "next/link";

export const Loginbutton = () => {
  return (
    <div>
      <button className=" text-center m-auto  my-2 ">
        <Link
          href="/login"
          className=" text-center m-auto my-2 border-solid  hover:border-dotted"
        >
          ログインはこちら
        </Link>
      </button>
    </div>
  );
};
