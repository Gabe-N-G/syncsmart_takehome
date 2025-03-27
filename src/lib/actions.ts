
import { faker } from "@faker-js/faker";
import axios from "axios";
import { env } from "~/env";
// Function to generate and insert 100 fake users
const contactURL = "https://api.hubapi.com/crm/v3/objects/contacts"

const parentHeaders ={
  headers:{
    Authorization: `Bearer ${env.NEXT_PUBLIC_PARENTVAR}`,
    'Content-Type': 'application/json'
  }
}

export default async function seedUsers() {
  // console.log("clicked!")
  const inputs: { properties: { 
    email: string, 
    firstname: string, 
    lastname: string }}[] = [];

      for (let i = 0; i < 100; i++) {
        // Generate fake user data
        const firstName = faker.person.firstName();
        const lastName = faker.person.lastName();
        const email = faker.internet.email();
        // Log the inserted user for reference
        console.log(`Inserted user ${i + 1}: ${firstName} ${lastName} ${email}`);
        const obj = {
              properties: {
                  email: email,
                  firstname: firstName,
                  lastname: lastName
               }
        };
        inputs.push(obj)
      }
      console.log(inputs)
      axios.put(contactURL,inputs,parentHeaders)
        .then((res) => {
          console.log("Sucessfully seeded 100 items", res)
        })
        .catch((err) => console.error(err))
  }