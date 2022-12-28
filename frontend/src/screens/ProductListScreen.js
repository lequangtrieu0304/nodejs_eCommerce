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
                                    <th>IMAGE</th>
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
                                        <td><img src="${product.image}" alt="${product.name}"/</td>
                                        <td>${product.name}</td>
                                        <td>${product.price}</td>
                                        <td>${product.category}</td>
                                        <td>${product.brand}</td>
                                        <td>
                                            <button id="${product._id}" class="edit-button"><i class="fa-regular fa-pen-to-square"></i>Edit</button>
                                            <button id="${product._id}" class="delete-button"><i class="fa-solid fa-trash-can"></i>Delete</button>
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