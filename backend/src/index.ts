import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/db";
import authroutes from "./interfaces/http/routes/authroutes"
import cors from "cors"
import doctorRoutes from "./interfaces/http/routes/doctorRoutes/authRoutes"

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.json()); 
app.use(express.urlencoded({extended : true}))



app.use("/", authroutes);
app.use("/doctor" , doctorRoutes)






connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
});
