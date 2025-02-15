import Joi from 'joi';

export const userSchema = Joi.object({
    name: Joi.string().required().messages({
        'string.empty': 'Name is required',
        'string.base': 'Name must be a string',
        'any.required': 'Name is required'
    }),
    email: Joi.string().email().required().messages({
        'string.email': 'Email is invalid',
        'string.empty': 'Email is required',
        'any.required': 'Email is required'
    }),
    phone: Joi.string().min(10).max(15).required().messages({
        'string.empty': 'Phone is required',
        'string.base': 'Phone must be a string',
        'string.min': 'Phone must be at least 10 characters',
        'string.max': 'Phone must be at most 15 characters',
        'any.required': 'Phone is required'
    }),
});