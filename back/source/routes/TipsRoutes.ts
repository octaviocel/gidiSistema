import { createTip, getTipById, getAllTips, updateTip, deleteTip } from './../controllers/TipsController';
import { Router } from "express";
import { VerifyToken } from "../middleware/VerifyToken";

const router = Router();
const prefix = "/tips";

router.post(prefix, VerifyToken, createTip);

router.get(`${prefix}/:id`, VerifyToken, getTipById);

router.get(prefix, VerifyToken, getAllTips);

router.put(`${prefix}/:id`, VerifyToken, updateTip);

router.delete(`${prefix}/:id`, VerifyToken, deleteTip);

export default router;