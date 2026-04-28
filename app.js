require('dotenv').config();

const expressLayouts = require("express-ejs-layouts")
const express = require("express");
const app = express();
const PORT = 4000;

const conectDB = require("./server/config/db");
conectDB();

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(expressLayouts);
app.use(express.static("public"))
app.set("layout","./layouts/main")
app.set("view engine", "ejs")

app.use("/", require("./server/routes/main"))

app.listen(PORT, ()=> console.log(`surver runing on port: ${PORT}`))