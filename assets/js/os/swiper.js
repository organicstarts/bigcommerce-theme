import Swiper from 'swiper';

export default function () {
    new Swiper('.default.swiper-container', {
        slidesPerView: 'auto',
        loop: true,
        watchSlidesVisibility: true,
        centeredSlides: true,
    });
    var productThumbs = new Swiper('.product-thumbs.swiper-container', {
        spaceBetween: 16,
        slidesPerView: 'auto',
        freeMode: true,
        watchSlidesVisibility: true,
        watchSlidesProgress: true,
    });
    new Swiper('.product-view.swiper-container', {
        effect: 'fade',
        slidesPerView: 1,
        spaceBetween: 0,
        centeredSlides: true,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
        thumbs: {
          swiper: productThumbs,
        },
    });
    new Swiper('#categories .swiper-container', {
        slidesPerView: 'auto',
        loop: true,
        watchSlidesVisibility: true,
        centeredSlides: true,
    });
    new Swiper('#brands .swiper-container', {
        slidesPerView: 'auto',
        loop: true,
        watchSlidesVisibility: true,
        breakpoints: {
            320: {
                spaceBetween: 16,
            },
            1025: {
                spaceBetween: 64,
                centeredSlides: true,
            },
            1441: {
                spaceBetween: 80,
                centeredSlides: true,
            },
            2560: {
                spaceBetween: 96,
                centeredSlides: true,
            },
        },
    });
    new Swiper('.nav-carousel', {
        freeMode: true,
        freeModeMomentum: false,
        spaceBetween: 0,
    });
}
