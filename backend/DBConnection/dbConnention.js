const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI || "mongodb+srv://admin:admin@firstcrudapplication.ydken3o.mongodb.net/eventPage?retryWrites=true&w=majority&appName=FirstCRUDapplication");
        console.log("Connected to MongoDB" .bgBlue);
    } catch (error) {
        console.error("Failed to connect to MongoDB", error);
    }
};

module.exports = connectDB;