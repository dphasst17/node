
import {MongoClient} from 'mongodb';
import dotenv from "dotenv";

dotenv.config();

const uri = `mongodb+srv://${process.env.USER_QL}:${process.env.PAS_QL}@tech.of4l8iy.mongodb.net/?retryWrites=true&w=majority`;

export const client = new MongoClient(uri);
export async function getData(query) {
    try {
        await client.connect();
      
        const database = client.db('User');
        const collection = database.collection('userInf');
        
        const data = await collection.find(query).toArray();
      
        /* console.log(data); */
      }catch(err){console.log(err)}
};
export async function updateData(filter,updateDoc) {
    try {
      await client.connect();
      const database = client.db('User');
      const collection = database.collection('userInf');
  
      
  
      // Cập nhật tài liệu
      const result = await collection.updateOne(filter, updateDoc);
  
      console.log(result)
    }catch(err){console.log(err)}
  }
