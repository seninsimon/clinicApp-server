import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/db";
import authroutes from "./interfaces/http/routes/authroutes"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json()); // ✅ Make sure to parse JSON bodies
app.use(express.urlencoded({extended : true}))


app.use("/", authroutes);





connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
