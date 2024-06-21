"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// routes/product.ts
const express_1 = require("express");
const product_1 = require("../controllers/product");
const multer_1 = __importDefault(require("../config/multer"));
const router = (0, express_1.Router)();
router.post('/productos', multer_1.default.single('imagen'), product_1.crearProducto);
router.get('/productos', product_1.obtenerProductos);
router.put('/productos/:id', multer_1.default.single('imagen'), product_1.actualizarProducto);
router.get('/productos/:id', product_1.obtenerProducto);
router.delete('/productos/:id', product_1.eliminarProducto);
exports.default = router;
