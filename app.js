const express = require("express");
const path =require("path");
const app = express();
const mongoose = require("mongoose");
const USERDETAILS= require("./module/UserDetails");

require("dotenv").config();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'styles')));
app.use(express.static(path.join(__dirname, 'module')));
app.use(express.urlencoded({ extended: true }));




mongoose.connect(process.env.MONGODB_URL)
    .then(data => {
        console.log('CONNECTION OPEN')
    })
    .catch(err => {
        console.log(err)
    })

app.post("/bookroom", async (req, res) => {
    try {
        const { fromDate, toDate, gmail, phonenumber ,noOfRooms,people} = req.body;
        console.log("Received Data:", req.body); 
        const userDetail = new USERDETAILS({ fromDate, toDate, gmail, phonenumber ,noOfRooms,people});
        await userDetail.save();
        res.render("BookingSuccessful");
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).send("Error saving booking details");
    }
});



app.get("/",(req,res)=>{
 res.render("home");
})

app.get("/landmarks",(req,res)=>{
 res.render("landmarks");
})

app.get("/book",(req,res)=>{
 res.render("booking");
})

app.listen(3000, () => {
console.log("Listeninig on port 3000");
})