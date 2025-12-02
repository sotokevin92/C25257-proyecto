import { Product } from "../models/Product.js";
import { ValidationError } from "../error/ValidationError.js";
import {
    addDoc,
    collection,
    deleteDoc,
    doc,
    getDoc,
    getDocs,
    getFirestore,
    setDoc
} from 'firebase/firestore';

const COLLECTION_NAME = 'products';

// Get Firestore instance or throw a helpful error if Firebase wasn't initialized
const getDb = () => {
    return getFirestore();
}


/** @returns {Promise<Product[]>} */
export const getAll = async () => {
    const db = getDb();

    const colRef = collection(db, COLLECTION_NAME);
    const snapshot = await getDocs(colRef);

    return snapshot.docs.map(d => {
        return new Product({ ...d.data(), id: d.id });
    });
}

/** @returns {Promise<Product | null>} */
export const getById = async (id) => {
    const db = getDb();
    const docRef = doc(db, COLLECTION_NAME, id);
    const snap = await getDoc(docRef);
    if (!snap.exists()) {
        return null;
    }

    return new Product({ id: snap.id, ...snap.data() });
}

/** @returns {Promise<Product>} */
export const save = async (product) => {
    const db = getDb();

    // If updating existing product
    if (product.id) {
        const updatedProduct = new Product(product);

        const validationErrors = updatedProduct.validate();
        if (validationErrors.length) {
            throw new ValidationError(`${validationErrors.join(' / ')}`);
        }

        const docRef = doc(db, COLLECTION_NAME, product.id);
        await setDoc(docRef, {
            name: updatedProduct.name,
            description: updatedProduct.description,
            price: updatedProduct.price,
            image: updatedProduct.image
        }, { merge: true });

        return updatedProduct;
    }

    const newProduct = new Product({ ...product });

    const validationErrors = newProduct.validate();
    if (validationErrors.length) {
        throw new ValidationError(`${validationErrors.join(' / ')}`);
    }

    // Discard ID - passing null will create the field in the document, passing undefined will result in exception
    const { id, ...newDoc } = { ...newProduct };

    const colRef = collection(db, COLLECTION_NAME);
    const docRef = await addDoc(colRef, newDoc);

    newProduct.id = docRef.id;
    return newProduct;
}

/** @returns {Promise<boolean>} */
export const deleteById = async (id) => {
    const db = getDb();
    const docRef = doc(db, COLLECTION_NAME, id);
    const snap = await getDoc(docRef);
    if (!snap.exists()) {
        return false;
    }

    await deleteDoc(docRef);
    return true;
}
