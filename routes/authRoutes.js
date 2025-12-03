import { Router } from 'express';
import jwt from 'jsonwebtoken';
import {AuthError} from "../error/AuthError.js";

const router = Router();

router.post('/login', (req, res) => {
    const { user, password } = req.body;

    // TODO: gestionar usuarios en otro lado
    if (user === 'user' && password === 'unGranPassword1') {
        const token = jwt.sign({ user }, process.env.JWT_SECRET, { expiresIn: '30m' });
        return res.json({ user, token });
    } else {
        throw new AuthError('Credenciales inválidas.');
    }
})

export const authRoutes = router;