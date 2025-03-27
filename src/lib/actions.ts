
import { faker } from "@faker-js/faker";
import axios from "axios";

// Function to generate and insert 100 fake users
const contactURL = "https://api.hubapi.com/crm/v3/objects/contacts"

export default async function seedUsers() {
  console.log("clicked!")
  const inputs: { properties: { 
    email: string, 
    firstname: string, 
    lastname: string }}[] = []
  ;
      for (let i = 0; i < 100; i++) {
        
        // Generate fake user data
        const firstName = faker.person.firstName();
        const lastName = faker.name.lastName();
        const email = faker.internet.email();
        // Log the inserted user for reference
        console.log(`Inserted user ${i + 1}: ${firstName} ${lastName} (${email})`);

        const obj = {
              properties: {
                  email,
                  firstname: firstName,
                  lastname: lastName
               }
        };

        inputs.push(obj)
      }
      console.log(inputs)
      console.log('Successfully inserted 100 users into the database');
  }