import Header from "./components/Header.js";
import CartScreen from "./screens/CartScreen.js";
import Error404Screen from "./screens/Error404Screen.js";
import HomeScreen from "./screens/HomeScreen.js";
import ProductScreen from "./screens/ProductScreen.js";
import ProfileScreen from "./screens/ProfileScreen.js";
import RegisterScreen from "./screens/RegisterScreen.js";
import PaymentScreen from "./screens/PaymentScreen.js";
import ShippingScreen from "./screens/ShippingScreen";
import SigninScreen from "./screens/SigninScreen.js";
import { parseRequestUrl } from "./utils.js";
import PlaceOrderScreen from "./screens/PlaceOrderScreen.js";
import OrderScreen from "./screens/OrderScreen.js";
import DashboardScreen from "./screens/DashboardScreen";
import ProductListScreen from "./screens/ProductListScreen.js";
import ProductEditScreen from "./screens/ProductEditScreen.js";

const routes = {
    "/": HomeScreen,
    "/product/:id": ProductScreen,
    "/product/:id/edit": ProductEditScreen,
    "/cart/:id": CartScreen,
    "/cart": CartScreen,
    "/signin": SigninScreen,
    "/register": RegisterScreen,
    "/profile": ProfileScreen,
    "/shipping": ShippingScreen,
    "/payment": PaymentScreen,
    "/placeorder": PlaceOrderScreen,
    "/order/:id": OrderScreen,
    "/dashboard": DashboardScreen,
    "/productlist": ProductListScreen,
}

const router = async () => {
    const requset = parseRequestUrl();
    const parseUrl = 
        (requset.resource ? `/${requset.resource}` : '/') + 
        (requset.id ? '/:id' : '') + 
        (requset.verb ? `/${requset.verb}`: '');

    const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
    
    const header = document.getElementById('header-container');
    header.innerHTML = await Header.render();
    await Header.after_render();

    const main = document.getElementById('main-container');
    main.innerHTML = await screen.render();
    if(screen.after_render) await screen.after_render();
}

window.addEventListener("load", router)
window.addEventListener("hashchange", router)