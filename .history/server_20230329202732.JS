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
app.get('/reqUser', (req, res) =>{
    res.json({status: 'Success', dataUser : userLogin})
})
app.post('/login',(req, res) => {
    const dataReq = req.body
    const accessToken = jwt.sign(dataReq, process.env.ACCESS_TOKEN_SECRET_KEY,{expiresIn: '60s'});
    res.json({accessToken})
});

function authenToken() {}


app.listen(PORT, () =>{
    console.log(`SERVER is running on PORT ${PORT}`);
})