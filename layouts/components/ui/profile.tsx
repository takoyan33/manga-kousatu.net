import React from "react";
import { makeStyles } from "@material-ui/core";

const Footer = () => {
  return (
    <Link href={`/profile/${user.userid}`}>
      <div key={user.userid}>
        <div className="bg-slate-200 my-8 py-8">
          <br></br>
          <Avatar alt="Remy Sharp" src={user.profileimage} />
          <br></br>
          <span className="text-xl">投稿者名：{user.username}</span>
          <p className="text-xl">プロフィール：{user.bio}</p>
          <br></br>
        </div>
      </div>
    </Link>
  );
};

export default Footer;
