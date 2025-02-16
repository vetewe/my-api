import { Prisma } from '@prisma/client';

export const errorHandler = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = statusCode === 500 ? 'Internal server error' : err.message;

    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P2002') {
            message = `Unique constraint failed on the ${err.meta.target}`;
            statusCode = 400;
        } else if (err.code === 'P2025') {
            message = err.cause || `Data ${err.meta.modelName} tidak ditemukan`;
            statusCode = 400;
        } 
    }

    if (statusCode === 500) console.log(err);

    res.status(statusCode).json({
        status: false,
        message,
        data: null
    });
};

export const resourceNotFound = (req, res, next) => {
    const error = new Error(`Resource not found`);
    error.statusCode = 404;
    next(error);
};