import express from "express";
import { DoctorController } from "../../controllers/doctorController/doctorController";
const router = express.Router();

router.post("/register", DoctorController.register);

export default router;
