import express from "express";
import { Request, Response } from "express";
import { registerController } from "../controllers/userController/RegisterController";
import { verifyOtpController } from "../controllers/userController/otpController";
import { LoginController } from "../controllers/userController/loginController";
import { AuthController } from "../controllers/authController";
import { authenticate } from "../../../infrastructure/middleware/authMiddleware";
import { GetMeController } from "../controllers/GetmeController";
import { logoutController } from "../controllers/logoutController";

const router = express.Router();

// Create handler functions for class methods
const loginHandler = (req: Request, res: Response) => {
  LoginController.login(req, res);
};

const refreshTokenHandler = (req: Request, res: Response) => {
  AuthController.refreshToken(req, res);
};

const getMeHandler = (req: Request, res: Response) => {
  GetMeController(req, res);
};

// User routes
router.post("/register", registerController);
router.post("/verify-otp", verifyOtpController);
router.post("/login", loginHandler);

// Authentication routes
router.post('/refresh-token', refreshTokenHandler);
router.get('/me', authenticate, getMeHandler);
router.post('/logout', logoutController);

export default router;
