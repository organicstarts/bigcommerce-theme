import 'lazysizes';
import 'imgix.js';

import headroom from './headroom';
import products from './products';
import sidebar from './sidebar';
import swiper from './swiper';
import home from './home';
import cart from './cart';


if (typeof window !== "undefined") {
    window.renderHome = () => {
        home();
    };
    window.renderProducts = () => {
        products();
    };
}

export default function () {
    cart();
    headroom();
    sidebar();
    swiper();
}
