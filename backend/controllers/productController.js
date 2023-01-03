import Product from "../models/productModel";

const getProducts = async (req, res) => {
    try{
        const products = await Product.find({});
        res.send(products);
    }
    catch (err){
        console.log(err);
    }
}

const getProductById = async (req, res) => {
    try {
        const id = req.params.id;
        const product = await Product.findById(id);

        res.send(product);
    }
    catch (err){
        console.log(err);
    }
}

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
            res.status(500).send({message: 'Them san pham that bai'})
        }
    }
    catch(err){
        console.log(err);
    }
}

const updateProduct = async (req, res) => {
    const {name, price, image, brand, category, countInStock, description} = req.body;
    try{
        const product = await Product.findById(req.params.id);

        if(product){
            product.name = name || product.name;
            product.price = price || product.price;
            product.image = image || product.image;
            product.brand = brand || product.brand;
            product.category = category || product.category;
            product.countInStock = countInStock || product.countInStock;
            product.description = description || product.description;

            const updateProduct = await product.save();
            if(updateProduct){
                res.send({message: 'cap nhat thanh cong', product: updateProduct})
            }
            else {
                res.status(500).send({message: 'Cap nhat that bai'})
            }
        }
        else{
            res.status(404).send({message: 'khong tim thay san pham'});
        } 
    }
    catch (err){
        console.log(err);
    }
}

export default{
    createdProduct,
    getProducts,
    getProductById,
    updateProduct
}