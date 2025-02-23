import Joi from 'joi';

export const lendingSchema = Joi.object({
    bookid: Joi.number().required().messages({
        'number.base': `book id should be a type of 'number'`,
        'number.empty': `book id cannot be an empty field`,
        'any.required': `book id is a required field`
    }),
    userid: Joi.number().required().messages({
        'number.base': `user id should be a type of 'number'`,
        'number.empty': `user id cannot be an empty field`,
        'any.required': `user id is a required field`
    }),
    adminid: Joi.number().required().messages({
        'number.base': `admin id should be a type of 'number'`,
        'number.empty': `admin id cannot be an empty field`,
        'any.required': `admin id is a required field`
    }),
    borrowDate: Joi.date().required().messages({
        'date.base': `borrow date should be a type of 'date'`,
        'date.empty': `borrow date cannot be an empty field`,
        'any.required': `borrow date is a required field`
    }),
    qtyBook: Joi.number().required().messages({
        'number.base': `qty book should be a type of 'number'`,
        'number.empty': `qty book cannot be an empty field`,
        'any.required': `qty book is a required field`
    }),
});