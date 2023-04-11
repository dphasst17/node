import express from "express";

const app = express();
const PORT = 5500;

app.get('/login', (req,res) =>{
    res.json()
})

app.listen(PORT, () =>{
    console.log(`SERVER is running on PORT ${PORT}`);
})