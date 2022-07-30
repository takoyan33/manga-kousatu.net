import React from "react";
import Link from "next/link";
import Button from "@mui/material/Button";

type Props = {
  text: string;
};

// eslint-disable-next-line react/display-name
export const Registerbutton: React.VFC<Props> = React.memo(({ text }) => {
  return (
    <div>
      <Button variant="outlined" className="m-auto w-50 my-2">
        <Link href="/register">{text}</Link>
      </Button>
    </div>
  );
});
