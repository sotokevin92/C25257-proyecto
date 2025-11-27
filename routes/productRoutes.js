import { Router } from 'express';
import {create, deleteProduct, edit, getAll, getById} from "../controllers/productController.js";

const router = Router();

router.get('/', getAll);
router.get('/:id', getById);
router.post('/', create);
router.put('/:id', edit);
router.delete('/:id', deleteProduct);

export const productRoutes = router;
