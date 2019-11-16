import Master from "./master"
//import Menus from "./menus"
import Modals from "./modals"
import Cookies from "./cookies"
import Swipes from "./swipes"
import Products from "./products"
import Scrolls from "./scrolls"
import Cart from "./cart"

class Public extends Master {

  constructor() {
    super()

    this.Swipes = new Swipes()
    this.Modals = new Modals()
    this.Products = new Products()
    this.Cookies = new Cookies()
  }

  Init() {
    const //Menu = new Menus(),
          Scrolly = new Scrolls(),
          Carts = new Cart()

    this.jQuery(document).ready(() => {

      // Initialize the Main Menu
      //Menu.Init(this.isTablet)

      // Initilize Swipes (Flickity and Slick)
      this.Swipes.Products()

      // Initilize the Cart
      Carts.Init()
      
      // Mobile Only
      if (!this.isMobile) {
        Scrolly.Init()
        Scrolly.Animate('ready')
      }

      var y = 0

      /// On Scrolling...
      window.addEventListener('scroll', () => {
        var dir
        if (window.scrollY > y){
          dir = 'down'
       } else {
          dir = 'up'
       }
       y = (window.scrollY || document.documentElement.scrollTop) <= 0 ? 0 : (window.scrollY || document.documentElement.scrollTop)

        if (!this.isMobile) {
        //  Menu.Scrolling(dir)
          Scrolly.Animate('scroll')
        }
      })
    })
  }

  RemoveFromCart(el) {
    const Carts = new Cart()
    Carts.RemoveFromCart(el)
  }

  AddOneToCart(el) {
    const Carts = new Cart()
    Carts.AddOneToCart(el)
  }

  RemoveOneFromCart(el) {
    const Carts = new Cart()
    Carts.RemoveOneFromCart(el)
  }

}
const OrganicStart = new Public()
export default OrganicStart