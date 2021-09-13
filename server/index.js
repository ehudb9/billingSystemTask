const express = require("express");
const app = express();
const cors = require('cors');
const pool = require("./db_connector");

//Middleware
app.use(cors());
app.use(express.json());

//transaction
app.listen(5000, () =>{
    console.log("The server started to listen on p.5000");
})