import { promises as fs } from "fs";
import { Product } from "../models/Product.js";
import {ValidationError} from "../error/ValidationError.js";

const DB_FILE = './db.json';
const COLLECTION_NAME = 'products';

const getNewId = async () => {
    const products = await readFile();
    return (products[`${COLLECTION_NAME}_last_id`] || 0) + 1;
}

const readFile = async () => {
    try {
        return JSON.parse(await fs.readFile(DB_FILE, 'utf-8'));
    } catch (e) {
        if (e.code === 'ENOENT') {
            await fs.writeFile(DB_FILE, '{}');
            return {};
        }

        throw e;
    }
}

const readCollection = async () => {
    return (await readFile())[COLLECTION_NAME] || [];
}

const writeFile = async (data) => {
    const fileContents = await readFile();
    fileContents[COLLECTION_NAME] = data;
    const lastId = fileContents[`${COLLECTION_NAME}_last_id`] || 0;
    fileContents[`${COLLECTION_NAME}_last_id`] = Math.max(lastId, ...data.map(p => p.id));
    return await fs.writeFile(DB_FILE, JSON.stringify(fileContents, null, 2));
}

/** @returns {Promise<Product[]>} */
export const getAll = async () => {
    return await readCollection();
}

/** @returns {Promise<Product | null>} */
export const getById = async (id) => {
    const product = (await getAll())
        .find(product => product.id === Number(id));

    if (!product) {
        return null;
    }

    return new Product(product);
}

/** @returns {Promise<Product>} */
export const save = async (product) => {
    const products = await getAll();

    const existingPos = products.findIndex(p => p.id === product.id);

    // Reemplazar producto si existe
    if (existingPos !== -1) {
        products.splice(existingPos, 1);
    }

    const newProduct = new Product({
        ...product,
        id: Number(product.id || await getNewId())
    });

    const validationErrors = newProduct.validate();
    if (validationErrors.length) {
        throw new ValidationError(`${validationErrors.join(' / ')}`);
    }

    products.splice(existingPos !== -1 ? existingPos : products.length, 0, newProduct);

    await writeFile(products);

    return newProduct;
}

/** @returns {Promise<boolean>} */
export const deleteById = async (id) => {
    const product = await getById(id);

    if (!product) {
        return false;
    }

    const products = await getAll();
    products.splice(products.findIndex(p => p.id === product.id), 1);
    await writeFile(products);

    return true;
}
