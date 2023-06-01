import { createBlog, getBlogById, getAllBlogs, updateBlog, deleteBlog, updatePrincipalBlog, getPrincipalBlogs, getBlogPagination } from './../controllers/BlogController';
import { Router } from "express";
import { VerifyToken } from "../middleware/VerifyToken";

const router = Router();
const prefix = "/blog";

router.post(prefix, VerifyToken, createBlog);

router.get(`${prefix}-principales`, getPrincipalBlogs);

router.get(`${prefix}-pagination/:currentPage`,getBlogPagination);

router.get(`${prefix}/:id`, VerifyToken, getBlogById);

router.get(prefix, VerifyToken, getAllBlogs);

router.put(`${prefix}/:id`, VerifyToken, updateBlog);

router.put(`${prefix}-principal/:id`, VerifyToken, updatePrincipalBlog);

router.delete(`${prefix}/:id`, VerifyToken, deleteBlog);

export default router;