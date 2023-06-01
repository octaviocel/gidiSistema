import { createRecoleccion, getRecoleccionById, getAllRecolecciones, updateRecollecion, deleteRecollecion } from './../controllers/RecoleccionController';
import { Router } from "express";
import { VerifyToken } from "../middleware/VerifyToken";

const router = Router();
const prefix = "/recoleccion";

router.post(prefix, VerifyToken, createRecoleccion);

router.get(`${prefix}/:id`, VerifyToken, getRecoleccionById);

router.get(prefix, VerifyToken, getAllRecolecciones);

router.put(`${prefix}/:id`, VerifyToken, updateRecollecion);

router.delete(`${prefix}/:id`, VerifyToken, deleteRecollecion);

export default router;