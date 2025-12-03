import { AuthError } from "../error/AuthError.js";
import jwt from 'jsonwebtoken';

export const jwtMiddleware = (req, _res, next) => {
    const { authorization } = req.headers;
    const token = authorization?.split(' ')[1];

    if (!token) {
        throw new AuthError('No se proveyó un token.');
    }
    try {
        jwt.verify(token, process.env.JWT_SECRET);
    } catch (e) {
        throw new AuthError('Token inválido.', e);
    }

    next();
};