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
export default async function getData(query) {
    try {
        await client.connect();
      
        const database = client.db('User');
        const collection = database.collection('userInf');
        
        const data = await collection.find(query).toArray();
      
        console.log(data);
      } finally {
        await client.close();
      }
}
export async function updateData(filter,updateDoc) {
    try {
      await client.connect();
      const database = client.db('User');
      const collection = database.collection('userInf');
  
      // Tạo một bộ lọc để tìm tài liệu bạn muốn cập nhật
      const filter = { username: 'old-username' };
  
      // Tạo một tài liệu cập nhật chỉ định các thay đổi bạn muốn thực hiện
      const updateDoc = {
        $set: {
          username: 'new-username',
        },
      };
  
      // Cập nhật tài liệu
      const result = await collection.updateOne(filter, updateDoc);
  
      console.log(`Đã khớp ${result.matchedCount} tài liệu.`);
      console.log(`Đã sửa đổi ${result.modifiedCount} tài liệu.`);
    } finally {
      await client.close();
    }
  }