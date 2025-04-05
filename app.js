const express = require("express");
const path = require("path");
const app = express();
const mongoose = require("mongoose");
const USERDETAILS = require("./module/UserDetails");

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
        let { fromDate, toDate, gmail, noOfRooms, people } = req.body;
        console.log("Received Data:", req.body);
        // Regex for validation
        gmail=gmail.trim();
        const phoneRegex = /^[6-9]\d{9}$/; // Phone: 10 digits, starts with 6-9
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Email format

        // Check if it's valid
         if (!phoneRegex.test(gmail) && !emailRegex.test(gmail)) {
            return res.render("booking", { alertMessage: "Invalid phone number or email" });
        }
        const userDetail = new USERDETAILS({ fromDate, toDate, gmail, noOfRooms, people });
        await userDetail.save();
        res.render("BookingSuccessful");
    } catch (error) {
        console.error("Error saving data:", error);
        res.status(500).send("Error saving booking details");
    }
});

app.get("/bookroom",(req,res)=>{
res.render("BookingSuccessful")})

app.get("/", (req, res) => {
    res.render("home");
})

app.get("/landmarks", (req, res) => {
    res.render("landmarks");
})

app.get("/book", (req, res) => {
    res.render("booking");
})

app.listen(3000, () => {
    console.log("Listeninig on port 3000");
})