import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import cors from "cors"
import crypto from "crypto";
import {resultUs,changeUser,result,length,addNew,addNewSecond,updateRefresh,insertData,dataUs} from "./db.js";


dotenv.config();
const app = express();
const PORT = 5500;
const randomString = crypto.randomBytes(64).toString("hex");
app.use(express.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  
});


//Tra ket qua nguoi dung nao dang dang nhap

app.get("/requser", authenticationToken, (req, res) => {
  const userId = req.userId;
  const user = dataUs.find((user) => user.id === userId);
  res.json({ status: "Success", dataUser: user });
  });


// Cap nhat thong tin nguoi dung

app.post("/changeuser", authenticationToken, (req, res) => {
  const userId = req.userId;
  const data = req.body;

  const filter = {
    id: userId
  }
  const updateUser = { $set: data }
  changeUser(filter, updateUser)
    .then(() => {
      // Wait for a short time before returning the new data
      
      setTimeout(() => {
        res.status(200).json(dataUs.find((user) => user.id === userId))
        
      }, 1000);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send('An error occurred');
    });
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

//-------------------------------

//Xu ly dang ky
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
      { expiresIn: "600s" }
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
        fullName: data.fullName,
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
      expiresIn: "600s",
    }
  );
  const refreshToken = jwt.sign(
    { token: randomString },
    process.env.ACCESS_TOKEN_SECRET,
    { expiresIn: "5d" }
  );

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
  const refreshToken = req.body.refreshToken;
  const user = result.find((user) => user.refreshToken === refreshToken);

  if (user) {
    // Tạo access token mới nếu refresh token hợp lệ
    const newAccessToken = jwt.sign(
      { id: user.id },
      process.env.ACCESS_TOKEN_SECRET,
      {
        expiresIn: "600s",
      }
    );
    res.json({ newAccessToken });
  } else {
    res.status(401).json({ message: "Invalid refresh token" });
  }
});




//TEST SERVER-----------------------------
app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`SERVER is running on PORT ${PORT}`);
});






