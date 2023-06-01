import { _token } from './../constants';
import { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

export const VerifyToken = (req: any, res: Response, next: NextFunction) => {
    const token = req.header("auth-token");
    if (!token) return res.status(401).json({ error: "Deny Access" })
    try {
        const verified = jwt.verify(token,`${process.env.TOKEN_SECRET}`);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({error :"Invalid Token Access"})
    }
}
