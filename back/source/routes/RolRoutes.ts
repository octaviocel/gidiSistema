import { Router } from "express";
import { VerifyToken } from "../middleware/VerifyToken";
import { getAllRoles } from "../controllers/RolController";

const router = Router();
const prefix = "/roles";

router.get(prefix, VerifyToken, getAllRoles);


export default router;