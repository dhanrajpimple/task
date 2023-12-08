const { config } = require("dotenv");
const { mongoose } = require("./config/db");
const express = require("express");
const app = express();
require("dotenv").config();
port = process.env.PORT || 6000;
app.use(express.json());
mongoose();


const task = require("./routes/task");
app.use("/api/v1", task);
app.listen(port, ()=>{
    console.log("app is running");
})
