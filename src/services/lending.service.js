import prisma from "../configs/database.js";
import { error400, error404 } from "../utils/customError.js";


export const lending = async (data) => {
    const user = await prisma.user.findUnique({ 
        where: { 
            id: data.userid 
        } 
    });

    if (!user) throw error404("User not found");

    const book = await prisma.book.findUnique({ 
        where: { 
            id: data.bookid 
        } 
    });

    if (!book) throw error404("Book not found");

    if (book.currentQty <= 0) throw error400("Book is not available");

    if (book.createdAt < data.qtyBook) throw error400("Book is not enough, book ready is " + book.currentQty);

    await prisma.book.update ({
        where: {
            id: data.bookid 
        },
        data: {
            currentQty: book.currentQty - data.qtyBook
        }
    });

    const lending = await prisma.borrowing.create ({
        data: {
            bookId : data.bookid,
            userId : data.userid,
            adminId : data.adminid,
            borrowDate : data.borrowDate,
        }
     })

    return lending;
};

export const getAllData = async (query) => {
    const page = query.page || 1;
    const limit = query.limit || 10; 

    const lendingdata = await prisma.borrowing.findMany({
        skip: (page - 1) * limit,
        take: limit,
    });

    const totalLending = await prisma.borrowing.count();
    const totalPage = Math.ceil(totalLending / limit);

    return { 
        lendingdata,
        pagination: {
            page,
            limit,
            totalLending,
            totalPage,
            links: {
                previous: page > 1 ? `/landing?page=${page - 1}&limit=${limit}` : null,
                next: page < totalPage ? `/landing?page=${page + 1}&limit=${limit}` : null
            }
        },
    };
};

export const updateLendingData = async (id, data) => {
    const lending = await prisma.borrowing.findUnique({
        where: { 
            id
        }
    });

    if (!lending) throw error404("Lending record not found");

    const user = await prisma.user.findUnique({ where: { 
        id: data.userid 
        } 
    });

    if (!user) throw error404("User not found");

    const book = await prisma.book.findUnique({ 
        where: { 
            id: data.bookid 
        } 
    });

    if (!book) throw error404("Book not found");

    if (book.currentQty <= 0) {
        throw error400("Book is out of stock");
    }

    if (book.currentQty < data.qtyBook) throw error400("Book is not enough, book ready is " + book.currentQty);

    await prisma.book.update({
        where: { 
            id: data.bookid 
        },
        data: { 
            currentQty: book.currentQty + data.qtyBook 
        }
    });

    const updateLending = await prisma.borrowing.update({
        where: { 
            id 
        },
        data: { 
            bookId: data.bookid,
            userId: data.userid,
            adminId: data.adminid,
            borrowDate: data.borrowDate,
         }
    });

    return updateLending;
};