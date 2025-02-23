import { lendingSchema } from "../validations/lending.validator.js";
import { error400 } from "../utils/customError.js";
import { lending, getAllData, updateLendingData } from "../services/lending.service.js";
import { res201, res200 } from "../utils/customResponse.js";

export const lendingBook = async (req, res, next) => {
    try {
        const { error, value } = lendingSchema.validate(req.body);
        if (error) {
            throw error400(error.details[0].message);
        }

        const data = await lending(value);

        res201(res, "Success create book", data)
    } catch (error) {
        next(error);
    }
};

export const getAllLending = async (req, res, next) => {
    try {
        const data = await getAllData(req.query);

        res200(res, "Success geting all lending", data)
    } catch (error) {
        next(error);
    }
};

export const updateLending = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if (isNaN(id)) {
            throw error400('id must be a number');
        }

        const { error, value } = lendingSchema.validate(req.body);
        if (error) {
            throw error400(error.details[0].message);
        }

        const data = await updateLendingData(id, value);

        res200(res, "Success updating lending", data);
    } catch (error) {
        next(error);
    }
};