const express = require("express");
const path =require("path");
const app = express();
const USERDETAILS= require("./module/UserDetails");
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'styles')));
app.use(express.static(path.join(__dirname, 'module')));
app.use(express.urlencoded({ extended: true }));



app.post("/bookroom",(req,res) =>{
 const {fromDate,toDate,gmail,phonenumber}= req.body;
 console.log(fromDate);
})

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