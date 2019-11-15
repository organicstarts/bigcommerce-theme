import './global/jquery-migrate';
import './common/select-option-plugin';
import PageManager from './page-manager';
import quickSearch from './global/quick-search';
import currencySelector from './global/currency-selector';
import mobileMenuToggle from './global/mobile-menu-toggle';
import menu from './global/menu';
import foundation from './global/foundation';
import quickView from './global/quick-view';
import cartPreview from './global/cart-preview';
import privacyCookieNotification from './global/cookieNotification';
import maintenanceMode from './global/maintenanceMode';
import carousel from './common/carousel';
import 'lazysizes';
import loadingProgressBar from './global/loading-progress-bar';
import svgInjector from './global/svg-injector';

// Lets do my own stuff
import Headroom from "headroom.js";

export default class Global extends PageManager {
    onReady() {
        // Only load visible elements until the onload event fires,
        // after which preload nearby elements.
        window.lazySizesConfig = window.lazySizesConfig || {};
        window.lazySizesConfig.loadMode = 1;

        cartPreview(this.context.secureBaseUrl, this.context.cartId);
        quickSearch();
        currencySelector();
        foundation($(document));
        quickView(this.context);
        carousel();
        menu();
        mobileMenuToggle();
        privacyCookieNotification();
        maintenanceMode(this.context.maintenanceMode);
        loadingProgressBar();
        svgInjector();

        // Lets do my own stuff
        const header = document.querySelector("#header"), 
            tint = document.querySelector("#tint"), 
            sidebar = document.querySelector("#sidebar"), 
            toggleSidebar = document.querySelector(".toggleSidebar"), 
            headroom  = new Headroom(header);

        if(window.scrollY) {
            header.classList.add('headroom', 'headroom--not-top', 'headroom--not-bottom', 'headroom--unpinned');
        } else {
            header.classList.add('headroom', 'headroom--not-bottom', 'headroom--pinned', 'headroom--top');
        }
        headroom.init();
        
        toggleSidebar.addEventListener('click', (e) => {
            e.preventDefault();
            tint.classList.toggle('active');
            sidebar.classList.toggle('active');
            document.body.classList.toggle('unscrollable');
        });
        
        tint.addEventListener('click', (e) => {
            e.preventDefault();
            tint.classList.remove('active');
            sidebar.classList.remove('active');
            document.body.classList.remove('unscrollable');
        });

        // document.addEventListener('click', (e) => {
        //     console.log(e.target);
        //     if(sidebar != e.target || toggleSidebar == e.target) {
        //         sidebar.classList.toggle('active');
        //     }
        // });
    }
}
