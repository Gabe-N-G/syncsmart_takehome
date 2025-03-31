"use server";

import { faker } from "@faker-js/faker";
import axios from "axios";
// Function to generate and insert 100 fake users
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
    return res.data.results; // Return the results from the function
  } catch (err) {
    console.error(err);
  }
}

export async function fetchChild() {
  try {
    const res = await axios.get(fetchURL, childHeaders);
    console.log("fetched: ", res.data.results);
    return res.data.results; // Return the results from the function
  } catch (err) {
    console.error(err);
  }
}

export async function seedUsers() {
  // console.log("clicked!")
  const inputs: {
    properties: {
      // Creating the formatted array for input properties for hubspot, could change into an alias later
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
  await axios
    .post(batchURL, { inputs }, parentHeaders) //inputs is an object here so it can format correctly in call
    .then((res) => {
      console.log("Sucessfully seeded 100 items", res);
    })
    .catch((err) => console.error(err));
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

  await axios
    .get(fetchURL, parentHeaders)
    .then((res) => {
      // console.log("fetched: ", res.data.results);
      const results = res.data.results;
      for (let i = 0; i < results.length; i++) {
        const obj = {
          //creating each property object
          properties: {
            //specifically using email first and last, as there are other properties like dates within object
            email: results[i].properties.email,
            firstname: results[i].properties.firstname,
            lastname: results[i].properties.lastname,
          },
        };
        inputs.push(obj);
      }
      console.log(inputs);
      return axios
        .post(batchURL, { inputs }, childHeaders) //inputs is an object here so it can format correctly in call
        .then((res) => {
          console.log("Sucessfully seeded 100 items to child database", res);
        })
        .catch((err) => console.error("something went wrong with post", err));
    })
    .catch((err) => console.error("something went wrong with fetch", err));
}


// export async function archive(querytype:string){
//   if (querytype =="parent"){
//     archiveParent()
//   } else if (querytype == "child"){
//     archiveChild()
//   }
// }

export async function archiveParent(){
  console.log("clicked!")
  await axios
    .get(fetchURL, parentHeaders)
    .then((res) => {
      console.log("fetched: ", res.data.results);
      const inputs: string[] = [] 
      for(let i = 0 ; i< res.data.results.length; i++){
        inputs.push(res.data.results[i].id)
        console.log(inputs)
      }
    return axios
      .post(archiveURL,{inputs},parentHeaders)
      .then((res) => {console.log("archived 100 items",res)
      })
      .catch((err) => console.error("something went wrong", err));
    })
    .catch((err) => console.error("something went wrong", err));
}

export async function archiveChild(){
  console.log("clicked!")
  await axios
    .get(fetchURL, childHeaders)
    .then((res) => {
      console.log("fetched: ", res.data.results);
      const inputs: string[] = [] 
      for(let i = 0 ; i< res.data.results.length; i++){
        inputs.push(res.data.results[i].id)
        console.log(inputs)
      }
    return axios
      .post(archiveURL,{inputs},childHeaders)
      .then((res) => {console.log("archived 100 items",res)
      })
      .catch((err) => console.error("something went wrong", err));
    })
    .catch((err) => console.error("something went wrong", err));
}
