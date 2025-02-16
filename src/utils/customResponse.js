export const res200 = (res, message, data = null) => {
    res.status(200).json({
        status: true,
        message,
        data
    });
};

export const res201 = (res, message, data = null) => {
    res.status(201).json({
        status: true,
        message,
        data
    });
};