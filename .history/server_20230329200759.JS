import express from "express";

const app = express();
const PORT = 5500;

app.use(0)
app.get('/login', (req,res) =>{
    res.json({status: `Success`})
})

app.listen(PORT, () =>{
    console.log(`SERVER is running on PORT ${PORT}`);
})