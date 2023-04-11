import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";
import userINF from "./usInf.js";
/* import connect from "./db.js"; */
import {MongoClient} from 'mongodb';
/* const URL = `mongodb+srv://saTech:${process.env.PASS_QL}>@cluster0.m274yut.mongodb.net/?retryWrites=true&w=majority` */

dotenv.config();
const app = express();
const PORT = 5500;
app.use(express.json());

app.get("/reqUser", authenticationToken, (req, res) => {
  const userId = req.userId;
  console.log(userId);
  const user = userINF.find((user) => user.id === userId);
  res.json({ status: "Success", dataUser: user });
});

//Xu ly token user gui lên để lấy thông tin người dùng
function authenticationToken(req, res, next) {
  const authorizationHeader = req.headers["authorization"];
  if (!authorizationHeader) return res.sendStatus(401);
  const token = authorizationHeader.split(" ")[1];
  if (!token) res.sendStatus(401);

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) => {
    console.log(err, data);
    if (err) res.sendStatus(403);
    req.userId = data.id;
    next();
  });
}
/* const query = `SELECT * FROM userLogin WHERE id = 1`
connect(query); */


const uri = `mongodb+srv://${process.env.USER_QL}:${process.env.PAS_QL}@tech.of4l8iy.mongodb.net/?retryWrites=true&w=majority`;
/* mongoose.set('strictQuery',false)
mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log("success")
}); */
try {
  await client.connect();

  const database = client.db('myDatabase');
  const collection = database.collection('myCollection');

  // Replace the query object with your own query criteria
  const query = { name: 'John' };
  const data = await collection.find(query).toArray();

  console.log(data);
} finally {
  await client.close();
}

/* mongoose.connect(`mongodb+srv://techstore:${process.env.PAS_QL}@tech.msftkp1.mongodb.net/?retryWrites=true&w=majority`,{
  useNewUrlParser:true,
  useUnifiedTopology:true,
}).then(async () => {
  const MyModel = mongoose.model('User', new mongoose.Schema({ name: String }));

MyModel.find({}, function (err, docs) {
  console.log(docs);
});
}) */
app.listen(PORT, () => {
  console.log(`SERVER is running on PORT ${PORT}`);
  
});






