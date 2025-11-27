import {deleteById, getAll, getById, save} from "../repositories/productRepository.js";

export const getAllProducts = async () => {
    return await getAll();
}

export const getProductById = async (id) => {
    return await getById(id);
}

export const saveProduct = async (product) => {
    return await save(product);
}

export const deleteProductById = async (id) => {
    return await deleteById(id);
}
