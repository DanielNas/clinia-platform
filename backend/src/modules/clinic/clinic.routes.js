import { Router } from "express";
import { authMiddleware } from "../../middlewares/auth.js";
import { getClinic, updateClinic } from "./clinic.controller.js";
import { allowRoles } from "../../middlewares/role.js";

const router = Router();

// Permissão de acessos e edição
router.use("", allowRoles("ADMIN"), updateClinic);

// Retorna dados da clinica do usuário logado
router.get("/", authMiddleware, getClinic);

// Atualiza dados da clinica
router.put("/", authMiddleware, allowRoles(["ADMIN"]), updateClinic);

export default router;