
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

  interface User {
    id: string;
    properties: {
      firstname: string;
      lastname: string;
       email: string;
    }
  }


  const sortedParent = parentData.sort((a:User, b:User) => a.properties.email.localeCompare(b.properties.email)); //sorting the parent data aphabetically by email, so they line up better when put into our program
  const sortedChild = childData.sort((a:User, b:User) => a.properties.email.localeCompare(b.properties.email))

  return (
      <Container>
       <Typography variant="h1" fontFamily={"Helvetica Neue, sans-serif"} fontWeight={'800'}>
          Syncsmart GG Takehome        
        </Typography> 
      <Box sx={{ padding: 4,}}>
          <Grid  container spacing={2} columns={2}>
            {/* Parent Hubspot Card */}
            <Grid size={1}>
              <Box sx={{padding: 2, border: 2, borderRadius: 2, boxShadow: 7 }}>
                <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                  Parent Hubspot
                </Typography>
                <Box sx={{ margin: 2 }}>
                  <Button variant="contained" fullWidth onClick={seedUsers}>
                    Seed 100 users
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    fullWidth
                    sx={{ marginTop: 2 }}
                    onClick={archiveParent}
                  >
                    Archive users (For testing purposes only)
                  </Button>
                </Box>
                <Typography variant="h6">{`Total Contacts: ${parentData.length}`}</Typography>
                <Box sx={{ marginTop: 2 }}>
                  {parentData.length > 0 ? (
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>First Name</TableCell>
                          <TableCell>Last Name</TableCell>
                          <TableCell>Email</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {sortedParent.map((user:User) => (
                          <TableRow key={user.id}>
                            <TableCell>{user.properties.firstname}</TableCell>
                            <TableCell>{user.properties.lastname}</TableCell>
                            <TableCell>{user.properties.email}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <Typography variant="body1">Use the seed Button to seed 100 users!</Typography>
                  )}
                </Box>
              </Box>
            </Grid>

            {/* Child Hubspot Card */}
            <Grid size={1}>
              <Box sx={{ padding: 2, border: 2, borderRadius: 2, boxShadow: 7}}>
               <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
                 Child Hubspot
                </Typography>
                <Box sx={{ margin: 2 }}>
                  <Button variant="contained" fullWidth onClick={syncUsers}>
                    Transfer 100 users
                  </Button>
                  <Button
                    variant="outlined"
                    color="error"
                    fullWidth
                    sx={{ marginTop: 2 }}
                    onClick={archiveChild}
                  >
                    Archive users (For testing purposes only)
                  </Button>
                </Box>
                <Typography  variant="h6">{`Total Contacts: ${childData.length}`}</Typography>
                <Box sx={{ marginTop: 2 }}>
                  {childData.length > 0 ? (
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>First Name</TableCell>
                          <TableCell>Last Name</TableCell>
                          <TableCell>Email</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {sortedChild.map((user:User) => (
                          <TableRow key={user.id}>
                            <TableCell>{user.properties.firstname}</TableCell>
                            <TableCell>{user.properties.lastname}</TableCell>
                            <TableCell>{user.properties.email}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  ) : (
                    <Typography variant="body1">Use the seed Button to seed 100 users!</Typography>
                  )}
                </Box>
              </Box>
            </Grid>
          </Grid>
      </Box>
      </Container>
  );
};
