import styles from "./page.module.css";
import FileDropArea from "./(client-components)/drag-n-drop-panel";

export default function Home() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <FileDropArea/>
      </main>
    </div>
  );
}
