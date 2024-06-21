"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.newUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const newUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni, password, rol } = req.body;
    const user = yield user_1.User.findOne({ where: { dni: dni } });
    if (user) {
        return res.status(400).json({
            msg: 'El DNI ' + dni + ' ingresado ya se encuentra registrado.'
        });
    }
    const hashedPassword = yield bcrypt_1.default.hash(password, 10);
    try {
        yield user_1.User.create({
            dni: dni,
            password: hashedPassword,
            rol: rol // Asegúrate de que el rol se guarda
        });
        res.json({
            msg: 'Usuario ' + dni + ' creado correctamente',
        });
    }
    catch (error) {
        return res.status(400).json({ message: 'Upps ocurrió un error', error });
    }
});
exports.newUser = newUser;
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { dni, password } = req.body;
    const user = yield user_1.User.findOne({ where: { dni: dni } });
    if (!user) {
        return res.status(400).json({
            msg: 'No hay ningún usuario con este DNI ' + dni
        });
    }
    const passwordValid = yield bcrypt_1.default.compare(password, user.password);
    if (!passwordValid) {
        return res.status(401).json({
            msg: "La contraseña es incorrecta"
        });
    }
    const token = jsonwebtoken_1.default.sign({
        dni: dni
    }, process.env.SECRET_KEY || 'tecsup');
    res.json({
        token: token,
        rol: user.rol // Incluye el rol en la respuesta
    });
});
exports.loginUser = loginUser;
