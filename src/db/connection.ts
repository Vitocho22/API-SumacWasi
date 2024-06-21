import { Sequelize } from "sequelize";
import dotenv from 'dotenv';

// Cargar variables de entorno desde .env
dotenv.config();

let sequelize: Sequelize;

// Verificar si estamos en un entorno de producción (Clever Cloud)
if (process.env.NODE_ENV === 'production') {
        sequelize = new Sequelize({
        database: process.env.DB_DBNAME,
        host: process.env.DB_HOST,
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        dialect: 'mysql'
});
} else {
  // Configuración para base de datos local
    sequelize = new Sequelize({
        database: process.env.LOCAL_DB_DBNAME,
        host: process.env.LOCAL_DB_HOST,
        username: process.env.LOCAL_DB_USERNAME,
        password: process.env.LOCAL_DB_PASSWORD,
        dialect: 'mysql'
    });
}

export default sequelize;