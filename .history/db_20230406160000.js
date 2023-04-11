
import { MongoClient } from 'mongodb';
import dotenv from "dotenv";

dotenv.config();

const uri = `mongodb+srv://${process.env.USER_QL}:${process.env.PAS_QL}@tech.of4l8iy.mongodb.net/?retryWrites=true&w=majority`;
export const client = new MongoClient(uri);

async function run(){
    try{
        await client.connect();
        console.log("Connected to MongoDB Atlas");
    }catch (err) {
        console.error(err);
    }
}
run();


/* let result;
let resultUs;
let length;
export async function changeDataLogin() {
    try {
        const database = client.db('User');
        const collection = database.collection('userLogin');
        let query = {};
        // Lấy kết quả của hàm getDataLogin khi khởi động server
        result = await getDataLogin(query);
        resultUs = await getData(query);
        length = result.length;
        console.log(length)
      // Sử dụng phương thức watch để theo dõi thay đổi trong bộ sưu tập
        const changeStream = collection.watch();
        while (true) {
            if (await changeStream.hasNext()) {
            const next = await changeStream.next();
            console.log('Thay đổi:', next);
            //update result
            // Cập nhật kết quả của hàm getDataLogin khi có thay đổi xảy ra
            result = await getDataLogin(query);
            resultUs = await getData(query);
            length = result.length;
          
        }
        return result;
      }
    } catch (err) {
      console.error(err);
    }
  }
  changeDataLogin();
export {result,length,resultUs}; */

let result;
let resultUs;
let length;
let returnValue;
export async function changeDataLogin() {
  try {
    const database = client.db('User');
    const collection = database.collection('userLogin');
    let query = {};
    // Lấy kết quả của hàm getDataLogin khi khởi động server
    result = await getDataLogin(query);
    resultUs = await getData(query);
    length = result.length;
    console.log(resultUs)
    console.log(length);
    // Sử dụng phương thức watch để theo dõi thay đổi trong bộ sưu tập
    const changeStream = collection.watch();
    while (true) {
      if (await changeStream.hasNext()) {
        const next = await changeStream.next();
        console.log('Thay đổi:', next);
        //update result
        // Cập nhật kết quả của hàm getDataLogin khi có thay đổi xảy ra
        result = await getDataLogin(query);
        resultUs = await getData(query);
        console.log(resultUs)
        length = result.length;
        returnValue = { result, resultUs, length };
      }
      return { result, resultUs, length };
    }
  } catch (err) {
    console.error(err);
  }
}
changeDataLogin();

export { result, resultUs, length };



export async function getData(query) {
    try {
        const database = client.db('User');
        const collection = database.collection('userInf');

        const data = await collection.find(query).toArray();
        return data;
    } catch (err) {console.log(err) }
};
export async function getDataLogin(query) {
    try {
        const database = client.db('User');
        const collection = database.collection('userLogin');

        const data = await collection.find(query).toArray();
        return data;
    } catch (err) {console.log(err) }
};


export async function updateData(filter, updateDoc) {
    try {
        const database = client.db('User');
        const collection = database.collection('userInf');

        // update data or add new user
        await collection.updateOne(filter, updateDoc);
    } catch (err) { console.log(err) }
}


export async function updateRefresh(filter, updateDoc) {
    try {
        const database = client.db('User');
        const collection = database.collection('userLogin');

        // update refresh token
        await collection.updateOne(filter, updateDoc);
    } catch (err) { console.log(err) }
}



export async function addNew(query,update,option){
    try{
        const database = client.db('User');
        const collection = database.collection('userLogin');
        await collection.updateOne(query, update, option);
    }catch (err){
        console.log(err)
    }
}
export async function addNewSecond(query,update,option){
    try{
        const database = client.db('User');
        const collection = database.collection('userInf');
        await collection.updateOne(query, update, option);
    }catch (err){
        console.log(err)
    }
}

// ADD NEW USER
export async function insertData(data, dataSecond) {
    try {
        const database = client.db('User');
        const collection = database.collection('userInf');
        const collectionSecond = database.collection('userLogin');
        await collection.insertOne(data);
        await collectionSecond.insertOne(dataSecond);
        if (result.acknowledged) {
            console.log('Data inserted successfully');
            return result.insertedId;
        } else {
            console.log('Data insertion failed');
            return null;
        }
    } catch (error) {
        console.error(error);
    }
}
