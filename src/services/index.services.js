import prisma from "../configs/database.js";
export const getData = () => {
    const admins = prisma.admin.findmany();
    const data = {
        message : 'Hello Noeyy!',
        status:{
            code: 200,
            message: 'OK'
        }
    };

    return data;
}