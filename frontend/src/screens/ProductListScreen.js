import { getProduct } from "../api/api";
import DashboardMebnu from "./../components/DashBoardMenu";


const ProductListScreen = {

    render: async () => {
        const products = await getProduct();
        // console.log(products);
        return `
            <div class="dashboard">
                ${DashboardMebnu.render({selected: 'product'})}
                <div class="dashboard-content">
                    <h1>Products</h1>
                    <button id="create-product-button">Create Product</button>
                    <div class="product-list">
                        <table>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>NAME</th>
                                    <th>PRICE</th>
                                    <th>CATEGORY</th>
                                    <th>BRAND</th>
                                    <th class="tr-action">ACTION</th>
                                <tr>
                            </thead>
                            <tbody>
                                ${products.map(product => `
                                    <tr>
                                        <td>${product._id}</td>
                                        <td>${product.name}</td>
                                        <td>${product.price}</td>
                                        <td>${product.category}</td>
                                        <td>${product.brand}</td>
                                        <td>
                                            <button id="${product._id}" clasa="eidt-button">Edit</button>
                                            <button id="${product._id}" clasa="delete-button">Delete</button>
                                        </td>
                                    </tr>
                                `).join('')
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        `;
    }
}

export default ProductListScreen;