import checkoutSteps from "../components/checkoutSteps";
import { getPayment, getUserInfo, setPayment } from "../localStorage";

const PaymentScreen = {
    after_render: () => {
    
        document.getElementById('payment-form').addEventListener('submit', async(e) =>{
            e.preventDefault();
            const paymentMethod = document.querySelector('input[name="payment-method"]:checked').value;
            setPayment({
                paymentMethod
            });
            document.location.hash = '/placeorder';
        });
    },

    render: () => {
        const {name} = getUserInfo();
        if(!name) {
            document.location.hash = '/';
        }

        return `
            ${checkoutSteps.render({step1: true, step2: true, step3: true})}
            <div class="form-container">
                <form id="payment-form">
                    <ul class="form-items">
                        <li>
                            <h1>Payment</h1>
                        </li>
                        <li>
                            <div>
                                <input type="radio" name="payment-method" id="cash" value="Cash" checked />
                                <label for="cash">Cash</label>
                            </div>
                        </li>
                        <li>
                            <div>
                                <input type="radio" name="payment-method" id="paypal" value="Paypal"/>
                                <label for="paypal">Paypal</label>
                            </div>
                        </li>
                        <li>
                            <div>
                                <input type="radio" name="payment-method" id="momo" value="Momo"/>
                                <label for="momo">Momo</label>
                            </div>
                        </li>
                        <li>
                            <div>
                                <input type="radio" name="payment-method" id="credit-card" value="Credit Card"/>
                                <label for="credit-card">Credit Card</label>
                            </div>
                        </li>
                        <li>
                            <button type="submit">Continue</button>
                        </li>
                    </ul>
                </form>
            </div>
        `;
    }
}

export default PaymentScreen;