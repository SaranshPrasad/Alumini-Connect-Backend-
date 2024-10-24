const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { connectDB } = require("./config/database") 
const app = express();
const PORT = 4001;

// middlewares 
app.use(cors({
  origin: 'http://localhost:3000', 
  credentials: true 
}));
app.use(express.json());
app.use(cookieParser());

// db connection
connectDB()
  .then(() => {
    console.log("Database connection done !");
    console.log(`Server is up 🚀 at url :- http://localhost:${PORT}`);
  })
  .catch((err) => {
    console.error("Database connection issue : ", err.message);
  });


// Routes 
const userRouter = require("./routes/user");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const authRouter = require("./routes/auth");
const postRouter = require("./routes/post");
// Using routes 

app.use("/", userRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", authRouter);
app.use("/", postRouter);


app.listen(PORT, (req, res) => {
    console.log(`Server is Up at http://localhost:${PORT}`);
});