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
Object.defineProperty(exports, "__esModule", { value: true });
exports.eliminarProducto = exports.actualizarProducto = exports.obtenerProducto = exports.obtenerProductos = exports.crearProducto = void 0;
const product_1 = require("../models/product");
// Controlador para crear un producto
const crearProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { nombre, descripcion, categoria, precio } = req.body;
        const file = req.file; // Cast as any
        const imagen = file.location;
        const producto = yield product_1.Product.create({ nombre, descripcion, categoria, precio, imagen });
        res.status(201).json(producto);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al crear el producto' });
    }
});
exports.crearProducto = crearProducto;
// Controlador para obtener todos los productos
const obtenerProductos = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const productos = yield product_1.Product.findAll();
        res.status(200).json(productos);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});
exports.obtenerProductos = obtenerProductos;
// Controlador para obtener un producto por ID
const obtenerProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const producto = yield product_1.Product.findByPk(id);
        if (!producto) {
            res.status(404).json({ error: 'Producto no encontrado' });
            return;
        }
        res.status(200).json(producto);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});
exports.obtenerProducto = obtenerProducto;
// Controlador para actualizar un producto
const actualizarProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { nombre, descripcion, categoria, precio } = req.body;
        const file = req.file; // Cast as any
        const imagen = file ? file.location : undefined;
        const producto = yield product_1.Product.findByPk(id);
        if (!producto) {
            res.status(404).json({ error: 'Producto no encontrado' });
            return;
        }
        const updatedProducto = yield producto.update({
            nombre: nombre !== undefined ? nombre : producto.getDataValue('nombre'),
            descripcion: descripcion !== undefined ? descripcion : producto.getDataValue('descripcion'),
            categoria: categoria !== undefined ? categoria : producto.getDataValue('categoria'),
            precio: precio !== undefined ? precio : producto.getDataValue('precio'),
            imagen: imagen !== undefined ? imagen : producto.getDataValue('imagen')
        });
        res.status(200).json(updatedProducto);
    }
    catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
});
exports.actualizarProducto = actualizarProducto;
// Controlador para eliminar un producto
const eliminarProducto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const producto = yield product_1.Product.findByPk(id);
        if (!producto) {
            res.status(404).json({ error: 'Producto no encontrado' });
            return;
        }
        yield producto.destroy();
        res.status(200).json({ message: 'Producto eliminado correctamente' });
    }
    catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
});
exports.eliminarProducto = eliminarProducto;
