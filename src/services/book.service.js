import prisma from "../configs/database.js";
import { error404 } from "../utils/customError.js";

export const store = async (data) => {
    return await prisma.book.create({
        data: {
            title: data.title,
            author: data.author,
            publisher: data.publisher,
            year: data.year,
            image: data.image,
            quantity: data.quantity
        },
    });
};

export const getAllData = async (query) => {
    const page = query.page || 1;
    const limit = query.limit || 10;

    const books = await prisma.book.findMany({
        skip: (page - 1) * limit,
        take: limit,
    });

    const totalbooks = await prisma.book.count();
    const totalPage = Math.ceil(totalbooks / limit);

    return {
        books,
        pagination: {
            page,
            limit,
            totalPage,
            totalbooks,
            links: {
                next: page < totalPage ? `/book?page=${parseInt(page) + 1}&limit=${limit}` : null,
                prev: page > 1 ? `/book?page=${parseInt(page) - 1}&limit=${limit}` : null,
            }
        }
    };

};

export const getOneData = async (id) => {
    return await prisma.book.findUnique({
        where: {
            id
        }
    });
};

export const updateData = async (id, data) => {
    const book = await prisma.book.findUnique({
        where: {
            id
        }
    });

    if(!book) {
        throw error404("book not found");
    }

    return await prisma.book.update({
        where: {
            id
        },
        data: {
            title: data.title,
            author: data.author,
            publisher: data.publisher,
            year: data.year,
            image: data.image,
            quantity: data.quantity
        }
    });

};