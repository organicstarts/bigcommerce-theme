import 'lazysizes';
import 'imgix.js';

import headroom from './headroom';
import sidebar from './sidebar';
import swiper from './swiper';
import cart from './cart';

export default function () {
    cart();
    headroom();
    sidebar();
    swiper();
}
