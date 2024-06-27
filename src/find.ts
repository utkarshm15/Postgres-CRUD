import { Client } from "pg"
import dotenv from "dotenv"
dotenv.config()
const client = new Client({
    connectionString : process.env.CONNECTION_STRING
});

async function getUser(email : string){
    try{
        await client.connect();
        const query = `SELECT * FROM users WHERE email = $1`;
        const result = await client.query(query,[email]);
        
        if(result.rows.length>0){
            console.log("User Found : " , result.rows[0]);
            return result.rows[0];
        } else {
            console.log("User not found");
            return null;
        }
    }
    catch(e){
        console.error("Error during fetching user");
    }
    finally{
        client.end();
    }
}

getUser("user1@email,in");