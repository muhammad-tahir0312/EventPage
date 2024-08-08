const express = require("express");
const colors = require("colors");
const cors = require("cors");
const dotenv = require("dotenv");

const eventController = require("./eventController/eventController");
const connectDB = require("./DBConnection/dbConnention");

const App = express();
const PORT = process.env.PORT || 3001;

connectDB();
App.use(express.json());
App.use(cors());
App.use("/api/event/",eventController);

App.listen(PORT, ()=>{
    console.log(`App is listening on ${PORT}` .blue .bgGreen);
})
