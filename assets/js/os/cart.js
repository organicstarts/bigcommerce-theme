import jQuery from 'jquery'; // TODO : REMOVE jQUERY
import swal from 'sweetalert2';
import utils from '@bigcommerce/stencil-utils';


const cart = document.getElementById('cart');
// const header = document.querySelector('.cart-top');
// const container = document.querySelector('.cart-contained');
const footer = document.getElementById('checkoutButtons');
const counter = document.getElementById('cartPill');
const content = document.getElementById('cartItems');
// const cartDate = document.getElementById('cart-date');

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
        products.map(product => items.push(`
            <tr>
                <th>
                    <a href="${product.url}">
                        <img src=${product.imageUrl} alt="${product.brand}: ${product.name}">
                    </a>
                </th>
                <td>
                    <a href="${product.url}">
                        <small>${product.brand}</small><br>
                        <strong>${product.name}</strong>
                    </a>
                    <div class="rfc">
                        <a href="#" data-product-id="${product.id}" onclick="window.removeFromCart(this);return false;"><small>REMOVE</small></a>
                    </div>
                </td>
            </tr>
            <tr>
                <td class="left">
                    <a class="qty minus" href="#" onclick="window.removeOneFromCart(this);return false;" data-product-id="${product.id}" data-product-quantity="${product.quantity}">
                        -
                    </a>
                    &nbsp;${product.quantity}&nbsp;
                    <a class="qty add" href="#" onclick="window.addOneToCart(this);return false;" data-product-id="${product.productId}" data-product-quantity="${product.quantity}">
                        +
                    </a>
                </td>
                <td class="right">
                    ${product.quantity} &times; <strong>$${product.salePrice}</strong>
                </td>
            </tr>
        `));
        return items;
    };
    const refresh = () => {
        jQuery.get('/api/storefront/cart').then(data => {
            if (data.length > 0) {
                const cartData = data[0];
                const products = cartData.lineItems.physicalItems;

                let totalQuantity = 0;

                const html = parseData(products);

                totalQuantity += products.map((product) => product.quantity);

                // Pill Quantity Counter
                // counter.innerHTML = totalQuantity;
                // counter.classList.remove('invisible');
                // counter.classList.add('animated', 'bounceIn');

                html.push(`
                    <tr>
                        <td class="left">
                            Subtotal
                        </td>
                        <td class="right">
                            $${cartData.baseAmount.toFixed(2)}
                        </td>
                    </tr>
                    <tr>
                        <td class="left">
                            Shipping
                        </td>
                        <td class="right">
                            ${cartData.baseAmount > 25 ? 'FREE' : '$5.00'}
                        </td>
                    </tr>
                    <tr>
                        <td class="left">
                            Discounts
                        </td>
                        <td class="right">
                            ${cartData.discountAmount === 0 ? '<small>Add During Checkout</small>' : `$${cartData.cartAmount.toFixed(2)}`}
                        </td>
                    </tr>
                    <tr>
                        <td class="left">
                            <strong>Total</strong>
                        </td>
                        <td class="right">
                            $${(cartData.cartAmount + (cartData.baseAmount > 25 ? 0 : 5)).toFixed(2)}
                        </td>
                    </tr>
                `);

                footer.classList.remove('hidden');

                content.innerHTML = html.join('');
            } else {
                counter.classList.add('hidden');
                footer.classList.add('hidden');
                content.innerHTML = `
                    <tr class="basket">
                        <td>
                            <img src="https://triad.imgix.net/os/i/basket.png?w=288" alt="Empty Shopping Basket">
                            <p class="text-center"><strong>Your shopping basket is empty.</strong></p>
                        </td>
                    </tr>
                `;
            }

            // if (cartDate) {
            //     const d = new Date();
            //     const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
            //     cartDate.innerHTML = `${d.getDate()} ${months[d.getMonth()]} ${d.getFullYear()}`;
            // }

            cart.classList.remove('loading');
        }).catch(err => console.log(err.message));
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
        const data = new FormData();
        data.append('product_id', id);
        data.append('qty', quantity);
        utils.api.cart.itemAdd(data, (err) => {
            if (!err) {
                cart.classList.add('active');
                document.body.classList.add('unscrollable');
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

    refresh();

    if (cartButtons) {
        forEachElements(cartButtons, (i, el) => {
            el.addEventListener('click', () => {
                // sidebar.classList.remove('invisible') FOUC Protection
                cart.classList.toggle('active');
                document.body.classList.toggle('unscrollable');
            });
        });
    }
    if (atcButtons) {
        forEachElements(atcButtons, (i, el) => {
            const atcId = el.getAttribute('data-product-id');

            el.addEventListener('click', (e) => {
                e.preventDefault();

                cart.classList.add('loading');
                add(atcId, 1);
            });
        });
    }

    // container.style.maxHeight = `${(window.innerWidth > 1024 && window.innerHeight > 900 ? 768 : window.innerHeight) - header.offsetHeight - footer.offsetHeight}px`;
    // container.style.marginTop = `${header.offsetHeight}px`;

    // window.addEventListener('resize', () => {
    //     container.style.maxHeight = `${(window.innerWidth > 1024 && window.innerHeight > 900 ? 768 : window.innerHeight) - header.offsetHeight - footer.offsetHeight}px`;
    //     container.style.marginTop = `${header.offsetHeight}px`;
    // });

    cart.classList.remove('loading');

    if (typeof window !== undefined) {
        window.removeFromCart = el => {
            const rfcId = el.getAttribute('data-product-id');
            cart.classList.add('loading');
            remove(rfcId);
        };
        window.removeOneFromCart = el => {
            const rfcId = el.getAttribute('data-product-id');
            const rfcQty = el.getAttribute('data-product-quantity');
            cart.classList.add('loading');
            update(rfcId, rfcQty - 1);
        };
        window.addOneToCart = el => {
            const rfcId = el.getAttribute('data-product-id');
            cart.classList.add('loading');
            add(rfcId, 1);
        };
    }
}
