// import Link from "next/link";

import styles from "./index.module.css";
import {seedUsers,syncUsers,fetchChild,fetchParent,archiveChild,archiveParent} from "../lib/actions"
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


const fetchURL = "https://api.hubapi.com/crm/v3/objects/contacts?limit=100";

export default async function Home() {
  // server side fetching
  const parentData = await fetchParent()
  const childData = await fetchChild()
  console.log(parentData)


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
            <Button variant="outlined" color="error" onClick={archiveParent}>Clear users **For testing purposes only**</Button>
            <p>{`Total Contacts: ${parentData.length}`} </p>
          </Box>
          <div
            className={styles.card}
          >
            <h3 className={styles.cardTitle}>Child Hubspot</h3>
              <div className={styles.cardText}>
              </div>
              <Button variant="contained" onClick={syncUsers}>Transfer 100 users</Button>
              <Button variant="outlined"  color="error" onClick={archiveChild}>TODO: Clear users **For testing purposes only**</Button>
              <p>{`Total Contacts: ${childData.length}`} </p>
              </div>
        </div>
      </div>
    </main>
  );
}
