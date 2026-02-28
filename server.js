const express = require('express');
const connectDB = require('./config/db');
const app = express();

//PORT
const PORT = process.env.PORT || 5000;

//Connect to database
connectDB();

// initialize middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", require("./routes/api/auth"))
app.use("/api/users", require('./routes/api/users'))

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))