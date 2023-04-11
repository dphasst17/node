import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import {resultUs,changeUser} from "./db.js";


dotenv.config();
const app = express();
const PORT = 5500;
app.use(express.json());


//Tra ket qua nguoi dung nao dang dang nhap

app.get("/reqUser", authenticationToken, (req, res) => {
  const userId = req.userId;
  const user = resultUs.find((user) => user.id === userId);
  res.json({ status: "Success", dataUser: user });
  });


// Cap nhat thong tin nguoi dung

app.post("/changeUser",authenticationToken,(req,res) =>{
  const userId = req.userId;
  const data = req.body;
  const fullname = data.fullName;
  const phone = data.phone;
  const email = data.email;
  const address = data.address;
 const filter={
  id:userId
 } 
 const updateUser = {$set:{
  fullName:fullname,
  phone:phone,
  address:address,
  email:email
 }}
 changeUser(filter,updateUser)
})



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

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`SERVER is running on PORT ${PORT}`);
});






