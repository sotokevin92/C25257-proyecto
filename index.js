import express from 'express';
import cors from 'cors';
import {configDotenv} from "dotenv";
import {inicializarFirebase} from "./firebase.js";
import {productRoutes} from "./routes/productRoutes.js";

configDotenv();

const firebase = inicializarFirebase();
if (firebase) {
    console.log(`Firebase OK - ${firebase.name}`);
}

const app = express();
app.use(cors({
    origin: process.env.CORS_ORIGIN || 'http://localhost:3001',
}));
app.use(express.json());

app.use('/products', productRoutes);
app.get('/', (req, res) => res.send("We're up!"));

app.listen(
    process.env.PORT || 3000,
    () => console.log('Server is running on port 3000')
);
