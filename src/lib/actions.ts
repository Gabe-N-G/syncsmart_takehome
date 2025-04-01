"use server";

import { faker } from "@faker-js/faker";
import axios from "axios";
import { revalidatePath } from "next/cache";

const fetchURL = "https://api.hubapi.com/crm/v3/objects/contacts?limit=100";
const batchURL = "https://api.hubapi.com/crm/v3/objects/contacts/batch/create";
const archiveURL = "https://api.hubapi.com/crm/v3/objects/contacts/batch/archive";
const parentHeaders = {
  headers: {
    Authorization: `Bearer ${process.env.PARENTVAR}`,
    "Content-Type": "application/json",
  },
};

const childHeaders = {
  headers: {
    Authorization: `Bearer ${process.env.CHILDVAR}`,
    "Content-Type": "application/json",
  },
};

export async function fetchParent() {
  try {
    const res = await axios.get(fetchURL, parentHeaders);
    console.log("fetched: ", res.data.results);
    return res.data.results;
  } catch (err) {
    console.error(err);
  }
}

export async function fetchChild() {
  try {
    const res = await axios.get(fetchURL, childHeaders);
    console.log("fetched: ", res.data.results);
    return res.data.results; 
  } catch (err) {
    console.error(err);
  }
}

export async function seedUsers() {
  // console.log("clicked!")
  const inputs: {
    properties: {
      // Creating the formatted array for input properties for hubspot, could change into an aliaslater
      email: string;
      firstname: string;
      lastname: string;
    };
  }[] = [];

  for (let i = 0; i < 100; i++) {
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const email = faker.internet.email();

    console.log(`Inserted user ${i + 1}: ${firstName} ${lastName} ${email}`);

    const obj = {
      //creating each property object
      properties: {
        email: email,
        firstname: firstName,
        lastname: lastName,
      },
    };
    inputs.push(obj); //pushing objects into a larger array
  }
  // console.log({inputs})
  try {
    const res = await axios.post(batchURL, { inputs }, parentHeaders); 
    console.log("Successfully seeded 100 items", res);
    revalidatePath('/'); //refreshes/updates data
  } catch (err) {
    console.error("Error seeding users:", err);
  }
}

export async function syncUsers() {
  // console.log("clicked!")
  const inputs: {
    properties: {
      // Creating the formatted array for input properties for hubspot, could change into an alias later
      email: string;
      firstname: string;
      lastname: string;
    };
  }[] = [];

  try {
    const fetchResponse = await axios.get(fetchURL, parentHeaders);
    // console.log("fetched: ", fetchResponse.data.results);
    const results = fetchResponse.data.results;

    for (let i = 0; i < results.length; i++) {
      const obj = {
        //creating each property object
        properties: {
          //specifically using email, first and last name, as there are other properties like dates within the object
          email: results[i].properties.email,
          firstname: results[i].properties.firstname,
          lastname: results[i].properties.lastname,
        },
      };
      inputs.push(obj);
    }
    console.log(inputs);

    // Now post the data
    try {
      const postResponse = await axios.post(batchURL, { inputs }, childHeaders);
      console.log("Successfully seeded 100 items to child database", postResponse);
      revalidatePath('/'); //refreshes/updates data
    } catch (err) {
      console.error("Something went wrong with the post request:", err);
    }
  } catch (err) {
    console.error("Something went wrong with the fetch request:", err);
  }
}


export async function archiveParent(){
  // console.log("clicked!")
  try {
    const fetchResponse = await axios.get(fetchURL, parentHeaders);
    console.log("fetched: ", fetchResponse.data.results);
    
    const inputs: string[] = []; //creates an array of all the 100 ids inside the database
    for (let i = 0; i < fetchResponse.data.results.length; i++) {
      inputs.push(fetchResponse.data.results[i].id);
      console.log(inputs);
    }

    try {
      const postResponse = await axios.post(archiveURL, { inputs }, parentHeaders);
      console.log("Archived 100 items", postResponse);
      revalidatePath('/'); // Refreshes/updates data
    } catch (err) {
      console.error("Something went wrong with the post request", err);
    }

  } catch (err) {
    console.error("Something went wrong with the fetch request", err);
  }
}

export async function archiveChild(){
  // console.log("clicked!")
  try {
    const fetchResponse = await axios.get(fetchURL, childHeaders);
    console.log("fetched: ", fetchResponse.data.results);
    
    const inputs: string[] = []; //creates an array of all the 100 ids inside the database
    for (let i = 0; i < fetchResponse.data.results.length; i++) {
      inputs.push(fetchResponse.data.results[i].id);
      console.log(inputs);
    }

    try {
      const postResponse = await axios.post(archiveURL, { inputs }, childHeaders);
      console.log("Archived 100 items", postResponse);
      revalidatePath('/'); // Refreshes/updates data
    } catch (err) {
      console.error("Something went wrong with the post request", err);
    }

  } catch (err) {
    console.error("Something went wrong with the fetch request", err);
  }
}
