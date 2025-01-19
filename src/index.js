import express from 'express';
import router from './routes/index.route.js';

const app = express();

app.use(router);

app.listen(5000, () => {
    console.log('Server is listening on port 5000');
})