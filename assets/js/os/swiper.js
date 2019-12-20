import Swiper from 'swiper';

export default function () {
    const mobiles = window.matchMedia('(max-width: 769px)');
    const swipers = (x) => {
        if (x.matches) {
            new Swiper('.default.swiper-container', {
                slidesPerView: 1,
                spaceBetween: 16,
                breakpoints: {
                    320: {
                        slidesPerView: 2,
                    },
                    480: {
                        slidesPerView: 3,
                    },
                    640: {
                        slidesPerView: 4,
                    },
                    800: {
                        slidesPerView: 5,
                    },
                },
                watchSlidesVisibility: true,
            });
            new Swiper('.nav-carousel', {
                freeMode: true,
                freeModeMomentum: false,
                spaceBetween: 0,
            });
        }
    };
    swipers(mobiles);
    mobiles.addListener(swipers);
}
