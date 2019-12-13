import Swiper from 'swiper';

export default function () {
    new Swiper('.default.swiper-container', {
        slidesPerView: 'auto',
        loop: true,
        watchSlidesVisibility: true,
        centeredSlides: true,
    });
    new Swiper('.nav-carousel', {
        freeMode: true,
        freeModeMomentum: false,
        spaceBetween: 0,
    });
}
