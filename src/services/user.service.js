import prisma from "../configs/database.js";
import { error404 } from "../utils/customError.js";

export const store = async (data) => {
    return await prisma.user.create({
        data: {
            name: data.name,
            email: data.email,
            phone: data.phone
        },
    });
};

export const getAllData = async (query) => {
    const page = query.page || 1;
    const limit = query.limit || 10;

    const users = await prisma.user.findMany({
        skip: (page - 1) * limit,
        take: limit,
    });

    const totalUsers = await prisma.user.count();
    const totalPage = Math.ceil(totalUsers / limit);

    return {
        users,
        pagination: {
            page,
            limit,
            totalPage,
            totalUsers,
            links: {
                next: page < totalPage ? `/user?page=${parseInt(page) + 1}&limit=${limit}` : null,
                prev: page > 1 ? `/user?page=${parseInt(page) - 1}&limit=${limit}` : null,
            }
        }
    };

};

export const getOneData = async (id) => {
    return await prisma.user.findUnique({
        where: {
            id
        }
    });
};

export const updateData = async (id, data) => {
    const user = await prisma.user.findUnique({
        where: {
            id
        }
    });

    if(!user) {
        throw error404("User not found");
    }

    return await prisma.user.update({
        where: {
            id
        },
        data: {
            name: data.name,
            email: data.email,
            phone: data.phone
        }
    });

};