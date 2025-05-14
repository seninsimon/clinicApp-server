import express from "express";

import { registerController } from "../controllers/RegisterController";
import { verifyOtpController } from "../controllers/otpController";

const router = express.Router();

router.post("/register", registerController);

router.post("/verify-otp", verifyOtpController);

export default router;
