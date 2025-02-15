import Joi from 'joi';

export const bookSchema = Joi.object({
    title: Joi.string().required().messages({
        'string.base': `title should be a type of 'text'`,
        'string.empty': `title cannot be an empty field`,
        'any.required': `title is a required field`
    }),
    author: Joi.string().required().messages({
        'string.base': `author should be a type of 'text'`,
        'string.empty': `author cannot be an empty field`,
        'any.required': `author is a required field`
    }),
    publisher: Joi.string().required().messages({
        'string.base': `publisher should be a type of 'text'`,
        'string.empty': `publisher cannot be an empty field`,
        'any.required': `publisher is a required field`
    }),
    year: Joi.number().required().messages({
        'number.base': `year should be a type of 'number'`,
        'number.empty': `year cannot be an empty field`,
        'any.required': `year is a required field`
    }),
    quantity: Joi.number().required().messages({
        'number.base': `quantity should be a type of 'number'`,
        'number.empty': `quantity cannot be an empty field`,
        'any.required': `quantity is a required field`
    })
});