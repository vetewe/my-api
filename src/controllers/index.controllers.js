import { getData } from "../services/index.services.js";
export const index = (req, res) => {
    const data = getData();
    res.status(201).json({
        code: data.status.code,
        message: data.message
    });
};