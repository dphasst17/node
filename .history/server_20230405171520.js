import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

import {getData,resultUs} from "./db.js";


dotenv.config();
const app = express();
const PORT = 5500;
app.use(express.json());
const query = {}
const result = await getData((query) ? query : {});

app.get("/reqUser", authenticationToken, (req, res) => {
  const userId = req.userId;
  console.log(userId);
  const user = resultUs.find((user) => user.id === userId);
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

app.get('/', (req, res) => {
  res.send('Hello World!')
})
/* // Tạo một bộ lọc để tìm tài liệu bạn muốn cập nhật
const filter = { id: 1};
  
// Tạo một tài liệu cập nhật chỉ định các thay đổi bạn muốn thực hiện
const updateDoc = {
  $set: {
    fullName: "Dinh Phat",
  },
};
updateData(filter, updateDoc) */



app.listen(PORT, () => {
  console.log(`SERVER is running on PORT ${PORT}`);
});






