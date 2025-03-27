// import Link from "next/link";

'use client'

import styles from "./index.module.css";
import {seedUsers,syncUsers} from "../lib/actions"
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h1 className={styles.title}>
        Syncsmart <span className={styles.pinkSpan}>GG</span> Takehome
        </h1>
        <div className={styles.cardRow}>
          <Box
            className={styles.card}
          >
            <h3 className={styles.cardTitle}>Parent Hubspot</h3>
            <div className={styles.cardText}>
            </div>
            <Button variant="contained" onClick={seedUsers}>Seed 100 users</Button>
            <Button variant="outlined" color="error">TODO: Clear users **For testing purposes only**</Button>
            <p>TODO: Add place for data readout here</p>
          </Box>
          <div
            className={styles.card}
          >
            <h3 className={styles.cardTitle}>Child Hubspot</h3>
              <div className={styles.cardText}>
              </div>
              <Button variant="contained" onClick={syncUsers}>Transfer 100 users</Button>
              <Button variant="outlined" color="error">TODO: Clear users **For testing purposes only**</Button>
              <p>TODO: Add place for data readout here</p>
          </div>
        </div>
      </div>
    </main>
  );
}
