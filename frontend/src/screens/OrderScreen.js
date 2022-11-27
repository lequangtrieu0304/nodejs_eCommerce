import { getOrder } from "../api/api";
import { parseRequestUrl } from "../utils";

const OrderScreen = {
    render: async () => {
        const request = parseRequestUrl();
        const {
            _id, 
            shipping, 
            payment, 
            orderItems, 
            itemsPrice, 
            shippingPrice, 
            taxPrice, 
            totalPrice, 
            createdAt
        } = await getOrder(request.id);
        return `
            <div>
                <div class="order-id">OrderID ${_id}</div>
                <div class="order">
                    <div class="order-info">
                        <div class="order-address">
                            <h2>Địa chỉ</h2>
                            <div>
                                ${shipping.address}, ${shipping.city}, ${shipping.postalCode}, ${shipping.country}
                            </div>
                            <div>Ngày Đặt: ${createdAt.substring(0, 10)}</div>
                        </div>
                        <div>
                            <h2>Thanh toán</h2> 
                            <div>
                                Phương thức: ${payment.paymentMethod}
                            </div>
                        </div>
                        <div>
                            <ul class="cart-list-container">
                                <li>
                                    <h2>Giỏ hàng</h2>
                                    <div>Giá trị</div>
                                </li>
                                ${
                                    orderItems.map(item => `
                                       <li>
                                            <div class="cart-image">
                                                <img src="${item.image}" alt="${item.name}"/>
                                            </div>
                                            <div class="cart-name">
                                                <div>
                                                    <a href="/#/product/${item.product}">${item.name}</a>
                                                </div>
                                                <div>Số lượng : ${item.qty}</div>
                                            </div>
                                            <div class="cart-price">$${item.price }</div>
                                       </li>
                                    `).join('')
                                }
                            </ul>
                        </div>
                    </div>
                    <div class="order-action">
                        <ul>
                            <li>
                                <h2>Đơn đặt hàng</h2>
                            </li>
                            <li><div>Đơn hàng</div><div>$${itemsPrice}</div></li>
                            <li><div>Phí vận chuyển</div><div>$${shippingPrice}</div></li>
                            <li><div>Tax</div><div>$${taxPrice}</div></li>
                            <li class="total"><div>Tổng giá trị</div><div>$${totalPrice}</div></li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }
}

export default OrderScreen;