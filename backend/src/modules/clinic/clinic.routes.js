import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.js";

const router = Router();

router.get("/me", authMiddleware, (req, res) => {
    res.json({
        clinicId: req.user.clinicId,
        role: req.user.role,
    });
});

export default router;