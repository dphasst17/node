import express from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv"

dotenv.config();
const app = express();
const PORT = 5500;

app.use(express.json());
const userLogin = [
    {
        username:"phat",
        phone:"011111111",
        email:"email1@gmail.com",
        address:"Da Nang city"
    },
    {
        username:"phat2",
        phone:"0111111112",
        email:"email2@gmail.com",
        address:"Da Nang city"
    }
]
app.get('/reqUser', authenToken, (req, res) =>{
    res.json({status: 'Success', dataUser : userLogin})
})
app.post('/login',(req, res) => {
    const data = req.body;
    const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET,{
        expiresIn: '30s'
    });
    res.json({ accessToken })
});

function authenToken(req, res, next) {
    const authorizationHeader = req.headers['authorization'];
    const token = authorizationHeader.split(' ')[1]
    if(!token) res.sendStatus(401);

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, data) =>{
        console.log(err, data);
    })
}


app.listen(PORT, () =>{
    console.log(`SERVER is running on PORT ${PORT}`);
})