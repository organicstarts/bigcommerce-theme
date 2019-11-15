import _ from "lodash"

import lazyload from "vanilla-lazyload"
import slick from "slick-carousel"

export default class Master {
    constructor() {
        var win = {
            w: window.innerWidth,
            h: window.innerHeight
        }, breakpoints = {
          mobile: 425,
          tablet: 768,
          laptop: 1024,
          lgLaptop: 1440,
          desktop: 2560
        }
        this.win = win
        this.breakpoints = breakpoints
        this.isMobile = win.w >= breakpoints.mobile ? false : true
        this.isTablet = win.w >= breakpoints.tablet ? false : true
        this.isLaptop = win.w >= breakpoints.laptop ? false : true
        this.isLgLaptop = win.w >= breakpoints.lgLaptop ? false : true
        this.isDesktop = win.w >= breakpoints.desktop ? false : true
        
        this.jQuery = require('jquery')
    }
    
    combineObj(obj, variable) {
        for (let key of Object.keys(obj)) {
            if (!variable[key]) variable[key] = {};
        
            for (let innerKey of Object.keys(obj[key]))
            variable[key][innerKey] = obj[key][innerKey];
        }
    }
    
    forEachElements(array, callback, scope) {
        for (var i = 0; i < array.length; i++) {
            callback.call(scope, i, array[i])
        }
    }

    Swal(options) {
        const Swal = require('sweetalert2')
        let config = {
            customClass: {
                confirmButton: `${options.type}-button`
            }
        }
        Swal.fire(Object.assign( {}, config, options ))
    }
}