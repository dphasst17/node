
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
export let globalCount = 0;

export async function changeID(){
    try {
        const database = client.db('User');
        const collection = database.collection('userLogin');

        // Sử dụng phương thức watch để theo dõi thay đổi trong bộ sưu tập
        const changeStream = collection.watch();
        while (await changeStream.hasNext()) {
            const next = await changeStream.next();
            console.log('Thay đổi:', next);

            // Cập nhật giá trị của biến globalCount
            return globalCount = await collection.countDocuments();
            console.log('Số lượng tài liệu:', globalCount);
        }
    } catch (err) {
        console.error(err);
    }
}
// Viết một hàm getter để lấy giá trị của biến globalCount
export function getCount() {
    return globalCount;
}
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

        // Cập nhật tài liệu
        await collection.updateOne(filter, updateDoc);
    } catch (err) { console.log(err) }
}
export async function updateRefresh(filter, updateDoc) {
    try {
        const database = client.db('User');
        const collection = database.collection('userLogin');

        // Cập nhật tài liệu
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
