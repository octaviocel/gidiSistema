import { createPeriodo, getPeriodoById, getAllPeriodos, updatePeriodo, deletePeriodo, getPeriodoxCabeceraId } from './../controllers/ResiduoPeriodoController';
import { Router } from "express";
import { VerifyToken } from "../middleware/VerifyToken";

const router = Router();
const prefix = "/periodo";

router.post(prefix, VerifyToken, createPeriodo);

router.get(`${prefix}/coleccion/:id`, VerifyToken, getPeriodoxCabeceraId);

router.get(`${prefix}/:id`, VerifyToken, getPeriodoById);

router.get(prefix, VerifyToken, getAllPeriodos);

router.put(`${prefix}/:id`, VerifyToken, updatePeriodo);

router.delete(`${prefix}/:id`, VerifyToken, deletePeriodo);

export default router;