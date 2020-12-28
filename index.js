const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const routers = require("./routers");
app.use("/api",routers);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.listen(8000, function(){
    console.log("listing from 8000")
})