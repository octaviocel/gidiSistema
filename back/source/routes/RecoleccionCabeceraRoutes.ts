import { Router } from "express";
import { VerifyToken } from "../middleware/VerifyToken";
import { createRecoleccionCabecera, deleteRecollecionCabecera, getAllRecoleccionesCabeceras, getEstadisticaPrincipal, getRecoleccionByRecoleccionAndUbicacion, getRecoleccionCabeceraById, updateRecollecionCabeceras } from "../controllers/RecoleccionCabeceraController";

const router = Router();
const prefix = "/recoleccionCabecera";

router.post(prefix, VerifyToken, createRecoleccionCabecera);

router.get(`${prefix}/principales/:id`, VerifyToken, getEstadisticaPrincipal);

router.get(`${prefix}/:ubicacion/:recoleccion`, VerifyToken, getRecoleccionByRecoleccionAndUbicacion);

router.get(`${prefix}/:id`, VerifyToken, getRecoleccionCabeceraById);

router.get(prefix, VerifyToken, getAllRecoleccionesCabeceras);

router.put(`${prefix}/:id`, VerifyToken, updateRecollecionCabeceras);

router.delete(`${prefix}/:id`, VerifyToken, deleteRecollecionCabecera);

export default router;