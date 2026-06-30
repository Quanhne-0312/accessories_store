// layout
import { Fragment } from 'react';
import MainLayout from '@/layouts/MainLayout';
//page
import About from '@/pages/About';
import Blogs from '@/pages/Blogs';
import Cart from '@/pages/Cart';
import Contact from '@/pages/Contact';
import Home from '@/pages/Home';
import Login from '@/pages/Login';
import NotFound from '@/pages/NotFound';
import Register from '@/pages/Register';
import Reservation from '@/pages/Reservation';
import ProductDetails from '@/pages/ProductDetails';
//private
import Profile from '@/pages/Profile';
import ProfileUpdate from '@/pages/ProfileUpdate';
import Checkout from './pages/Checkout';
import Collection from './pages/Collection';
import Orders from './pages/Orders';
import OrderDetails from './pages/OrderDetails';
import CheckoutSuccessfully from './pages/CheckoutSuccessfully';

export const routes = {
    home: '/',
    collections: '/collection/all',
    category: '/collection/:slug',
    reservation: '/reservation',
    about: '/about',
    blogs: '/blog/all',
    blogDetails: '/blog/:id',
    contact: '/contact',
    register: '/register',
    login: '/login',
    cart: '/cart',
    productDetail: '/product/:slug',
    // private (only valid when logged in)
    profile: '/profile',
    profileUpdate: '/profile/update',
    address: '/address/all',
    addressCreate: '/address/create',
    addressUpdate: '/address/update/:id',
    orders: '/order/all',
    orderDetails: '/order/:order_uuid',
    checkout: '/checkout',
    checkoutSuccess: '/checkout/success',
};

export const publicRoutes = [
    {
        Layout: MainLayout,
        title: 'Trang chủ',
        Component: Home,
        path: routes.home,
    },
    {
        Layout: MainLayout,
        title: 'Bộ sưu tập',
        Component: Collection,
        path: routes.category,
    },
    {
        Layout: MainLayout,
        title: 'Giới thiệu',
        Component: About,
        path: routes.about,
    },
    {
        Layout: MainLayout,
        title: 'Bài viết',
        Component: Blogs,
        path: routes.blogs,
    },
    {
        Layout: MainLayout,
        title: 'Liên hệ',
        Component: Contact,
        path: routes.contact,
    },
    {
        Layout: MainLayout,
        title: 'Giỏ hàng',
        Component: Cart,
        path: routes.cart,
    },
    {
        Layout: MainLayout,
        title: 'Thanh toán',
        Component: Checkout,
        path: routes.checkout,
    },
    {
        Layout: MainLayout,
        title: 'Thanh toán thành công',
        Component: CheckoutSuccessfully,
        path: routes.checkoutSuccess,
    },
    {
        Layout: MainLayout,
        title: 'Quản lý đơn hàng',
        Component: Orders,
        path: routes.orders,
    },
    {
        Layout: MainLayout,
        title: 'Chi tiết đơn hàng',
        Component: OrderDetails,
        path: routes.orderDetails,
    },
    {
        Layout: MainLayout,
        title: 'Dịch vụ',
        Component: Reservation,
        path: routes.reservation,
    },
    {
        Layout: MainLayout,
        title: 'Chi tiết',
        Component: ProductDetails,
        path: routes.productDetail,
    },
    {
        Layout: Fragment,
        Component: Login,
        path: routes.login,
    },
    {
        Layout: Fragment,
        Component: Register,
        path: routes.register,
    },
    {
        Layout: Fragment,
        Component: NotFound,
        path: '*',
    },
];
export const privateRoutes = [
    {
        Layout: MainLayout,
        title: 'Tài khoản',
        Component: Profile,
        path: routes.profile,
    },
    {
        Layout: MainLayout,
        title: 'Cập nhật tài khoản',
        Component: ProfileUpdate,
        path: routes.profileUpdate,
    },
];
