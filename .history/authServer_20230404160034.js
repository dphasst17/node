import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";

import userINF from "./usInf.js";
import userLogin from "./usLogin.js";
import {addNew, addNewSecond, changeID, getDataLogin,insertData,updateRefresh} from "./db.js";

dotenv.config();
const app = express();
const PORT = 5000;
const randomString = crypto.randomBytes(64).toString("hex");
app.use(express.json());

const query = {};
const result = await getDataLogin(query);


// Xu ly dang ky
app.post("/register", (req, res) => {
  const data = req.body;
  const username = data.username;
  const password = data.password;
  const userExists = userLogin.find((u) => u.username === username);
  if (userExists) {
    res.status(400).send("Username already taken");
  } else {


    let newUserLogin = {
      username: "",
      password: "",
      email: data.email,
      refreshToken: null,
    };
    let newUser = {
      fullName: "",
      phone: "",
      email: data.email,
      address: "",
    };
    let query = {email: data.email};
    let updateLogin = {$set: newUserLogin};
    let updateUser = {$set: newUser};
    let options = {upsert: true};
    addNew(query,updateLogin,options);
    addNewSecond(query,updateUser,options);
    res.sendStatus(201)


   /*  const newUsLogin = {
      username: username,
      password: password,
      id: userLogin.length + 1,
      refreshToken: null,
    };
    userLogin.push(newUsLogin);

    const newUser = {
      id: userINF.length + 1,
      username: "",
      phone: "",
      email: "",
      address: "",
    };
    userINF.push(newUser);
    const refreshTokenPayload = { userId: newUsLogin.id };
    const accessToken = jwt.sign(
      { id: newUsLogin.id },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    const refreshToken = jwt.sign(
      { refreshTokenPayload },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5d" }
    );
    newUsLogin.refreshToken = refreshToken;
    res.status(201).json({ accessToken, refreshToken }); */
  }
});

// Xu Ly dang nhap
app.post("/login", (req, res) => {
  const data = req.body;
  const username = data.username;
  const password = data.password;
  
  let user;
  if(data.email){
    user = result.find(us => us.email === data.email);
  if (!user) {
    let newUserLogin = {
      username: "",
      password: "",
      email: data.email,
      refreshToken: null,
    };
    let newUser = {
      fullName: "",
      phone: "",
      email: data.email,
      address: "",
    };
    let query = {email: data.email};
    let updateLogin = {$set: newUserLogin};
    let updateUser = {$set: newUser};
    let options = {upsert: true};
    addNew(query,updateLogin,options);
    addNewSecond(query,updateUser,options);
    return user = newUserLogin
    
  }
  }else{
    user = result.find(us => us.username === username && us.password === password)
  }

  if (!user) res.sendStatus(401);
  const accessToken = jwt.sign(
    { id:user.id},
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "30s",
    }
  );
  const refreshToken = jwt.sign(
    { token: randomString },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "5d" }
  );
  res.json({ accessToken, refreshToken });
  const filter = {id:user.id};
  const updateDoc = {
    $set: {
      refreshToken: refreshToken,
    },
  };
  updateRefresh(filter,updateDoc)

});



// Xu ly token
app.post("/refresh", (req, res) => {
  const refreshToken = req.body.refreshToken;
  const user = userLogin.find((user) => user.refreshToken === refreshToken);

  if (user) {
    // Tạo access token mới nếu refresh token hợp lệ
    const newAccessToken = jwt.sign(
      { id: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "30s",
      }
    );
    res.json({ newAccessToken });
  } else {
    res.status(401).json({ message: "Invalid refresh token" });
  }
});

app.listen(PORT, () => {
  console.log(`SERVER is running on PORT ${PORT}`);
});
