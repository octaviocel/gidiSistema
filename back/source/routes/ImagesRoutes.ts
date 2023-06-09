import { Router } from "express";
import multer from 'multer';
import { deleteImage, getImage, uploadImage } from "../controllers/ImagesController";

const router = Router();
const prefix = "/imagenes";

const upload = multer({ dest: "src/uploads/" });

router.post(prefix, upload.single("foto"), uploadImage);

router.get(prefix + "/:key", getImage);

router.delete(prefix + "/:key", deleteImage);

export default router;