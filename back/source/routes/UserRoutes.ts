import { login, getUserById, getAllUsers, updateUser, deleteUser } from '../controllers/UserController';
import { Router } from "express";
import { VerifyToken } from "../middleware/VerifyToken";
import { createUser } from "../controllers/UserController";

const router = Router();

const prefix = "/user";

router.post(prefix, VerifyToken, createUser);

router.post(`/auth${prefix}`, login);

router.get(`${prefix}/getById/:id`, VerifyToken, getUserById);

router.get(prefix, VerifyToken, getAllUsers);

router.put(`${prefix}/:id`, VerifyToken, updateUser);

router.delete(`${prefix}/:id`, VerifyToken, deleteUser);

export default router;