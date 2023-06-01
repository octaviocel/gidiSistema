import { createResiduo, getResiduoById, getAllResiduos, updateResiduo, deleteResiduo } from './../controllers/ResiduoController';
import { Router } from "express";
import { VerifyToken } from "../middleware/VerifyToken";

const router = Router();
const prefix = "/residuo";

router.post(prefix, VerifyToken, createResiduo);

router.get(`${prefix}/:id`, VerifyToken, getResiduoById);

router.get(prefix, VerifyToken, getAllResiduos);

router.put(`${prefix}/:id`, VerifyToken, updateResiduo);

router.delete(`${prefix}/:id`, VerifyToken, deleteResiduo);

export default router;