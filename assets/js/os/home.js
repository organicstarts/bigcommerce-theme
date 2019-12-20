import Swiper from 'swiper';
import loadSwiperCards from './firebase';

if (typeof window !== undefined) {
    window.renderHome = () => {
        let i = 0;
        const colors = [
            'green', 'pink', 'blue',
        ];

        const xmlhttp = new XMLHttpRequest();
        const url = 'https://us-central1-apt-reason-149015.cloudfunctions.net/inventory';

        xmlhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                const response = JSON.parse(this.responseText);
                loadSwiperCards('diapers.json', 'diapers', response);
                loadSwiperCards('puree.json', 'puree', response);
            }
        };
        xmlhttp.open('GET', url, true);
        xmlhttp.send();

        new Swiper('#categories .swiper-container', {
            slidesPerView: 'auto',
            loop: true,
            watchSlidesVisibility: true,
            centeredSlides: true,
        });
        new Swiper('#brands .swiper-container', {
            navigation: {
                nextEl: '#swiper-next',
                prevEl: '#swiper-prev',
            },
            pagination: {
                el: '#swiper-dots',
                type: 'bullets',
                dynamicBullets: true,
                dynamicMainBullets: 1,

            },
            slidesPerView: 1,
            spaceBetween: 16,
            breakpoints: {
                320: {
                    slidesPerView: 2,
                    spaceBetween: 16,
                },
                480: {
                    slidesPerView: 3,
                    spaceBetween: 32,
                },
                640: {
                    slidesPerView: 4,
                    spaceBetween: 48,
                },
                800: {
                    slidesPerView: 5,
                    spaceBetween: 64,
                },
            },
            watchSlidesVisibility: true,
        });
        setInterval(() => {
            document.getElementById('powder-nest').classList = colors[i];
            i = (i === 2 ? 0 : i++);
        }, 3000);
    };
}
