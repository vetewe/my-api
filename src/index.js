import express from 'express';
import router from './routes/index.route.js';
import authRouter from './routes/auth.route.js';
import userRouter from './routes/user.route.js';
import bookRouter from './routes/book.route.js';
import { errorHandler, resourceNotFound } from './middlewares/errorHandler.js';

const app = express();

app.use(express.json());

app.use(router);
app.use(authRouter);
app.use(userRouter);
app.use(bookRouter);

app.use(resourceNotFound);
app.use(errorHandler);

app.listen(5000, () => {
    console.log('Server is listening on port 5000');
});