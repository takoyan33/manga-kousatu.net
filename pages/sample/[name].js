import { useRouter } from "next/router";
import styles from "../../styles/Home.module.css";

const Name = () => {
  const router = useRouter();
  return (
    <div className={styles.link}>
      <h1>{router.query.name}のPageです</h1>
      <p>{router.query.text}</p>
    </div>
  );
};

export default Name;
