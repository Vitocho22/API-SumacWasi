// server.ts
import dotenv from 'dotenv';
dotenv.config();

import express, { Application } from 'express';
import cors from 'cors';
import http from 'http';

import routerProduct from '../routes/product';
import routerUser from '../routes/user'

import { Product } from './product';
import { User } from './user';

class Server {
    private app: Application;
    private port: number;
    private server: http.Server;

    constructor() {
        this.app = express();
        this.port = parseInt(process.env.PORT || '3001', 10);
        this.server = http.createServer(this.app);

        this.listen();
        this.middlewares();
        this.routes();
        this.dbConnect();
    }

    listen() {
        this.server.listen(this.port, () => {
            console.log('Aplicación corriendo en el puerto ' + this.port);
        });
    }

    routes() {
        this.app.use('/api/', routerProduct);
        this.app.use('/api/', routerUser);
    }

    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    async dbConnect() {
        try {
            await Product.sync();
            await User.sync();
            console.log('Conexión a la base de datos establecida correctamente.');
        } catch (error) {
            console.error('No se puede conectar a la base de datos:', error);
        }
    }
}

export default Server;
