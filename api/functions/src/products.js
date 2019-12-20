const Helpers = require('./helpers');

const commonQueries = '&is_visible=true&include_fields=id,brand_id,name,reviews_rating_sum,price,sale_price,custom_url';
const productParse = data => {
    return {
        id: data.id,
        name: data.name,
        price: data.price,
        sale_price: data.sale_price ? Number(data.sale_price.toFixed(2)) : 0,
        brand: data.brand.name || null,
        brand_url: data.brand.custom_url.url || null,
        rating: data.reviews_rating_sum || 0,
        thumbnail: data.thumbnail.url_thumbnail || null,
        url: data.custom_url.url
    };
};

module.exports = {
    Inventory: async () => {
        return await Helpers.Request('catalog/products?is_visible=true&include_fields=sku,bin_picking_number,inventory_level,inventory_tracking').then(result => {
            var products = [], pagination = JSON.parse(result).meta.pagination;
            for (i = 0; i <= pagination.total_pages; i++) {
                products[i] = Helpers.Request('catalog/products?is_visible=true&include_fields=sku,bin_picking_number,inventory_level,inventory_tracking&page=' + i).then(result => {
                    return JSON.parse(result).data;
                });
            }
            return Promise.all(products).then(result => {
                var exporting = [];
                result.map(each => {
                    each.map(next => {
                        exporting[next.id] = next;
                    });
                });
                return exporting;
            });
        });
    },
    Diapers: async () => {
        return await Helpers.Request('catalog/products?categories:in=142' + commonQueries).then(result => {
            var products = [], i = 0;
            JSON.parse(result).data.map(product => {
                products[i] = Helpers.Request(`catalog/products/${product.id}/images`).then(result => {
                    JSON.parse(result).data.map(image => {
                        if(image.is_thumbnail) {
                            product.thumbnail = image;
                        }
                    });
                    return Helpers.Request(`catalog/brands/${product.brand_id}`).then(result => {
                        product.brand = JSON.parse(result).data;
                        return productParse(product);
                    });
                });
                i++;
            });
            return Promise.all(products).then(result => {
                return result;
            });
        });
    },
    Puree: async () => {
        return await Helpers.Request('catalog/products?categories:in=172,34' + commonQueries).then(result => {
            var products = [], i = 0;
            JSON.parse(result).data.map(product => {
                products[i] = Helpers.Request(`catalog/products/${product.id}/images`).then(result => {
                    JSON.parse(result).data.map(image => {
                        if(image.is_thumbnail) {
                            product.thumbnail = image;
                        }
                    });
                    return Helpers.Request(`catalog/brands/${product.brand_id}`).then(result => {
                        product.brand = JSON.parse(result).data;
                        return productParse(product);
                    });
                });
                i++;
            });
            return Promise.all(products).then(result => {
                return result;
            });
        });
    }
};