/* import sql from "mssql";



async function connect(query,params) {
    try {
        // config for your database
        const config = {
            user: 'sa',
            password: '123456',
            server: 'localhost\\SQLEXPRESS',
            database: 'Users',
            options: {
                encrypt: true,
                trustServerCertificate: true
            }
        };

        // connect to your database
        await sql.connect(config);
        const result = (!params) ? await sql.query(query) : await sql.query(query,params)
        console.log('Connected to database')
        console.log(result);
    } catch (err) {
        console.error(err);
    }
}


export default connect;
 */
import {MongoClient} from 'mongodb';
import dotenv from "dotenv";

dotenv.config();

const uri = `mongodb+srv://${process.env.USER_QL}:${process.env.PAS_QL}@tech.of4l8iy.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);
async function getData() {
    try {
        await client.connect();
      
        const database = client.db('User');
        const collection = database.collection('userInf');
        const query = {username:"dfast"}
        const data = await collection.find(query).toArray();
      
        console.log(data.map(items => items.username));
      } finally {
        await client.close();
      }
}
export default getData;