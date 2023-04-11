import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
import crypto from "crypto";
dotenv.config();
const app = express();
const PORT = 5500;
const randomString = crypto.randomBytes(64).toString('hex');
app.use(express.json());
const userINF = [
    {
        id:1,
        username:"phat",
        phone:"011111111",
        email:"email1@gmail.com",
        address:"Da Nang city"
    },
    {
        id:2,
        username:"phat2",
        phone:"0111111112",
        email:"email2@gmail.com",
        address:"Da Nang city"
    }
]
const userLogin = [
    {
        username:"usernamedemo1",
        password:"passworddemo1",
        id:1,
        refreshToken: null
    },
    {
        username:"usernamedemo2",
        password:"passworddemo2",
        id:2,
        refreshToken: null
    }
]
app.get('/reqUser', authenticationToken, (req, res) =>{
    const userId = req.userid;
    const user = userINF.find(user => user.id === userId);
    res.json({status: 'Success', dataUser : user})
})


// Xu ly dang ky 
app.post('/register', (req, res) => {
    const { username, password } = req.body;
    const userExists = userLogin.find(u => u.username === username);
    if (userExists) {
      res.status(400).send('Username already taken');
    } else {
        const newUsLogin = {
            username:username,
            password:password,
            id:userLogin.length + 1,
            refreshToken:null
          };
          userLogin.push(newUsLogin);
      
      
      const accessToken = jwt.sign({ id: newUsLogin.id }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '30s' });
      const refreshToken = jwt.sign({token: randomString }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '5d'})
      userLogin.refreshToken = refreshToken
      const newUser = {
        id: userINF.length + 1,
        username:"",
        phone:"",
        email:"",
        address:""
      };
      userINF.push(newUser);

      res.status(201).json({ userINF,userLogin,accessToken, refreshToken });
    }
  });




// Xu Ly dang nhap 
app.post('/login',(req, res) => {
    const data = req.body;
    const username = data.username;
    const password = data.password;
    const user = userLogin.find(us => us.username === username && us.password === password);
    if(!user)res.sendStatus(401);
    
    const accessToken = jwt.sign({id : user.id}, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: '30s'
    });
    const refreshToken = jwt.sign({token: randomString }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '5d'})
    res.json({ accessToken, refreshToken })
    user.refreshToken = refreshToken;
    console.log(user);
});
// Xu ly token 
app.post('/refresh', (req, res) => {
    const refreshToken = req.body.refreshToken;
    const user = userLogin.find(user => user.refreshToken === refreshToken);
  
    if (user) {
      // Tạo access token mới nếu refresh token hợp lệ
      const newAccessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: '30s'
      });
      res.json({ newAccessToken });
    } else {
      res.status(401).json({ message: 'Invalid refresh token' });
    }
  });

//Xu ly token người dung gui lên để lấy thông tin người dùng 
function authenticationToken(req, res, next) {
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) return res.sendStatus(401);
    const token = authorizationHeader.split(' ')[1]
    if(!token) res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) =>{
        console.log(err, data);
        if(err) res.sendStatus(403);
        req.userId = data.id;
        next()
    })
}


app.listen(PORT, () =>{
    console.log(`SERVER is running on PORT ${PORT}`);
})