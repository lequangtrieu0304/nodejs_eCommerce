import Order from "../models/orderModel";

const getOrder = async (req, res) => {
    try{
        const id = req.params.id;
        const order = await Order.findById(id);
        if(!order) {
            return res.status(404).send({message: 'Not found order!!'})
        }
        else {
            res.send(order);
        }
    }
    catch(err){
        console.log(err);
    }
}

const createOrder = async (req, res) => {
    try{
        const order = await Order.create({
            orderItems: req.body.orderItems,
            user: req.user._id,
            shipping: req.body.shipping,
            payment: req.body.payment,
            itemsPrice: req.body.itemsPrice,
            taxPrice: req.body.taxPrice,
            shippingPrice: req.body.shippingPrice,
            totalPrice: req.body.totalPrice
        });
        if(!order) {
            res.status(400).send({message: 'Created Order Failed'})
        }
        else {
            res.status(201).send({
                message: 'New Order Created',
                data: order,
            });
        }
    }
    catch(err) {
        console.log(err);
    }
}

export default {
    createOrder,
    getOrder,
}