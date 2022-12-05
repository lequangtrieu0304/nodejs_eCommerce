import Product from "../models/productModel";

const createdProduct = async (req, res) => {
    try{
        const product = new Product({
            name: 'sample product',
            description: 'sample desc',
            category: 'sample category',
            brand: 'sample brand',
            image: '/images/product-1.jpg',
        });

        const createdProduct = await product.save();
        if(createdProduct) {
            res.status(201).send({
                message: 'them san pham thanh cong',
                product: createdProduct,
            })
        }
        else {
            res.status(500).send({message: 'Error in creating product'})
        }
    }
    catch(err){
        console.log(err);
    }
}

export default{
    createdProduct,
}