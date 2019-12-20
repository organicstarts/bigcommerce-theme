const Helpers = require('./helpers');

const commonQueries = '&is_visible=true&include_fields=id,brand_id,name,reviews_rating_sum,price,sale_price,custom_url';
const productParse = data => {
    return {
        id: data.id,
        name: data.name,
        price: data.price,
        sale_price: data.sale_price ? Number(data.sale_price.toFixed(2)) : 0,
        brand: data.brand ? data.brand.name : null,
        brand_url: data.brand ? data.brand.custom_url.url : null,
        rating: data.reviews_rating_sum || 0,
        thumbnail: data.thumbnail.url_thumbnail || null,
        url: data.custom_url.url
    };
};

module.exports = {
    Subs: async () => {
        return await Helpers.Request('catalog/categories/tree').then(result => {
            var subcategories = [], tree = JSON.parse(result).data;
            tree.map(category => {
                category.children.length != 0 && category.children.map(async child => {
                    subcategories[child.id] = Helpers.Request('catalog/products?categories:in=' + child.id + commonQueries).then(result => {
                        var products = [], i = 0;
                        JSON.parse(result).data.map(product => {
                            products[i] = Helpers.Request(`catalog/products/${product.id}/images`).then(result => {
                                JSON.parse(result).data.map(image => {
                                    if(image.is_thumbnail) {
                                        product.thumbnail = image;
                                    }
                                });
                                if(product.brand_id != 0) {
                                    return Helpers.Request(`catalog/brands/${product.brand_id}`).then(result => {
                                        product.brand = JSON.parse(result).data;
                                        return productParse(product);
                                    });
                                } else {
                                    return productParse(product);
                                }
                            });
                            i++;
                        });
                        return Promise.all(products).then(result => {
                            return result;
                        });
                    });
                });
            });
            return Promise.all(subcategories).then(result => {
                return result;
            });
        });
    },
};