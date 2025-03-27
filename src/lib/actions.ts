'use server';

import { faker } from "@faker-js/faker";
import axios from "axios";
import { env } from "~/env";
// Function to generate and insert 100 fake users
const contactURL = "https://api.hubapi.com/crm/v3/objects/contacts"
const batchURL = "https://api.hubapi.com/crm/v3/objects/contacts/batch/create"
const parentHeaders ={
  headers:{
    Authorization: `Bearer ${process.env.PARENTVAR}`,
    'Content-Type': 'application/json'
  }
}

const hubspot = require('@hubspot/api-client');

const hubspotClient = new hubspot.Client({"accessToken":"YOUR_ACCESS_TOKEN"});

const BatchInputSimplePublicObjectBatchInputUpsert = { inputs: [
  {"idProperty":"string",
    "objectWriteTraceId":"string",
    "id":"string","properties":{"lastname":"S.","firstname":"Mark"}}
  ] 
};



export default async function seedUsers() {
  // console.log("clicked!")
  const inputs: { properties: { 
    email: string, 
    firstname: string, 
    lastname: string }}[] = [];

      for (let i = 0; i < 10; i++) {
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
      console.log({inputs})

      axios.post(batchURL,{inputs},parentHeaders)
        .then((res) => {
          console.log("Sucessfully seeded 100 items", res)
        })
        .catch((err) => console.error(err))
  }