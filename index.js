import express from 'express';
import cors from 'cors';
import {configDotenv} from "dotenv";
import {inicializarFirebase} from "./firebase.js";
import {productRoutes} from "./routes/productRoutes.js";
import {authRoutes} from "./routes/authRoutes.js";
import {jwtMiddleware} from "./middleware/jwtMiddleware.js";

configDotenv();

if (!process.env.JWT_SECRET) {
    throw new Error(
        'No se ha configurado el JWT_SECRET. Configurar el archivo .env'
    );
}

const firebase = inicializarFirebase();
if (!firebase) {
    throw new Error('No se inicializó Firebase. Revisar el archivo .env');
}

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
}));
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/products', jwtMiddleware, productRoutes);
app.get('/', (req, res) => res.send("We're up!"));

app.use((_req, res) => {
    return res.status(404).json({
        error: 'No encontrado.'
    });
});

app.use((err, _req, res, next) => {
    switch(err.code) {
        case 'AUTH_ERROR':
            return res.status(401).json({error: 'No autorizado.', mensaje: err.message});
        case 'VALIDATION_ERROR':
            return res.status(400).json({error: err.message});
        default:
    }

    next(err);
});

app.listen(
    process.env.PORT || 3000,
    () => console.log('Server is running on port 3000')
);
