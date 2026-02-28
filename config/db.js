const mongoose = require('mongoose');
const db = process.env.mongoDB_URI;

const connectDB = async () => {
    try {
        await mongoose.connect(db);
        console.log("MongoDB connected successfully");
    }catch(error){
        console.log(error.message);
        //exit process with a failure code
        process.exit(1);
    }
};

module.exports = connectDB;