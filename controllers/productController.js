import { Product } from "../models/Product.js";
import { deleteProductById, getAllProducts, getProductById, saveProduct } from "../services/productService.js";

export const getAll = async (_req, res) => {
    return res.json(
        await getAllProducts()
    );
}

export const getById = async (req, res) => {
    const { id } = req.params;
    const product = await getProductById(id);

    if (!product) {
        return res.status(404).json({ error: 'Producto no encontrado.' });
    }

    return res.json(product);
}

export const create = async (req, res) => {
    const product = new Product(req.body);

    // La creación no debe incluir el ID
    if (product.id) {
        return res.status(400).json({
            error: 'No se puede crear un producto con un ID definido.'
        });
    }

    const result = await saveProduct(req.body);

    if (!result) {
        return res.status(400).json(
            { error: 'No se pudo crear el producto.' }
        );
    }

    return res.json(result);
}

export const edit = async (req, res) => {
    const { id } = req.params;

    const resultado = await saveProduct({ ...req.body, id });

    if (!resultado) {
        return res.status(400).json({
            error: 'No se pudo actualizar el producto.'
        });
    }

    return res.json(resultado);
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;
    const result = await deleteProductById(id);

    if (!result) {
        return res.status(404).json({
            error: 'No se pudo eliminar el producto.'
        });
    }

    return res.sendStatus(204);
}
