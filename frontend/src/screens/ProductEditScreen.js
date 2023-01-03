import { getProductById, updatedProduct, uploadProductImage } from "../api/api";
import { parseRequestUrl, showMessage } from "../utils";

const ProductEditScreen = {

    after_render: () => {
        const request = parseRequestUrl();
        document.getElementById('edit-product-form').addEventListener('submit', async (e) => {
            e.preventDefault();
            const data = await updatedProduct({
                _id : request.id,
                name: document.getElementById('name').value,
                price: document.getElementById('price').value,
                image: document.getElementById('image').value,
                brand: document.getElementById('brand').value,
                countInStock: document.getElementById('countInStock').value,
                category: document.getElementById('category').value,
                description: document.getElementById('description').value,
            });
            console.log(data);
            if(data.error){
                showMessage(data.error);
            }
            else {
                showMessage(data.message);
                document.location.hash = `productlist`;
            }
        });

        document.getElementById('image-file').addEventListener('change', async (e) => {
            const file = e.target.files[0];
            const formData = new FormData();
            formData.append('image', file);
            
            const data = await uploadProductImage(formData);
            console.log(data);
            if(data.error){
                showMessage(data.error);
            }
            else {
                showMessage('Upload thanh cong');
                document.getElementById('image').value = data.image;
            }
        })
    },

    render: async () => {
        const request = parseRequestUrl();
        const product = await getProductById(request.id);

        return `
            <div class="content">
                <div class="back">
                    <a href="/#/productlist">Back to products</a>
                </div>

                <div class="form-container">
                    <form id="edit-product-form">
                        
                            <div class="form-left">
                                <div>
                                    <h1>Edit Product</h1>
                                </div>
                                <div >
                                    <label for="name">Name</label>
                                    <input type="text" name="name" value="${product.name}" id="name" />
                                </div>
                                <div>
                                    <label for="price">Price</label>
                                    <input type="number" name="price" value="${product.price}" id="price" />
                                </div>
                                <div>
                                    <label for="image">Image (680 x 830)</label>
                                    <input type="text" name="image" value="${product.image}" id="image" />
                                    <input type="file" name="image-file" id="image-file" />
                                </div>
                                
                            </div>

                            <div class="form-right">
                                <div>
                                    <label for="brand">Brand</label>
                                    <input type="text" name="brand" value="${product.brand}" id="brand" />
                                </div>
                                <div >
                                    <label for="countInStock">Count In Stock</label>
                                    <input type="text" name="countInStock" value="${product.countInStock}" id="countInStock" />
                                </div>
                                <div class="form-right">
                                    <label for="category">Category</label>
                                    <input type="text" name="category" value="${product.category}" id="category" />
                                </div>
                                <div>
                                    <label for="description">Description</label>
                                    <input type="text" name="description" value="${product.description}" id="description" />
                                </div>
                                <div>
                                    <button type="submit" class="primary">Update</button>
                                </div>
                            </div>
                
                    </form>
                </div>
            </div>
        `;
    }
}

export default ProductEditScreen;