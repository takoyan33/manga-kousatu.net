import React, { useContext } from "react";
// import { LoginContext } from "../../../pages/index";
import Link from "next/link";
import Button from "@mui/material/Button";

type Context = {
  text: string;
};

// eslint-disable-next-line react/display-name
export const Loginbutton = React.memo(() => {
  // const loginContext = useContext<Context>(LoginContext);
  return (
    <div>
      <Button variant="outlined" className="m-auto w-50 my-2">
        {/* <Link href="/login">{loginContext.text}</Link> */}
      </Button>
    </div>
  );
});
