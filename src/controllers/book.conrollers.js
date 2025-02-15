import { bookSchema } from "../validations/book.validation.js";
import { error400 } from "../utils/customError.js";
import { store, getAllData, getOneData, updateData } from "../services/book.service.js";
import { res201, res200 } from "../utils/customResponse.js";

export const create = async (req, res, next) => {
    try {
        const { error, value } = bookSchema.validate(req.body);
        if (error) {
            throw error400(error.details[0].message);
        }

        if(!req.file) {
            throw error400("Image is required");
        }

        const book = req.file;
        // const book = await store(value);

        res201(res, "Success create book", book)
    } catch (error) {
        next(error);
    }
};

export const getAll = async (req, res, next) => {
    try {
        const books = await getAllData(req.query);

        res200(res, "Success get all books", books);
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

        const book = await getOneData(id);        

        res200(res, "Success get one book", book);
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

        const { error, value } = bookSchema.validate(req.body);
        if (error) {
            throw error400(error.details[0].message);
        }

        const book = await updateData(id, value);
        
        res200(res, "Success update book", book);
    } catch(error) {
        next(error);
    }
};