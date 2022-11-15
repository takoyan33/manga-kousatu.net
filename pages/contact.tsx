import React from "react";
import { MuiNavbar } from "../layouts/components/MuiNavbar";
import { SiteHead } from "../layouts/components/ui/SiteHead";

function Contact() {
  return (
    <div>
      <SiteHead />
      <MuiNavbar />
      <div className="max-w-7xl m-auto">
        <h2 className="m-5 my-12 text-center text-2xl font-semibold">About</h2>
        <p className="">お問合せ</p>
      </div>
    </div>
  );
}

export default Contact;
