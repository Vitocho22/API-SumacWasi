// routes/product.ts
import { Router } from 'express';
import { crearProducto, obtenerProducto, actualizarProducto, obtenerProductos, eliminarProducto } from '../controllers/product';
import upload from '../config/multer';

const router = Router();

router.post('/productos', upload.single('imagen'), crearProducto);
router.get('/productos', obtenerProductos);
router.put('/productos/:id', upload.single('imagen'), actualizarProducto);
router.get('/productos/:id', obtenerProducto);
router.delete('/productos/:id', eliminarProducto);

export default router;
