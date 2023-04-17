import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import crypto from "crypto";
import cors from "cors"
import {result,length,addNew,addNewSecond,updateRefresh,insertData} from "./db.js";

dotenv.config();
const app = express();
const PORT = 5000;
const randomString = crypto.randomBytes(64).toString("hex");
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));



// Xu ly dang ky
app.post("/register", (req, res) => {
  const data = req.body;
  const username = data.username;
  const password = data.password;
  const userExists = result.find((u) => u.username === username);
  if (userExists) {
    res.status(400).send("Username already taken");
  } else {

    let refreshToken = jwt.sign(
      { token: randomString },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "5d" }
    );
    let newUserLogin = {
      username: username,
      password: password,
      email: "",
      refreshToken: refreshToken,
    };
    let newUser = {
      fullName: "",
      phone: "",
      email: "",
      address: "",
      purchaseOrder:[],listCart:[]
    };
    let query = {username:username, password:password};
    /* let querySecond={fullName:""}; */
    let updateLogin = {$set: newUserLogin};
    /* let updateUser = {$set: newUser}; */
    let options = {upsert: true};
    addNew(query,updateLogin,options);
    /* addNewSecond(querySecond,updateUser,options); */
    insertData(newUser)
    
    const accessToken = jwt.sign(
      { id: length + 1},
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "30s" }
    );
    res.status(201).json({ accessToken, refreshToken });
  }
});


// Xu Ly dang nhap
app.post("/login", (req, res) => {
  const data = req.body;
  const username = data.username;
  const password = data.password;
  
  let user;
  if(data.email){
  let users = result.find(us => us.email === data.email);
    if (!users) {
      let newUserLogin = {
        username: "",
        password: "",
        email: data.email,
        refreshToken:jwt.sign(
          { token: randomString },
          process.env.ACCESS_TOKEN_SECRET,
          { expiresIn: "5d" }),
      };
      let newUser = {
        fullName: "",
        phone: "",
        email: data.email,
        address: "",
        purchaseOrder:[],
        listCart:[]
      };
      let query = {email: data.email};
      let updateLogin = {$set: newUserLogin};
      let updateUser = {$set: newUser};
      let options = {upsert: true};
      addNew(query,updateLogin,options);
      addNewSecond(query,updateUser,options);
      user = newUserLogin;  
    }else{
      user = users
    }
  }else{
    user = result.find(us => us.username === username && us.password === password)
  }

  if (!user) res.sendStatus(401);
  const accessToken = jwt.sign(
    { id:(user.id) ? user.id : length + 1},
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
  res.cookie('refreshTokenCookie', refreshToken, { httpOnly: true })
  res.status(200).json({ accessToken, refreshToken });
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
  const authorizationHeader = req.headers["authorization"];
  if (!authorizationHeader) return res.sendStatus(401);
  const token = authorizationHeader.split(" ")[1];
  if (!token) res.sendStatus(401);
  
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,{ ignoreExpiration: true });
    const userId = decoded.id;
    console.log(decoded.id)
    const user = result.find(us => us.id === userId)
    // handle decoded token here
  } catch (error) {
    // handle error here
  }
  
  
  /* const refreshToken = req.body.refreshToken;
  const user = result.find((user) => user.refreshToken === refreshToken);

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
  } */
});

app.listen(PORT, () => {
  console.log(`SERVER is running on PORT ${PORT}`);
});
