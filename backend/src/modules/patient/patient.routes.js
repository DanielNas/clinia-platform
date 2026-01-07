
import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.js";
import { createPatient } from "./patient.controller.js";

const router = Router();

router.post("/", authMiddleware, createPatient);
router.get("/", authMiddleware, createPatient);

export default router;