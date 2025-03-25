//example way to do this.

import { faker } from "@faker-js/faker";
import postgres from "postgres";


const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });

// Create a MySQL connection
const connection = postgres({
  host: 'localhost', // Your database host
  user: 'root',      // Your database username
  password: '',      // Your database password
  database: 'your_database_name', // Your database name
});

// Function to seed data
const seedDatabase = async () => {
  const users = [];
  
  // Generate 100 fake users
  for (let i = 0; i < 100; i++) {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email();
    
    users.push([firstName, lastName, email]);  // Push user data into an array
  }

  // Create SQL query to insert data
  const query = 'INSERT INTO users (first_name, last_name, email) VALUES ?';
  
  // Insert fake data into the database
  connection.query(query, [users], (err, results) => {
    if (err) {
      console.error('Error inserting data: ', err);
    } else {
      console.log(`${results.affectedRows} records inserted`);
    }

    // Close the connection
    connection.end();
  });
};
