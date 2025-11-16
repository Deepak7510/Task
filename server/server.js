import dotenv from "dotenv";
dotenv.config();
import app from "./src/app.js";
import connectDB from "./src/configs/connectDB.js";

const PORT = process.env.PORT || 8000;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running on ${PORT}`);
  });
});
