// controllers/product.ts
import { Request, Response } from 'express';
import { Product } from '../models/product';

// Controlador para crear un producto
export const crearProducto = async (req: Request, res: Response): Promise<void> => {
    try {
        const { nombre, descripcion, categoria, precio } = req.body;
        const file = req.file as any; // Cast as any
        const imagen = file.location;

        const producto = await Product.create({ nombre, descripcion, categoria, precio, imagen });

        res.status(201).json(producto);
    } catch (error) {
        res.status(500).json({ error: 'Error al crear el producto' });
    }
};

// Controlador para obtener todos los productos
export const obtenerProductos = async (req: Request, res: Response): Promise<void> => {
    try {
        const productos = await Product.findAll();
        res.status(200).json(productos);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
};

// Controlador para obtener un producto por ID
export const obtenerProducto = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const producto = await Product.findByPk(id);

        if (!producto) {
            res.status(404).json({ error: 'Producto no encontrado' });
            return;
        }

        res.status(200).json(producto);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
};

// Controlador para actualizar un producto
export const actualizarProducto = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const { nombre, descripcion, categoria, precio } = req.body;
        const file = req.file as any; // Cast as any
        const imagen = file ? file.location : undefined;

        const producto = await Product.findByPk(id);

        if (!producto) {
            res.status(404).json({ error: 'Producto no encontrado' });
            return;
        }

        const updatedProducto = await producto.update({
            nombre: nombre !== undefined ? nombre : producto.getDataValue('nombre'),
            descripcion: descripcion !== undefined ? descripcion : producto.getDataValue('descripcion'),
            categoria: categoria !== undefined ? categoria : producto.getDataValue('categoria'),
            precio: precio !== undefined ? precio : producto.getDataValue('precio'),
            imagen: imagen !== undefined ? imagen : producto.getDataValue('imagen')
        });

        res.status(200).json(updatedProducto);
    } catch (error) {
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
};

// Controlador para eliminar un producto
export const eliminarProducto = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const producto = await Product.findByPk(id);

        if (!producto) {
            res.status(404).json({ error: 'Producto no encontrado' });
            return;
        }

        await producto.destroy();
        res.status(200).json({ message: 'Producto eliminado correctamente' });
    } catch (error) {
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
};
