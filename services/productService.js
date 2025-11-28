import {deleteById, getAll, getById, save} from "../repositories/productRepository.js";

/** @returns {Promise<Product[]>} */
export const getAllProducts = async () => {
    return await getAll();
}

/** @returns {Promise<Product | null>} */
export const getProductById = async (id) => {
    return await getById(id);
}

/** @returns {Promise<Product>} */
export const saveProduct = async (product) => {
    return await save(product);
}

/** @returns {Promise<boolean>} */
export const deleteProductById = async (id) => {
    return await deleteById(id);
}
