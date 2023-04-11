import express from "express";
import jwt from "jsonwebtoken";
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
app.post('login',() => {
    jwt.sign()
})
app.listen(PORT, () =>{
    console.log(`SERVER is running on PORT ${PORT}`);
})