
import { MongoClient } from 'mongodb';
import dotenv from "dotenv";

dotenv.config();

const uri = `mongodb+srv://${process.env.USER_QL}:${process.env.PAS_QL}@tech.of4l8iy.mongodb.net/?retryWrites=true&w=majority`;
export const client = new MongoClient(uri);
let result;
let resultUs;
let length;
let dataUs;


async function run() {
    try {
        await client.connect();
        console.log("Connected to MongoDB Atlas");
    } catch (err) {
        console.error(err);
    }
}
run().catch(err => console.log(err));


export async function changeDataLogin() {
    const update = async (e) => {
        result = await getDataLogin(e);
        resultUs = await getData(e);
        length = result.length;
    }
    try {
        const database = client.db('User');
        const collection = database.collection('userLogin');
        let query = {};
        await update(query)
        const changeStream = collection.watch();
        changeStream.on('change', async () => {
            await update(query)
        });

    } catch (err) {
        console.error(err);
    }

    return { result, resultUs, length };
}
changeDataLogin().catch(err => console.log(err));

export { result, resultUs, length };




export async function newData() {
    const update = async(e) => {
        dataUs = await getData(e);
    }
    try {
        const database = client.db('User');
        const collection = database.collection('userInf');
        let query = {};
        await update(query)
        const changeStream = collection.watch();
        changeStream.on('change', async () => {
            await update(query)
            return dataUs;
        });
    } catch (err) {
        console.error(err);
    }
    return { dataUs };
}
await newData().catch(err => console.log(err));
export { dataUs };


export async function getData(query) {
    try {
        const database = client.db('User');
        const collection = database.collection('userInf');
        const data = await collection.find(query).toArray();
        return data
    } catch (err) { console.log(err) }
};
export async function getDataLogin(query) {
    try {
        const database = client.db('User');
        const collection = database.collection('userLogin');
        const data = await collection.find(query).toArray();
        return data;
    } catch (err) { console.log(err) }
};

export async function updateRefresh(filter, updateDoc) {
    try {
        const database = client.db('User');
        const collection = database.collection('userLogin');
        await collection.updateOne(filter, updateDoc);
    } catch (err) { console.log(err) }
}



export async function changeUser(filter, updateUser) {
    try {
        const database = client.db('User');
        const collection = database.collection('userInf');
        const updatedUser = await collection.findOneAndUpdate(filter, updateUser, { returnOriginal: false });
        return updatedUser.value;
    } catch (err) {
        console.log(err)
    }
}



export async function addNew(query, update, option) {
    try {
        const database = client.db('User');
        const collection = database.collection('userLogin');
        await collection.findOneAndUpdate(query, update, option);
    } catch (err) {
        console.log(err)
    }
}
export async function addNewSecond(query, update, option) {
    try {
        const database = client.db('User');
        const collection = database.collection('userInf');
        await collection.updateOne(query, update, option);
    } catch (err) {
        console.log(err)
    }
}

// ADD NEW USER
export async function insertData(data) {
    try {
        const database = client.db('User');
        const collection = database.collection('userInf');
        await collection.insertOne(data);
    } catch (error) {
        console.error(error);
    }
}
