import { Router } from "express";
import { VerifyToken } from "../middleware/VerifyToken";
import { getCSVResiduos, getCSVResiduos2, getRecoleccionGrafica, getSumaRecoleccionGrafica } from "../controllers/GraficaController";




const router = Router();
const prefix = "/grafica";


router.get(`${prefix}/suma/:id`, VerifyToken, getSumaRecoleccionGrafica);

router.get(`${prefix}/:id`, VerifyToken, getRecoleccionGrafica);

router.get(`${prefix}/csv/:id`, VerifyToken, getCSVResiduos);

router.get(`${prefix}/csv2/:id`, VerifyToken, getCSVResiduos2);





export default router;