import Swiper from 'swiper';

const swiperCards = (json, elem, inv) => {
    const mobiles = window.matchMedia('(max-width: 769px)');
    let out = '';
    let i = 0;
    for (i = 0; i < json.length; i++) {
        const product = json[i];
        out += `
            <div class="swiper-slide"><div class="card--product">
                <a class="card--product-image" href="${product.url}">
                    <img class="lazyload" data-sizes="auto" src="${product.thumbnail}" alt="${product.alt || product.name}" ${product.alt ? `title="${product.name}" ` : ''}sizes="144px">
                </a>
                <div class="card--product-content">
                    <h6 data-test-info-type="brandName">
                        <a href="${product.brand_url}">
                            ${product.brand}
                        </a>
                    </h6>
                    <h5>
                        <a href="${product.url}">
                            ${product.name}
                        </a>
                    </h5>
                </div>
                <div class="card--product-flex">
                    <div class="card--product-rating" data-test-info-type="productRating">
                        <div class="product-rating_stars" style="--rating: ${product.rating};" aria-label="Rating of this product is ${product.rating} out of 5."></div>
                    </div>
                    <div class="card--product-price" data-test-info-type="price">
                        ${
                            product.sale_price !== 0 && product.sale_price < product.price
                            ?
                            `<div class="text-danger small price-section price-section--withoutTax non-sale-price--withoutTax">
                                <span data-product-non-sale-price-without-tax="" class="price price--non-sale">
                                    $${product.price.toFixed(2)}
                                </span>
                            </div>`
                            :
                            ''
                        }
                        <div class="price-section price-section--withoutTax">
                            <span data-product-price-without-tax="" class="price price--withoutTax">$${product.sale_price !== 0 && product.sale_price < product.price ? product.sale_price.toFixed(2) : product.price.toFixed(2)}</span>
                        </div>
                    </div>
                    ${
                        (inv[product.id] && ((inv[product.id].inventory_level > 0) || (inv[product.id].inventory_tracking === 'none'))) ? (
                            `<a href="/cart.php?action=add&product_id=${product.id}" class="card--product-btn atc instant-atc" data-product-id="${product.id}" onclick="window.addOneToCart(this);return false;" data-product-id="${product.id}" data-product-quantity="1">
                                Add to Cart
                            </a>`
                        ) : (
                            `<a href="${product.url}" class="card--product-btn oos">
                                Out of Stock
                            </a>`
                        )
                    }
                </div>
            </div></div>
        `;
    }
    document.querySelector(`#${elem} > .swiper-container > .swiper-wrapper`).innerHTML = out;
    const swipers = (x) => {
        if (x.matches) {
            new Swiper(`#${elem} .swiper-container`, {
                slidesPerView: 1,
                spaceBetween: 16,
                breakpoints: {
                    320: {
                        slidesPerView: 2,
                    },
                    480: {
                        slidesPerView: 3,
                    },
                    640: {
                        slidesPerView: 4,
                    },
                    800: {
                        slidesPerView: 5,
                    },
                },
                watchSlidesVisibility: true,
            });
        }
    };
    swipers(mobiles);
    mobiles.addListener(swipers);
};

const loadSwiperCards = (slug, elem, inv) => {
    const xmlhttp = new XMLHttpRequest();
    const url = `https://apt-reason-149015.firebaseapp.com/${slug}`;
    xmlhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            swiperCards(JSON.parse(this.responseText), elem, inv);
        }
    };
    xmlhttp.open('GET', url, true);
    xmlhttp.send();
};

export default loadSwiperCards;
