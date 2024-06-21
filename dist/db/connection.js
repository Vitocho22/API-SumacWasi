"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
// Cargar variables de entorno desde .env
dotenv_1.default.config();
let sequelize;
// Verificar si estamos en un entorno de producción (Clever Cloud)
if (process.env.NODE_ENV === 'production') {
    sequelize = new sequelize_1.Sequelize({
        database: process.env.DB_DBNAME,
        host: process.env.DB_HOST,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        dialect: 'mysql'
    });
}
else {
    // Configuración para base de datos local
    sequelize = new sequelize_1.Sequelize({
        database: process.env.LOCAL_DB_DBNAME,
        host: process.env.LOCAL_DB_HOST,
        username: process.env.LOCAL_DB_USERNAME,
        password: process.env.LOCAL_DB_PASSWORD,
        dialect: 'mysql'
    });
}
exports.default = sequelize;
