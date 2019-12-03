import 'lazysizes';
import 'imgix.js';

import organicStart from '../os-bak/index';
window.oSx = organicStart;
organicStart.init();

import headroom from './headroom';
import sidebar from './sidebar';
import swiper from './swiper';

export default function () {
    headroom();
    sidebar();
    swiper();
}
