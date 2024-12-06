const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();


const connection = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("Connected to the database");
    } catch (error) {
        console.log(`There is an error in connecting db ${error}`);
    }
}

module.exports = connection;
