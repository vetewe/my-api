export const error400 = (message) => {
    const error = new Error (message);
    error.statusCode = 400;
    return error
}