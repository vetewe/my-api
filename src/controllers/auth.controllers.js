import { res200, res201 } from '../utils/customResponse.js';
import { loginValidator, registerValidator } from '../validations/auth.validator.js';
import { error400 } from '../utils/customError.js';
import { registerHandler, loginHandler } from '../services/auth.service.js';

export const register = async (req, res, next) => {
    try {
        const { error, value } = registerValidator.validate(req.body);
        if (error) {
            throw error400(error.details[0].message);
        }
        
        await registerHandler(value)

        res201(res, 'User registered successfully');
    } catch (error) {
        next(error);
    }
};

export const login = async (req, res, next) => {
    try {
        const { error, value } = loginValidator.validate(req.body);
        if (error) {
            throw error400(error.details[0].message);
        }

        const data = await loginHandler(value);

        res200(res, 'User logged in successfully', data);
    } catch (error) {
        next(error);
    }
};