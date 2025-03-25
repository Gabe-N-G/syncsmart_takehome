// import Link from "next/link";
import styles from "./index.module.css";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>
        Syncsmart <span className={styles.pinkSpan}>GG</span> Takehome
        </h1>
        <div className={styles.cardRow}>
          <div
            className={styles.card}
          >
            <h3 className={styles.cardTitle}>Parent Hubspot</h3>
            <div className={styles.cardText}>
              Todo: Add Buttonns to Seed Data. Show count of items in database.
            </div>
            <button>Seed 100 users</button>
            <p>User Count: 'Insert user count variable here'</p>
            <button>Clear users **For testing purposes only**</button>
          </div>
          <div
            className={styles.card}
          >
            <h3 className={styles.cardTitle}>Child Hubspot</h3>
              <div className={styles.cardText}>
                Todo: Add Buttonns to Seed Data. Show count of items in database.
              </div>
              <button>Transfer 100 users</button>
              <p>User Count: 'Insert user count variable here'</p>
              <button>Clear users **For testing purposes only**</button>
          </div>
        </div>
      </div>
    </main>
  );
}
