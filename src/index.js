import express from 'express';
import router from './routes/index.route.js';
import authRouter from './routes/auth.route.js';
import { errorHandler, resoureNotFound } from './middlewares/errorHandler.js';

const app = express();

app.use(router);
app.use(authRouter);

app.use(resoureNotFound);
app.use(errorHandler);

app.listen(5000, () => {
    console.log('Server is listening on port 5000');
});