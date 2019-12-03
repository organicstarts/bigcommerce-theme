import Master from './master';
import utils from '@bigcommerce/stencil-utils';

export default class Cart extends Master {
    constructor() {
        super();

        this.overlay = document.getElementById('cartLoader');
        this.sidebar = document.getElementById('cartMenu');
        this.header = document.querySelector('.cart-top');
        this.container = document.querySelector('.cart-contained');
        this.footer = document.querySelector('.cart-bottom');
        this.counter = document.getElementById('cartPill');
        this.content = document.getElementById('cartItems');
        this.cartDate = document.getElementById('cart-date');
    }

    parseData(products) {
        const items = [];
        products.map(product => items.push(`<div class="border-bottom p-2">
            <div class="row justify-content-center align-items-center">
              <div class="col-2 text-center m-0">
                <a href="${product.url}" class="link-unstyled">
                  <img src=${product.imageUrl} class="mx-auto max-h-100" alt="${product.brand}: ${product.name}">
                </a>
              </div>
              <div class="col-10 m-0">
                <a href="${product.url}" class="link-unstyled">
                  <p class="lead small m-0"><strong>${product.brand}</strong></p>
                  <p>${product.name}</p>
                </a>
                <div class="row">
                  <div class="col-6 m-0">
                    <a href="#" class="link-unstyled rfc" data-product-id="${product.id}" onclick="oSx.removeFromCart(this);return false;"><small>REMOVE</small></a>
                  </div>
                  <div class="col-6 text-right m-0">
                    <a href="#" class="ui mini button p-1" onclick="oSx.removeOneFromCart(this);return false;" data-product-id="${product.id}" data-product-quantity="${product.quantity}">&#x2212;</a>&nbsp;${product.quantity}&nbsp;<a href="#" class="ui mini button p-1" onclick="oSx.AddOneToCart(this);return false;" data-product-id="${product.productId}" data-product-quantity="${product.quantity}">&#x2b;</a> <small>&times;</small> <strong>$${product.salePrice}</strong>
                  </div>
                </div>
              </div>
            </div>
          </div>`));
        return items;
    }

    init() {
        this.refresh();

        const parent = this;

        const cartButtons = document.querySelectorAll('.toggle-cart');
        if (cartButtons) {
            super.forEachElements(cartButtons, (i, el) => {
                el.addEventListener('click', () => {
                    // this.sidebar.classList.remove('invisible') FOUC Protection
                    this.sidebar.classList.toggle('offcanvas');
                });
            });
        }

        const atcButtons = document.querySelectorAll('.instant-atc');
        if (atcButtons) {
            super.forEachElements(atcButtons, (i, el) => {
                const atcId = el.getAttribute('data-product-id');

                el.addEventListener('click', (e) => {
                    e.preventDefault();

                    this.overlay.classList.remove('d-none');
                    parent.add(atcId, 1);
                });
            });
        }

        this.container.style.maxHeight = `${(window.innerWidth > 1024 && window.innerHeight > 900 ? 768 : window.innerHeight) - this.header.offsetHeight - this.footer.offsetHeight}px`;
        this.container.style.marginTop = `${this.header.offsetHeight}px`;

        window.addEventListener('resize', () => {
            this.container.style.maxHeight = `${(window.innerWidth > 1024 && window.innerHeight > 900 ? 768 : window.innerHeight) - this.header.offsetHeight - this.footer.offsetHeight}px`;
            this.container.style.marginTop = `${this.header.offsetHeight}px`;
        });

        this.overlay.classList.add('d-none');
    }

    update(itemId, quantity) {
        utils.api.cart.itemUpdate(itemId, quantity, (err, response) => {
            if (response.data.status === 'succeed') {
                this.refresh();
            } else {
                console.log(`Send the following to tech@organicstart.com for a gift:\n${err}`);
                this.swal({
                    title: 'Internal Error',
                    text: 'Sorry, please try again or contact support.',
                    type: 'error',
                });
            }
        });
    }

    remove(itemId) {
        utils.api.cart.itemRemove(itemId, (err, response) => {
            if (response.data.status === 'succeed') {
                this.refresh();
            } else {
                console.log(`Send the following to tech@organicstart.com for a gift:\n${err}`);
                this.swal({
                    title: 'Internal Error',
                    text: 'Sorry, please try again or contact support.',
                    type: 'error',
                });
            }
        });
    }

    removeFromCart(el) {
        const rfcId = el.getAttribute('data-product-id');
        this.overlay.classList.remove('d-none');
        this.remove(rfcId);
    }

    removeOneFromCart(el) {
        const rfcId = el.getAttribute('data-product-id');
        const rfcQty = el.getAttribute('data-product-quantity');
        this.overlay.classList.remove('d-none');
        this.update(rfcId, rfcQty - 1);
    }

    add(id, quantity) {
    // this.$overlay.show(); // ADD CART OVERLAY
        const data = new FormData();
        data.append('product_id', id);
        data.append('qty', quantity);
        utils.api.cart.itemAdd(data, (err) => {
            if (!err) {
                this.refresh();
                this.sidebar.classList.remove('offcanvas'); // FOUC Protection
            } else {
                console.log(`Send the following to tech@organicstart.com for a gift:\n${err}`);
                this.swal({
                    title: 'Internal Error',
                    text: 'Sorry, please try again or contact support.',
                    type: 'error',
                });
            }
        });
    }

    addOneToCart(el) {
        const rfcId = el.getAttribute('data-product-id');
        this.overlay.classList.remove('d-none');
        this.add(rfcId, 1);
    }

    refresh() {
        this.jQuery.get('/api/storefront/cart').then(data => {
            if (data.length > 0) {
                const cart = data[0];
                const products = cart.lineItems.physicalItems;

                let totalQuantity = 0;

                const html = this.parseData(products);

                totalQuantity += products.map((product) => product.quantity);

                // Pill Quantity Counter
                this.counter.innerHTML = totalQuantity;
                this.counter.classList.remove('invisible');
                this.counter.classList.add('animated', 'bounceIn');

                html.push(`<div class="row m-0 px-2 pt-2 pb-1">
            <div class="col-6 m-0">
              <strong class="text-uppercase text-gray-600">Subtotal</strong>
            </div>
            <div class="col-6 text-right m-0 text-gray-800">
              $${cart.baseAmount.toFixed(2)}
            </div>
          </div>
          <div class="row m-0 px-2 py-1">
            <div class="col-6 m-0">
              <strong class="text-uppercase text-gray-600">Shipping</strong>
            </div>
            <div class="col-6 text-right m-0 text-gray-800">
              FREE
            </div>
          </div>
          <div class="row m-0 px-2 py-1 d-none">
            <div class="col-6 m-0">
              <strong class="text-uppercase text-gray-600">Discounts</strong>
            </div>
            <div class="col-6 text-right m-0 text-gray-800">
              ${cart.discountAmount === 0 ? '<a href="#">ADD CODE</a>' : `$${cart.cartAmount.toFixed(2)}`}
            </div>
          </div>
          <div class="row m-0 px-2 pt-1 pb-2">
            <div class="col-6 m-0">
              <strong class="text-uppercase text-gray-600">Total</strong>
            </div>
            <div class="col-6 h6 text-right text-gray-800">
              $${cart.cartAmount.toFixed(2)}
            </div>
          </div>`);

                this.footer.classList.remove('invisible');

                this.content.innerHTML = html.join('');
            } else {
                this.counter.classList.add('invisible');
                this.footer.classList.add('invisible');
                this.content.innerHTML = '<div class="p-2"><img src="https://triad.imgix.net/os/i/basket.png?s=c28539ed8dcafa3533211257fc0bea16" alt="Empty Shopping Basket" class="ui medium image img-fluid mx-auto"><p class="text-center"><strong>Your shopping basket is empty.</strong></p></div>';
            }

            if (this.cartDate) {
                const d = new Date();
                const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                this.cartDate.innerHTML = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
            }

            this.overlay.classList.add('d-none');
        }).catch(err => console.log(err.message));
    }
}
