require("dotenv").config();
const express = require("express");
//const cors = require("cors");
const connectDB = require("./config/db");
const app = express();
const PORT = process.env.PORT || 3000;
connectDB();

app.use(express.json({ extended: false }));
app.use("/api/users", require("./routes/api/user"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/posts", require("./routes/api/posts"));
app.listen(PORT, () => console.log(`Server Started on PORT ${PORT}`));
