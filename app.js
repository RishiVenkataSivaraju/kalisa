const express = require("express");
const path =require("path");
const app = express();
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'styles')));
app.use(express.static(path.join(__dirname, 'module')));

app.get("/",(req,res)=>{
 res.render("home");
})

app.get("/landmarks",(req,res)=>{
 res.render("landmarks");
})

app.listen(3000, () => {
console.log("Listeninig on port 3000");
})