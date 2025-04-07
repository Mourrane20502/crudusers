const express = require("express");
const app = express();
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const userRouter = require("./routes/userRoutes");
dotenv.config();
app.use(cors());
app.use(express.json());

const DB_URL = process.env.MONGODB_URL;

app.use("/", userRouter);

async function connectDB() {
  try {
    await mongoose.connect(DB_URL);
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.log("error", err);
  }
}
connectDB();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
