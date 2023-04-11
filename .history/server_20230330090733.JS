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
        id:"1",
        username:"phat",
        phone:"011111111",
        email:"email1@gmail.com",
        address:"Da Nang city"
    },
    {
        id:"2",
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
        idUser:"1"
    },
    {
        username:"usernamedemo2",
        password:"passworddemo2",
        idUser:"2"
    }
]
app.get('/reqUser', authenToken, (req, res) =>{
    res.json({status: 'Success', dataUser : userLogin})
})
app.post('/login',(req, res) => {
    const data = req.body;
    const username = data.username;
    const password = data.password;
    const user = userLogin.find(us => us.username === username && us.password === password);
    if(!user)res.sendStatus(401);
    const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: '30s'
    });
    const refreshToken = jwt.sign({token: randomString }, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '240s'})
    res.json({ accessToken, refreshToken })
});

function authenToken(req, res, next) {
    const authorizationHeader = req.headers['authorization'];
    if (!authorizationHeader) return res.sendStatus(401);
    const token = authorizationHeader.split(' ')[1]
    if(!token) res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) =>{
        console.log(err, data);
        if(err) res.sendStatus(403);
        next()
    })
}


app.listen(PORT, () =>{
    console.log(`SERVER is running on PORT ${PORT}`);
})