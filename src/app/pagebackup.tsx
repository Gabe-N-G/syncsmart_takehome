
import styles from "./index.module.css";
import {seedUsers,syncUsers,fetchChild,fetchParent,archiveChild,archiveParent} from "../lib/actions"
import { Container, Box, Button, Typography, Grid, Table, TableHead, TableRow, TableCell, TableBody } from '@mui/material';
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
    <main>
      <Container>
        <Box sx={{height:'100vh', background:'linear-gradient(to right bottom,rgb(3, 33, 20),rgb(5, 22, 107))'}}>
        <h1 className={styles.title}>
          Syncsmart <span className={styles.pinkSpan}>GG</span> Takehome
        </h1>
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
                {parentData.length > 0 ? (
                  <table>
                    <thead>
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedParent.map(user => (
                        <tr key={user.id}>
                          <td>{user.properties.firstname}</td>
                          <td>{user.properties.lastname}</td>
                          <td>{user.properties.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  "Use the seed Button to seed 100 users!"
                )}
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
                {childData.length > 0 ? (
                  <table>
                    <thead>
                      <tr>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Email</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedChild.map(user => (
                        <tr key={user.id}>
                          <td>{user.properties.firstname}</td>
                          <td>{user.properties.lastname}</td>
                          <td>{user.properties.email}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  "Use the seed Button to seed 100 users!"
                )}
              </div>
            </div>
          </Box>
    </Container>
  </main>
  );
}
