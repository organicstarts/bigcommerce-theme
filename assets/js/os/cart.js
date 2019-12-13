import jQuery from 'jquery'; // TODO : REMOVE jQUERY
import utils from '@bigcommerce/stencil-utils';


const overlay = document.getElementById('cartLoader');
const sidebar = document.getElementById('cartMenu');
const header = document.querySelector('.cart-top');
const container = document.querySelector('.cart-contained');
const footer = document.querySelector('.cart-bottom');
const counter = document.getElementById('cartPill');
const content = document.getElementById('cartItems');
const cartDate = document.getElementById('cart-date');

const cartButtons = document.querySelectorAll('.toggle-cart');
const atcButtons = document.querySelectorAll('.instant-atc');

const forEachElements = (array, callback, scope) => {
    for (let i = 0; i < array.length; i++) {
        callback.call(scope, i, array[i]);
    }
};

export default function () {
    const parseData = products => {
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
                    <a href="#" class="link-unstyled rfc" data-product-id="${product.id}" onclick="window.removeFromCart(this);return false;"><small>REMOVE</small></a>
                    </div>
                    <div class="col-6 text-right m-0">
                    <a href="#" class="ui mini button p-1" onclick="window.removeOneFromCart(this);return false;" data-product-id="${product.id}" data-product-quantity="${product.quantity}">&#x2212;</a>&nbsp;${product.quantity}&nbsp;<a href="#" class="ui mini button p-1" onclick="window.addOneToCart(this);return false;" data-product-id="${product.productId}" data-product-quantity="${product.quantity}">&#x2b;</a> <small>&times;</small> <strong>$${product.salePrice}</strong>
                    </div>
                </div>
                </div>
            </div>
            </div>`));
        return items;
    };
    const update = (itemId, quantity) => {
        utils.api.cart.itemUpdate(itemId, quantity, (err, response) => {
            if (response.data.status === 'succeed') {
                refresh();
            } else {
                console.log(`Send the following to tech@organicstart.com for a gift:\n${err}`);
                swal({
                    title: 'Internal Error',
                    text: 'Sorry, please try again or contact support.',
                    type: 'error',
                });
            }
        });
    };
    const remove = itemId => {
        utils.api.cart.itemRemove(itemId, (err, response) => {
            if (response.data.status === 'succeed') {
                refresh();
            } else {
                console.log(`Send the following to tech@organicstart.com for a gift:\n${err}`);
                swal({
                    title: 'Internal Error',
                    text: 'Sorry, please try again or contact support.',
                    type: 'error',
                });
            }
        });
    };
    const add = (id, quantity) => {
    // $overlay.show(); // ADD CART OVERLAY
        const data = new FormData();
        data.append('product_id', id);
        data.append('qty', quantity);
        utils.api.cart.itemAdd(data, (err) => {
            if (!err) {
                refresh();
                sidebar.classList.remove('offcanvas'); // FOUC Protection
            } else {
                console.log(`Send the following to tech@organicstart.com for a gift:\n${err}`);
                swal({
                    title: 'Internal Error',
                    text: 'Sorry, please try again or contact support.',
                    type: 'error',
                });
            }
        });
    };
    const refresh = () => {
        jQuery.get('/api/storefront/cart').then(data => {
            if (data.length > 0) {
                const cart = data[0];
                const products = cart.lineItems.physicalItems;

                let totalQuantity = 0;

                const html = parseData(products);

                totalQuantity += products.map((product) => product.quantity);

                // Pill Quantity Counter
                counter.innerHTML = totalQuantity;
                counter.classList.remove('invisible');
                counter.classList.add('animated', 'bounceIn');

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

                footer.classList.remove('invisible');

                content.innerHTML = html.join('');
            } else {
                counter.classList.add('invisible');
                footer.classList.add('invisible');
                content.innerHTML = '<div class="p-2"><img src="https://triad.imgix.net/os/i/basket.png?s=c28539ed8dcafa3533211257fc0bea16" alt="Empty Shopping Basket" class="ui medium image img-fluid mx-auto"><p class="text-center"><strong>Your shopping basket is empty.</strong></p></div>';
            }

            if (cartDate) {
                const d = new Date();
                const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                cartDate.innerHTML = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
            }

            overlay.classList.add('d-none');
        }).catch(err => console.log(err.message));
    };

    refresh();

    if (cartButtons) {
        forEachElements(cartButtons, (i, el) => {
            el.addEventListener('click', () => {
                // sidebar.classList.remove('invisible') FOUC Protection
                sidebar.classList.toggle('offcanvas');
            });
        });
    }
    if (atcButtons) {
        forEachElements(atcButtons, (i, el) => {
            const atcId = el.getAttribute('data-product-id');

            el.addEventListener('click', (e) => {
                e.preventDefault();

                overlay.classList.remove('d-none');
                add(atcId, 1);
            });
        });
    }

    container.style.maxHeight = `${(window.innerWidth > 1024 && window.innerHeight > 900 ? 768 : window.innerHeight) - header.offsetHeight - footer.offsetHeight}px`;
    container.style.marginTop = `${header.offsetHeight}px`;

    window.addEventListener('resize', () => {
        container.style.maxHeight = `${(window.innerWidth > 1024 && window.innerHeight > 900 ? 768 : window.innerHeight) - header.offsetHeight - footer.offsetHeight}px`;
        container.style.marginTop = `${header.offsetHeight}px`;
    });

    overlay.classList.add('d-none');

    if (typeof window !== "undefined") {
        window.removeFromCart = el => {
            const rfcId = el.getAttribute('data-product-id');
            overlay.classList.remove('d-none');
            remove(rfcId);
        };
        window.removeOneFromCart = el => {
            const rfcId = el.getAttribute('data-product-id');
            const rfcQty = el.getAttribute('data-product-quantity');
            overlay.classList.remove('d-none');
            update(rfcId, rfcQty - 1);
        };
        window.addOneToCart = el => {
            const rfcId = el.getAttribute('data-product-id');
            overlay.classList.remove('d-none');
            add(rfcId, 1);
        };
    }
}