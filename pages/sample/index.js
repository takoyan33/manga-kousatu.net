import React from "react";
import Link from "next/link";
import styles from "../styles/Home.module.css";

const Home = () => {
  // 適当な配列を作成
  const samples = [
    { id: 1, name: "tanaka", text: "暖かくなってきたね！" },
    { id: 2, name: "yamada", text: "パンケーキ食べたい" },
    { id: 3, name: "watanabe", text: "お腹減った" },
  ];

  return (
    <div>
      {samples.map((sample) => {
        // userの情報
        const sampleInfo = { id: sample.id, name: sample.name, text: sample.text };
        return (
          <li className={styles.link} key={sample.id}>
            {/* queryで渡したい情報を遷移先に渡す */}
            <Link
              as={`/samples/${sample.name}`}
              href={{ pathname: `/samples/[name]`, query: sampleInfo }}
            >
              <a>{sample.name}</a>
            </Link>
          </li>
        );
      })}
    </div>
  );
};

export default Home;
