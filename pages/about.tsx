import React from "react";
import { MuiNavbar } from "../layouts/components/MuiNavbar";
import { SiteHead } from "../layouts/components/ui/SiteHead";

function About() {
  return (
    <div>
      <SiteHead />
      <MuiNavbar />
      <div className="max-w-7xl m-auto">
        <h2 className="m-5 my-12 text-center text-2xl font-semibold">About</h2>
        <p>
          Manga Studyでは、漫画の考察などを自由に投稿・閲覧できるwebサイトです。
        </p>
        <ul>
          <li>運営者　　　　　阿部　舜平</li>
          <li>メールアドレス　harrier2070@gmail.com</li>
        </ul>
      </div>
    </div>
  );
}

export default About;
