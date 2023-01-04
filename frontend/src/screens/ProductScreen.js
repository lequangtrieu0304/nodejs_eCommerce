import { getProduct, getProductById, getProducts } from '../api/api';
import Rating from '../components/Rating';
import { parseRequestUrl } from '../utils'
const ProductScreen = {
    after_render: () => {
        const request = parseRequestUrl()
        document.getElementById('add-button').addEventListener('click', () => {
            document.location.hash = `/cart/${request.id}`;
        })
    },

    render: async () => {
        const request = parseRequestUrl();
        const product = await getProductById(request.id);
        if(product.error) {
            return `<h1>${product.error}</h1>`
        }
        return `
            <div class="content">
                <div class="image">
                    <img src="${product.image}" alt="${product.name}">
                </div>
                <div class="details">
                    <div class="details-info">
                        <ul>
                            <li>
                                <h1>${product.name}</h1>
                            </li>
                            <li>
                                ${Rating.render({
                                    value: product.rating,
                                    text: `${product.numReviews} reviews`
                                })}
                            </li>
                            <li>
                                Price: <strong>$${product.price}</strong>
                            </li>
                            <li>
                                Description: <div>${product.description}</div>
                            </li>
                        </ul>
                    </div>
                    <div class="details-action">
                        <ul>
                            <li>
                                Status: 
                                ${
                                    product.countInStock > 0
                                    ? `<span class="success">In Stock</span>`
                                    : `<span class="error">Unavailable</span>`
                                }
                            </li>
                            <li>
                                ${product.countInStock > 0 
                                    ? `<button id="add-button" class="primary" type="button"> Add to cart</button>` 
                                    : `<button id="add-button" class="primary" type="button" disabled> Add to cart</button>`
                                }
                               
                            </li>
                        </ul>
                    </div>
                </div>   
            </div>
        `;
    }
}
export default ProductScreen;