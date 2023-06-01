import { createGallery, getGalleryById, getAllGalley, updateGallery, deleteGallery, getAllGalleryPublic } from './../controllers/GalleryController';
import { Router } from "express";
import { VerifyToken } from "../middleware/VerifyToken";

const router = Router();
const prefix = "/gallery";

router.post(prefix, VerifyToken, createGallery);

router.get(`${prefix}-principales`, getAllGalleryPublic);

router.get(`${prefix}/:id`, VerifyToken, getGalleryById);

router.get(prefix, VerifyToken, getAllGalley);

router.put(`${prefix}/:id`, VerifyToken, updateGallery);

router.delete(`${prefix}/:id`, VerifyToken, deleteGallery);

export default router;