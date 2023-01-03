import express from 'express';
import path from 'path';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import config from './config/config';
import userRouter from './routers/userRouter';
import orderRouter from './routers/orderRouter';
import productRouter from './routers/productRouter';
import uploadRouter from './routers/uploadImage';

const app = express();
const PORT = 3001;

mongoose
    .connect(config.MONGODB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => {
        console.log('Connect database successfully!');
    })
    .catch((error) => {
        console.log(error);
    })

app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/uploadImg', uploadRouter);
app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
app.use('/api/products', productRouter);

app.use('/uploads', express.static(path.join(__dirname, './../uploads')));

app.use(express.static(path.join(__dirname, './../frontend')));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './../frontend/index.html'));
});

app.listen(PORT, () => {
    console.log(`Server at http://localhost:${PORT}`);
})