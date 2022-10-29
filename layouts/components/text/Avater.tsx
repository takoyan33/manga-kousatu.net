/* eslint-disable react/display-name */
import React from "react";
import Avatar from "@mui/material/Avatar";

type Props = {
  photoURL: string;
  displayname: string;
};

//React.memo化
const Avater: React.VFC<Props> = React.memo(({ photoURL, displayname }) => {
  return (
    <div>
      <Avatar alt="Remy Sharp" src={photoURL} />
      <span className="text-xl">{displayname}</span>
    </div>
  );
});

export default Avater;
