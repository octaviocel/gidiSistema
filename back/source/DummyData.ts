import { User } from './entity/User';
import { Rol } from './entity/Rol';

import * as argon2 from 'argon2';

export const createRols = async () => {
    const rolFound = await Rol.findOne({ where: { rolName: "ADMINISTRADOR" } })

    if (!rolFound) {
        try {
            const adminRol = await Rol.save({
                rolName: "ADMINISTRADOR"
            })
            const userRol = await Rol.save({
                rolName: "USER"
            })
        } catch (error) {
            console.log("Error Roles")
        }
    }
}

export const createSuperUser = async () => {
    const rol = await Rol.findOne({ where: { rolName: "ADMINISTRADOR" } })
    const userFound = await User.findOne({where: {email : "admin@gmail.com"}})
    if (!userFound && rol) {
        try {
            const superUser = await User.save({
                firstName: "Administrador",
                lastName: "Admin",
                email: "admin@gmail.com",
                password: await argon2.hash("123"),
                blocked: true,
                rol_id: rol?.id,
            })
        } catch (error) {
            console.log("Error Usuarios")
            console.log(error)
        }
    }
}