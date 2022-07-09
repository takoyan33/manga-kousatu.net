import Link from "next/link";
import styles from "../styles/Home.module.css";

export const home = (props) => {
  return (
    <div>
      <p>aa</p>
      <Link href={`/home`}></Link>
      <Link href={`/register`}></Link>
      <Link href={`/login`}></Link>
    </div>
  );
};
