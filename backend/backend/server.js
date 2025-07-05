import express from "express";
import mongoose from "mongoose";
import userRouter from "./Routes/userRoute";
import config from "./config";

const mongodbURL = config.MONGODB_URL;
console.log(mongodbURL)
mongoose
  .connect(mongodbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("connected to MongoDB");
  })
  .catch((error) => {    
    console.log(error);
  });

const app = express();

app.use(express.json());
app.use("/api/users", userRouter);

app.listen(5000, () => {
  console.log("Listening in the Port 5000...");
});
