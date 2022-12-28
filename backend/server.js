import express from 'express';
import data from './data';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import config from './config/config';
import userRouter from './routers/userRouter';
import orderRouter from './routers/orderRouter';
import productRouter from './routers/productRouter';
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

app.get('/api/products', (req, res) => {
    res.send(data.products)
})

app.get('/api/products/:id', (req, res) => {
    const product = data.products.find(x => x._id === req.params.id);
    if(product) {
        res.send(product)
    }
    else {
        res.status(404).send({message: 'Product not found'})
    }
})

app.use('/api/users', userRouter);
app.use('/api/orders', orderRouter);
// app.use('/api/products', productRouter);

app.listen(PORT, () => {
    console.log(`Server at http://localhost:${PORT}`);
})