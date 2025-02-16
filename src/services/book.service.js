import prisma from "../configs/database.js";
import { error404 } from "../utils/customError.js";

export const store = async (data, filename) => {
    const urlImage = process.env.BASE_URL + "/public/images/" + filename;
    return await prisma.book.create({
        data: {
            title: data.title,
            author: data.author,
            publisher: data.publisher,
            year: data.year,
            image: urlImage,
            quantity: data.quantity
        },
    });
};

export const getAllData = async (query) => {
    const page = query.page || 1;
    const limit = query.limit || 10;

    const books = await prisma.book.findMany({
        where: {
            deletedAt: null
        },
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
    const book = await prisma.book.findUnique({
        where: {
            id,
            deletedAt: null
        }
    });

    if(!book) throw error404("book not found");

    return book;
};

export const updateData = async (id, data) => {
    return await prisma.book.update({
        where: {
            id,
            deletedAt: null
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

export const destroyData = async (id) => {
    const deleteBook = await prisma.book.update({
        where: {
            id,
            deletedAt: null
        },
        data: {
            deletedAt: new Date()
        }
    });

    return {
        book: deleteBook.title
    }

};