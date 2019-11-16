import Master from './master';

export default class Cookies extends Master {
    set(cname, cvalue, exdays) {
        const d = new Date();
        d.setTime(d.getTime() + ((exdays || 36500) * 24 * 60 * 60 * 1000));
        const expires = `expires=${d.toUTCString()}`;
        document.cookie = `${cname}=${cvalue};${expires};path=/`;
    }

    get(cname) {
        const name = `${cname}=`;
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') {
                c = c.substring(1);
            }
            if (c.indexOf(name) === 0) {
                return c.substring(name.length, c.length);
            }
        }
        return '';
    }

    check(cname) {
        const cookie = this.get(cname);
        return (cookie !== '') ? cookie : false;
    }
}
