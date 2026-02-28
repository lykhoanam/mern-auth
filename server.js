const express = require('express');
const connectDB = require('./config/db');
const path = require("path");
const config = require('config');
const node_env = config.get("NODE_ENV");


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

// production
if (node_env === "production") {
  // Serve static files from React build
  app.use(express.static(path.join(__dirname, "client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => console.log(`Server started on port ${PORT}`))