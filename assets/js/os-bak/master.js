import 'bootstrap/dist/js/bootstrap.bundle';
// import mmenu from 'mmenu-js/dist/mmenu'
import 'vanilla-lazyload';
import 'slick-carousel';

export default class Master {
    constructor() {
        const win = {
            w: window.innerWidth,
            h: window.innerHeight,
        }; const
            breakpoints = {
                mobile: 425,
                tablet: 768,
                laptop: 1024,
                lgLaptop: 1440,
                desktop: 2560,
            };
        this.win = win;
        this.breakpoints = breakpoints;
        this.isMobile = !(win.w >= breakpoints.mobile);
        this.isTablet = !(win.w >= breakpoints.tablet);
        this.isLaptop = !(win.w >= breakpoints.laptop);
        this.isLgLaptop = !(win.w >= breakpoints.lgLaptop);
        this.isDesktop = !(win.w >= breakpoints.desktop);

        this.jQuery = require('jquery');
    }

    // combineObj(obj, variable) {
    //     for (const key of Object.keys(obj)) {
    //         if (!variable[key]) variable[key] = {};

    //         for (const innerKey of Object.keys(obj[key])) { variable[key][innerKey] = obj[key][innerKey]; }
    //     }
    // }

    forEachElements(array, callback, scope) {
        for (let i = 0; i < array.length; i++) {
            callback.call(scope, i, array[i]);
        }
    }

    swal(options) {
        const Swal = require('sweetalert2');
        const config = {
            customClass: {
                confirmButton: `${options.type}-button`,
            },
        };
        Swal.fire(Object.assign({}, config, options));
    }
}
