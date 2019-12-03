import Master from './master';

const Flickity = require('flickity');

export default class Swipes extends Master {
    swipey(className, options) {
        const elements = document.querySelectorAll(className);
        if (elements) {
            this.forEachElements(elements, (i, el) => {
                new Flickity(el, options);
            });
        }
    }

    easySwipey(className, selector, infinite, speed) {
        const elements = document.querySelectorAll(className);
        if (elements) {
            this.forEachElements(elements, (i, el) => {
                new Flickity(el, {
                    cellAlign: 'left',
                    cellSelector: selector || '.carousel-cell',
                    lazyLoad: true,
                    wrapAround: infinite || false,
                    autoPlay: speed || false,
                });
            });
        }
    }

    products() {
        // const elem = document.querySelector('.product-carousel');
        // console.log(elem);
        const elements = document.querySelectorAll('.product-carousel');
        if (elements) {
            this.forEachElements(elements, (i, el) => {
                const align = el.getAttribute('data-align');
                const wrap = (el.getAttribute('data-wrap') === 'true');

                // console.log(el)
                new Flickity(el, {
                    adaptiveHeight: false,
                    autoPlay: 5000,
                    cellAlign: (align || 'center'),
                    cellSelector: '.product-slide',
                    contain: false,
                    lazyLoad: true,
                    pageDots: false,
                    wrapAround: wrap,
                });
            });
        }
    }

    brands() {
        const elements = document.querySelectorAll('.brand-carousel');
        if (elements) {
            this.forEachElements(elements, (i, el) => {
                // console.log(el);
                new Flickity(el, {
                    adaptiveHeight: false,
                    autoPlay: 5000,
                    cellAlign: 'center',
                    cellSelector: '.brand-slide',
                    contain: false,
                    lazyLoad: true,
                    pageDots: false,
                    wrapAround: false,
                });
            });
        }
    }

    categories() {
        this.jQuery('.category-carousel').slick({
            mobileFirst: true,
            autoplay: true,
            autoplaySpeed: 1500,
            infinite: true,
            swipeToSlide: true,
            touchThreshold: 10,
            lazyLoad: 'ondemand',
            variableWidth: true,
            adaptiveHeight: false,
            arrows: false,
            responsive: [
                {
                    breakpoint: 2559,
                    settings: {
                        centerMode: false,
                        centerPadding: '1rem',
                        slidesToShow: 6,
                    },
                },
                {
                    breakpoint: 1440,
                    settings: {
                        centerMode: true,
                        centerPadding: '2.5rem',
                        slidesToShow: 5,
                    },
                },
                {
                    breakpoint: 1024,
                    settings: {
                        centerMode: true,
                        centerPadding: '2rem',
                        slidesToShow: 4,
                    },
                },
                {
                    breakpoint: 768,
                    settings: {
                        centerMode: true,
                        centerPadding: '1.5rem',
                        slidesToShow: 3,
                    },
                },
                {
                    breakpoint: 425,
                    settings: {
                        centerMode: true,
                        centerPadding: '1rem',
                        slidesToShow: 2,
                    },
                },
                {
                    breakpoint: 0,
                    settings: {
                        swipeToSlide: false,
                        centerMode: true,
                        centerPadding: '0px',
                        slidesToShow: 1,
                    },
                },
            ],
        });
    }

    subCategories() {
        const elements = document.querySelectorAll('.nav-sub');
        if (elements) {
            this.forEachElements(elements, (i, el) => {
                new Flickity(el, {
                    cellAlign: 'left',
                    freeScroll: true,
                    prevNextButtons: false,
                    pageDots: false,
                    contain: true,
                });
            });
        }
    }
}
