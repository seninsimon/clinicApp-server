import express from "express";
import dotenv from "dotenv";
import { connectToDatabase } from "./config/db";
import authroutes from "./interfaces/http/routes/authroutes";
import adminRoutes from "./interfaces/http/routes/adminRoutes";
import patientRoutes from "./interfaces/http/routes/patientRoutes";
import doctorRoutes from "./interfaces/http/routes/doctorRoutes/authRoutes";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cookieParser());
app.use(cors({
  origin: "http://localhost:5173",  // allow requests from frontend
  credentials: true,                // allow cookies if needed
}));
app.use(express.json()); 
app.use(express.urlencoded({extended : true}));

// Routes
app.use("/api/auth", authroutes);
app.use("/api/admin", adminRoutes);
app.use("/api/patient", patientRoutes);
app.use("/api/doctor", doctorRoutes);

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: 'Server is running' });
});

// Error handling middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});

// Start server
connectToDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to connect to database:', err);
  process.exit(1);
});
