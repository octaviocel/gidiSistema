import { createUbacion, getUbicacionById, getAllUbicaciones, updateUbicacion, deleteUbicacion } from './../controllers/UbicacionController';
import { createBlog, getBlogById, getAllBlogs, updateBlog, deleteBlog } from './../controllers/BlogController';
import { Router } from "express";
import { VerifyToken } from "../middleware/VerifyToken";

const router = Router();
const prefix = "/ubicacion";

router.post(prefix, VerifyToken, createUbacion);

router.get(`${prefix}/:id`, VerifyToken, getUbicacionById);

router.get(prefix, VerifyToken, getAllUbicaciones);

router.put(`${prefix}/:id`, VerifyToken, updateUbicacion);

router.delete(`${prefix}/:id`, VerifyToken, deleteUbicacion);

export default router;