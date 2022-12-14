import { clearCart, getCartItems, getPayment, getShipping } from "../localStorage";
import checkoutSteps from "../components/checkoutSteps";
import { showMessage } from "../utils";
import { createOrder } from "../api/api";

const convertCartOrder = () => {
    const orderItems = getCartItems();
    if(orderItems.length === 0) {
        document.location.hash = '/cart';
    }
    const shipping = getShipping();
    if(!shipping.address || !shipping.city || !shipping.postalCode || !shipping.country) {
        document.location.hash = '/shipping';
    }
    const payment = getPayment();
    if(!payment.paymentMethod){
        document.location.hash = '/payment';
    }
    const itemsPrice = orderItems.reduce((a, c) => a + c.price*c.qty, 0);
    const shippingPrice = itemsPrice > 100 ? 0 : 10;
    const taxPrice = Math.round(0.2 * itemsPrice*100) / 100;
    const totalPrice = itemsPrice + shippingPrice + taxPrice;

    return {
        orderItems,
        shipping,
        payment,
        itemsPrice,
        shippingPrice,
        taxPrice,
        totalPrice,
    }
}

const PlaceOrderScreen = {
    after_render: async () => {
        document.getElementById('placeorder-button').addEventListener('click', async () => {
            const order = convertCartOrder();
            const data = await createOrder(order);
            // console.log(data);
            if(data.error) {
                showMessage(data.error);
            }
            else {
                clearCart();
                showMessage(data.message);
                document.location.hash = `/order/${data.data._id}`;
            }
        })
    },
    
    render: () => {
        const {orderItems, shipping, payment, itemsPrice, shippingPrice, taxPrice, totalPrice} = convertCartOrder();
        return `
            <div>
                ${checkoutSteps.render({step1: true, step2: true, step3: true, step4: true})}
                <div class="order">
                    <div class="order-info">
                        <div>
                            <h2>?????a ch???</h2>
                            <div>
                                ${shipping.address}, ${shipping.city}, ${shipping.postalCode}, ${shipping.country}
                            </div>
                        </div>
                        <div>
                            <h2>Thanh to??n</h2> 
                            <div>
                                Ph????ng th???c: ${payment.paymentMethod}
                            </div>
                        </div>
                        <div>
                            <ul class="cart-list-container">
                                <li>
                                    <h2>Gi??? h??ng</h2>
                                    <div>Gi?? tr???</div>
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
                                                <div>S??? l?????ng : ${item.qty}</div>
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
                                <h2>????n ?????t h??ng</h2>
                            </li>
                            <li><div>????n h??ng</div><div>$${itemsPrice}</div></li>
                            <li><div>Ph?? v???n chuy???n</div><div>$${shippingPrice}</div></li>
                            <li><div>Tax</div><div>$${taxPrice}</div></li>
                            <li class="total"><div>T???ng gi?? tr???</div><div>$${totalPrice}</div></li>
                            <li>
                                <button type="button" id="placeorder-button">?????t h??ng</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        `
    }
}

export default PlaceOrderScreen;