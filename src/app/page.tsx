
import styles from "./index.module.css";
import {seedUsers,syncUsers,fetchChild,fetchParent,archiveChild,archiveParent} from "../lib/actions"
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

export default async function Home() {
  // server side fetching
  const parentData = await fetchParent()
  const childData = await fetchChild()
  const sortedParent = parentData.sort((a, b) => a.properties.email.localeCompare(b.properties.email)); //sorting the parent data aphabetically by email, so they line up better when put into our program
  const sortedChild = childData.sort((a, b) => a.properties.email.localeCompare(b.properties.email))


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
            <Button variant="outlined" color="error" onClick={archiveParent}>Archive users **For testing purposes only**</Button>
            <p>{`Total Contacts: ${parentData.length}`} </p>
            <div>
              {parentData.length > 0 ? 
              sortedParent.map(user =>(
                <div key={user.id}>
                  <p>First name: {user.properties.firstname} Last Name: {user.properties.lastname} email: {user.properties.email}</p>
                </div> 
              ))
              :
              "Use the seed Button to seed 100 users!"}
            </div>
          </Box>
          <div
            className={styles.card}
          >
            <h3 className={styles.cardTitle}>Child Hubspot</h3>
              <div className={styles.cardText}>
              </div>
              <Button variant="contained" onClick={syncUsers}>Transfer 100 users</Button>
              <Button variant="outlined"  color="error" onClick={archiveChild}>Archive users **For testing purposes only**</Button>
              <p>{`Total Contacts: ${childData.length}`} </p>
              <div>
              {childData.length > 0 ? 
              sortedChild.map(user =>(
                <div key={user.id}>
                  <p>First name: {user.properties.firstname} Last Name: {user.properties.lastname} email: {user.properties.email}</p>
                </div> 
              ))
              :
              "Use the seed Button to seed 100 users!"}
            </div>
              </div>
        </div>
      </div>
    </main>
  );
}
