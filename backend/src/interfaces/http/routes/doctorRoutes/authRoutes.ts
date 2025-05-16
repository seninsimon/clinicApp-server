import express from "express";
import { DoctorController } from "../../controllers/doctorController/doctorController";
import { DoctorAuthController } from "../../controllers/doctorController/doctorAuthController";
import { authenticate } from "../../../../infrastructure/middleware/authMiddleware";
import { checkRole } from "../../../../infrastructure/middleware/roleMiddleware";
import { logoutController } from "../../controllers/logoutController";

const router = express.Router();

// Public routes
router.post("/register", DoctorController.register);
router.post("/login", DoctorAuthController.login);
router.post('/logout', logoutController);

// Protected doctor routes
router.get("/profile", authenticate, checkRole(['doctor']), DoctorAuthController.getProfile);

export default router;
