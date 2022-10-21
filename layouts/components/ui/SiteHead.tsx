import React from "react";
import Head from "next/head";

// eslint-disable-next-line react/display-name
export const SiteHead: React.VFC = React.memo(() => {
  return (
    <div>
      <Head>
        <title>Manga Study</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
    </div>
  );
});
