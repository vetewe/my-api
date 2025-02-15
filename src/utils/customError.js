export const error400 = (message) => {
    const error = new Error(message);
    error.statusCode = 400;
    return error
};

export const error401 = (message) => {
    const error = new Error(message);
    error.statusCode = 401;
    return error
};

export const error404 = (message) => {
    const error = new Error(message);
    error.statusCode = 404;
    return error
};