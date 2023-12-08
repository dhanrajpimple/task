const mongoose = require("mongoose");
require("dotenv").config();
exports.mongoose = ()=>{
    mongoose.connect(process.env.DATABASE_URL).then(()=>{
        console.log('connected to database');
    }).catch((error)=>{
        console.log(`connection error: ${error}`);
        exit(1);
    })
}