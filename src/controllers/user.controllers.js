import { userSchema } from "../validations/user.validation.js";
import { error400 } from "../utils/customError.js";
import { store, getAllData, getOneData, updateData } from "../services/user.service.js";
import { res201, res200 } from "../utils/customResponse.js";

export const create = async (req, res, next) => {
    try {
        const { error, value } = userSchema.validate(req.body);
        if (error) {
            throw error400(error.details[0].message);
        }

        const user = await store(value);

        res201(res, "Success create user", user)
    } catch (error) {
        next(error);
    }
};

export const getAll = async (req, res, next) => {
    try {
        const users = await getAllData(req.query);

        res200(res, "Success get all users", users);
    } catch (error) {
        next(error);
    }
};

export const getOne = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);

        if(isNaN(id)) {
            throw error400("ID must be a number");
        }

        const user = await getOneData(id);        

        res200(res, "Success get one user", user);
    } catch (error) {
        next(error);
    }
};

export const update = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id);
        if(isNaN(id)) {
            throw error400("ID must be a number");
        }

        const { error, value } = userSchema.validate(req.body);
        if (error) {
            throw error400(error.details[0].message);
        }

        const user = await updateData(id, value);
        
        res200(res, "Success update user", user);
    } catch(error) {
        next(error);
    }
};