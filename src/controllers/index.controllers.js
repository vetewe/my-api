import { getData } from "../services/index.service.js";

export const index = async (req, res) => {
    const data = await getData();

    res.status(201).json({
        message: data.message,
        data: data.user,
        payload: req.admin
    });
};