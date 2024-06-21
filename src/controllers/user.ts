import { Request, Response } from "express"
import bcrypt  from 'bcrypt'
import { User } from "../models/user";
import jwt from 'jsonwebtoken';


export const newUser = async (req: Request, res: Response) => {
    const { dni, password, rol } = req.body;
    const user = await User.findOne({ where: { dni: dni } });
    if (user) {
        return res.status(400).json({
        msg: 'El DNI ' + dni + ' ingresado ya se encuentra registrado.'
    });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
        await User.create({
        dni: dni,
        password: hashedPassword,
        rol: rol // Asegúrate de que el rol se guarda
        });
    res.json({
        msg: 'Usuario ' + dni + ' creado correctamente',
    });
    } catch (error) {
        return res.status(400).json({ message: 'Upps ocurrió un error', error });
    }
}

export const loginUser = async (req: Request, res: Response) => {
    const { dni, password } = req.body;
    const user: any = await User.findOne({ where: { dni: dni } });
    if (!user) {
        return res.status(400).json({
        msg: 'No hay ningún usuario con este DNI ' + dni
    });
    }
    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
        return res.status(401).json({
        msg: "La contraseña es incorrecta"
    });
    }
    const token = jwt.sign({
        dni: dni
    }, process.env.SECRET_KEY || 'tecsup');
    res.json({
        token: token,
        rol: user.rol // Incluye el rol en la respuesta
    });
}