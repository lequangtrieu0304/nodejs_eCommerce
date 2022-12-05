import { getCartItems, getUserInfo } from "../localStorage";

const cartItems = getCartItems();

const Header = {
    render: () => {
        const { name, isAdmin } = getUserInfo();
        return `
        <div class="brand">
            <a href="/#/">Ontaphe2022</a>
        </div>
        <div class="header-action">
            <div class="header-profile">
                ${name ? `<a href="/#/profile"><i class="fa-solid fa-user-secret"></i>${name}</a>` : `<a href="/#/signin"><i class="fa-solid fa-right-to-bracket"></i>Đăng Nhập</a>`
            }
            </div>
            <div class="header-cart">
                <a href="/#/cart">
                    <div class="cart-header">
                        <div><i class="fa-sharp fa-solid fa-cart-shopping"></i></div>
                        <div id="cartAmount" class="cartAmount">Giỏ hàng(${cartItems.reduce((a, c) => a + c.qty, 0)})</div>
                    </div>   
                </a>
            </div>
            <div>
                ${isAdmin ? `<a href="/#/dashboard">Dashboard</a>` : ''}
            </div>
          
        </div>
        `;
    },

    after_render: () => {

    }
};

export default Header;