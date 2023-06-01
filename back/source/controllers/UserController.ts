import jwt from 'jsonwebtoken';
import { User } from './../entity/User';
import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from 'express';
import * as argon2 from 'argon2';
import { _token } from '../constants';

const repo = AppDataSource.getRepository(User);

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {
            email,
            password,
            firstName,
            lastName,
            motherLastName,
            rol_id,
        } = req.body;

        const exits = await User.findOne({ where: { email: email } })

        if (exits) return res.status(400).json({ error: "Hubo un error, este correro ya se ha registrado" });

        const insert = await User.save({
            email: email,
            password: await argon2.hash(password),
            firstName: firstName,
            lastName: lastName,
            motherLastName: motherLastName,
            rol_id: rol_id,
            blocked: false
        })

        if (insert) {
            let payload = {
                id: insert.id,
                email: email,
            };

            const token = jwt.sign(payload, `${_token}`);
            const userSaved = await User.findOne({
                where: { id: Number(insert.id) },
            });
            return res.status(200).json({ userSaved, token });
        }
    } catch (error) {
        console.log(error);
        return res
            .status(400)
            .json({ error: "There was an error" });
    }
}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        const userFound = await repo
            .createQueryBuilder("user")
            .where("user.email = :email", { email: email })
            .leftJoinAndSelect("user.rol", "rol")
            .addSelect(["*"])
            .addSelect("user.password")
            .getOne();

        if (!userFound) {
            return res.status(400).json({ error: "User not Found." });
        }


        const valid = await argon2.verify(userFound.password, password);
        if (!valid) {
            return res.status(401).json({ message: "Incorrect access" });
        }

        let payload = { id: userFound.id, email: userFound.email };
        const token = jwt.sign(payload, `${_token}`);

        return res
            .status(200)
            .header("auth-token", token)
            .json({ userFound, token });
    } catch (error) {
        console.log(error);
    }
};

export const getUserById = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userFound = await User.findOne({
        where: { id: Number(id) },
    });

    if (userFound) return res.status(200).json(userFound);

    return res.status(400).json({ error: "User not Found." });
};


export const getAllUsers = async (req: Request, res: Response) => {
    const usersFound = await User.find();
    return res.status(200).json(usersFound);
};

export const updateUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const {
        email,
        password,
        firstName,
        lastName,
        motherLastName,
        rol_id,
    } = req.body;

    const userFound = await User.findOneBy({
        id: Number(id),
    });

    if (!userFound) return res.status(400).json({ error: "User not Found." });

    const hashedPassword =
        password !== "" ? await argon2.hash(password) : userFound.password;



    const userUpdate = await User.update(
        { id: userFound.id },
        {
            email: email,
            password: hashedPassword,
            firstName: firstName,
            lastName: lastName,
            motherLastName: motherLastName,
            rol_id: rol_id
        })

    if (userUpdate.affected == 0) {
        return res.status(400).json({ error: "There was an error updating." });
    } else {
        const userUpdated = await User.findOne({
            where: { id: Number(userFound.id) },
        });

        return res.status(201).json({ user: userUpdated });
    }
};

export const deleteUser = async (req: Request, res: Response) => {
    const { id } = req.params;
    const userFound = await User.findOneBy({
        id: Number(id),
    });

    if (userFound) {
        try {
            const userDeleted = await User.delete({
                id: Number(id),
            });

            if (userDeleted.affected == 0) {
                return res.status(400).json({ error: "There was an error deleting." });
            } else {
                return res
                    .status(200)
                    .json({ id: id, message: "User deleted successfully." });
            }
        } catch (error) {
            return res.status(400).json({ error: "There was an error deleting." });
        }
    }

    return res.send({ error: "User not Found." });
};