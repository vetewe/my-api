import { res200, res201 } from "../utils/customResponse.js";
import { registerValidator } from "../validations/auth.validator.js";
import { error400 } from "../utils/customError.js";
import { registerHandler } from "../services/auth.service.js";
export const register = async (req, res, next) => {
    try {
        const { error, value } = registerValidator.validate(req.body);
        if (error) {
            throw error400(error.details[0].message);
        }
        
        await registerHandler(value)

        res201(res, 'User Registered successfully');
    } catch (error) {
        next(error);
    }
};