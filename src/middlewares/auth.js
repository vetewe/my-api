import { error401 } from '../utils/customError.js';
import jwt from 'jsonwebtoken';

export const auth = async (req, res, next) => {
    try {
        const { authorization } = req.headers;

        if (!authorization) throw error401('Please authenticate.');

        const token = authorization.split(' ')[1];
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        req.admin = {
            id: decoded.id,
            email: decoded.email
        }

        next();
    } catch (error) {
        next(error401('Token invalid, please login.'));
    }
}