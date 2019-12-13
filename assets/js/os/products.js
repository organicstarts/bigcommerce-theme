import Swiper from 'swiper';

const dhm = (ms) => {
    var days = Math.floor(ms / (24*60*60*1000));
    var daysms = ms % (24*60*60*1000);
    var hours = Math.floor((daysms)/(60*60*1000));
    var hoursms = ms % (60*60*1000);
    var minutes = Math.floor((hoursms)/(60*1000));
    var minutesms = ms % (60*1000);
    var seconds = Math.floor((minutesms)/(1000));
    return `${hours > 0 ? `${hours} hour${hours != 1 ? `s` : ``}${minutes > 0 ? `,` : ``} ` : ``}${minutes > 0 ? `${minutes} minute${minutes != 1 ? `s` : ``} and ` : ``}${seconds} second${seconds != 1 ? `s` : ``}`;
}

export default function () {
    var moment = require('moment-business-days');
    var today = new Date();
    var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var month = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    moment.updateLocale('us', {
        workingWeekdays: [1, 2, 3, 4, 5, 6],
        holidays: [
            '12-20-2019',
            '12-21-2019',
            '12-23-2019',
            '12-24-2019',
            '12-25-2019',
            '12-26-2019',
            '12-31-2019',
            '01-01-2020', 
            '01-18-2020',
            '01-20-2020', 
            '02-15-2020',
            '02-17-2020', 
            '05-23-2020',
            '05-25-2020', 
            '07-03-2020', 
            '07-04-2020', 
            '09-05-2020',
            '09-07-2020', 
            '10-10-2020',
            '10-12-2020', 
            '11-11-2020', 
            '11-26-2020', 
            '11-27-2020',
            '11-28-2020',
            '12-24-2020', 
            '12-25-2020', 
            '12-26-2020',
            '12-31-2020',
            '01-01-2021',
            '01-02-2021',
            '01-16-2021',
            '01-18-2021',
            '02-13-2021',
            '02-15-2021',
            '05-29-2021',
            '05-31-2021',
            '07-03-2021',
            '07-04-2021',
            '07-05-2021',
            '09-05-2021',
            '09-06-2021',
            '09-07-2021',
            '10-09-2021',
            '10-11-2021',
            '11-11-2021',
            '11-25-2021',
            '11-26-2021',
            '11-27-2021',
            '12-24-2021',
            '12-25-2021',
            '12-31-2021',
            '01-01-2022',
        ],
        holidayFormat: 'MM-DD-YYYY',
    });
    var nyc = new Date(new Date().getTime() - 5 * 3600 * 1000);
    var currentDate = (nyc.getMonth() + 1) + '-' + nyc.getDate() + '-' + nyc.getFullYear();
    var currentMoment = moment(currentDate, 'MM-DD-YYYY');
    var next = new Date(moment(currentDate, 'MM-DD-YYYY').nextBusinessDay()._d);
    var nextDate = (next.getMonth() + 1) + '-' + next.getDate() + '-' + next.getFullYear();
    var cutoff = new Date(nyc.setHours(16, 30));
    var timeleft = Math.floor(cutoff - today) / (1000 * 60 *60);
    var eta = new Date(moment(0 <= timeleft && currentMoment.isBusinessDay() ? currentDate : nextDate, 'MM-DD-YYYY').businessAdd(3)._d);
    var arrival = Math.floor((eta - today) / (24*60*60*1000)) <= 4 ? `<br>Arrives on or before ${weekday[eta.getDay()]}, ${month[eta.getMonth()]} ${eta.getUTCDate()}.` : ``;
    if(0 <= timeleft <= 24 && currentMoment.isBusinessDay()) {
        setInterval(function() {
            today = new Date();
            document.getElementById("nextBusinessDay").innerHTML = `${0 < (cutoff - today) ? `today if ordered within ${dhm(cutoff - today)}.` : `on ${weekday[next.getDay()]}, ${month[next.getMonth()]} ${next.getUTCDate()}.`}`;
            document.getElementById("arrival").innerHTML = 0 < (cutoff - today) ? arrival : '';
        }, 1000);
    } else {
        if(Math.floor((next - today) / (24*60*60*1000)) < 2) {
            document.getElementById("nextBusinessDay").innerHTML = `on ${weekday[next.getDay()]}, ${month[next.getMonth()]} ${next.getUTCDate()}.`;
            document.getElementById("arrival").innerHTML = arrival;
        } else {
            document.getElementById("nextBusinessDay").innerHTML = `securely from our Nevada fulfillment center.`;
        }
        
    }

    
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
}