import Master from './master';
// import Menus from "./menus";
import Modals from './modals';
import Cookies from './cookies';
import Swipes from './swipes';
import Products from './products';
// import Scrolls from './scrolls';
import Cart from './cart';

class Public extends Master {
    constructor() {
        super();

        this.Swipes = new Swipes();
        this.Modals = new Modals();
        this.Products = new Products();
        this.Cookies = new Cookies();
    }

    init() {
        // const // Menu = new Menus(),
        //    Scrolly = new Scrolls();
        const Carts = new Cart();

        this.jQuery(document).ready(() => {
            // Initialize the Main Menu
            // Menu.Init(this.isTablet)

            // Initilize Swipes (Flickity and Slick)
            this.Swipes.products();

            // Initilize the Cart
            Carts.init();

            // Mobile Only
            if (!this.isMobile) {
                // Scrolly.init();
                // Scrolly.animate('ready');
            }

            // let y = 0;

            // / On Scrolling...
            window.addEventListener('scroll', () => {
                // if (window.scrollY > y) {
                //     const dir = 'down';
                // } else {
                //     const dir = 'up';
                // }
                // let y = (window.scrollY || document.documentElement.scrollTop) <= 0 ? 0 : (window.scrollY || document.documentElement.scrollTop);

                if (!this.isMobile) {
                    //  Menu.Scrolling(dir)
                    // Scrolly.animate('scroll');
                }
            });
        });
    }

    removeFromCart(el) {
        const Carts = new Cart();
        Carts.removeFromCart(el);
    }

    addOneToCart(el) {
        const Carts = new Cart();
        Carts.addOneToCart(el);
    }

    removeOneFromCart(el) {
        const Carts = new Cart();
        Carts.removeOneFromCart(el);
    }
}
const OrganicStart = new Public();
export default OrganicStart;
