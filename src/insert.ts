import { Client } from "pg"
import dotenv from "dotenv"
dotenv.config()
const client = new Client({
    connectionString : process.env.CONNECTION_STRING
});

async function insertData(){
    try {
    await client.connect();
    // const insertQuery = `INSERT INTO users (username, email, password) VALUES ('username2', 'user3@example.com', 'user_password');`
    // const result = await client.query(insertQuery);
    // wrong way of during inserting data, any user provided field should be made values so that we may be safe from sql injection 
    // use $1 like syntax
    const insertQuery = `INSERT INTO users (username, email, password) VALUES ($1, $2, $3);`
    const values = ["username1","user1@email,in","password123"];
    const result = await client.query(insertQuery,values);
    console.log(result);
    }
    catch(e){
        console.error("Error during insertion " + e);
    }
    finally{
        await client.end();
    }
       
}

insertData();