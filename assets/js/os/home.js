import Swiper from 'swiper';

//https://apt-reason-149015.firebaseapp.com/home/diapers.json

export default function () {
    
    new Swiper('#diapers .swiper-container', {
        slidesPerView: 'auto',
        loop: true,
        watchSlidesVisibility: true,
        centeredSlides: true,
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
}