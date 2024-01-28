const express = require("express");
const connectDB = require("./config/db");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: "config/config.env" });

const app = express();
app.use(express.json());

app.use(express.urlencoded({ extended: false }));
__dirname = path.resolve();
app.use("/upload", express.static(path.join(__dirname, "/upload")));
connectDB();
//routes
app.use("/api/files", require("./routes/file"));
app.use("/api/show", require("./routes/show"));
app.use("/api/download", require("./routes/download"));
const PORT = 5000;
app.listen(PORT, () => {
  console.log("server running");
});
