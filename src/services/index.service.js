import prisma from "../configs/database.js";

export const getData = async () => {
    const admins = await prisma.admin.findMany();
    const data = {
        message : 'Hello Noeyy!',
        user: admins,
    };

    return data;
}