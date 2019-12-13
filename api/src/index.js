require('dotenv').config();

const path = require('path'),
        fs = require('fs'),
        request = require('request-promise');

const resolve = dir => path.join(__dirname, "./", dir),
        prefix = slug => `${process.env.BC_URL}/${slug}`;

// Get Specific Categories
// request({
//     url: prefix('catalog/categories?name=Diapers'), headers: commonHeaders
// }, (error, response, body) => {
//     console.log(error);
//     console.log(response);
//     console.log(body);
//     fs.writeFileSync(resolve('../private/catalog/categories.json'), body);
// });

const get = url => {
    return request(prefix(url), {
        headers: {
            'X-Auth-Client': process.env.BC_ID,
            'X-Auth-Token': process.env.BC_ACCESS
        }
    }).then(result => {
        return JSON.parse(result).data;
    });
}
const req = url => {
    return request(prefix(url), {
        headers: {
            'X-Auth-Client': process.env.BC_ID,
            'X-Auth-Token': process.env.BC_ACCESS
        }
    });
}

req('catalog/products?categories:in=142&is_visible=true&include_fields=id,brand_id,name,reviews_rating_sum,price,custom_url').then(result => {
    var products = [], i = 0;
    JSON.parse(result).data.map(product => {
        products[i] = req(`catalog/products/${product.id}/images`).then(result => {
            JSON.parse(result).data.map(image => {
                if(image.is_thumbnail) {
                    product.thumbnail = image;
                }
            });
            return req(`catalog/brands/${product.brand_id}`).then(result => {
                product.brand = JSON.parse(result).data;
                return {
                    id: product.id,
                    name: product.name,
                    brand: product.brand.name || null,
                    brand_url: product.brand.custom_url.url || null,
                    rating: product.reviews_rating_sum || 0,
                    thumbnail: product.thumbnail.url_thumbnail || null,
                    url: product.custom_url.url
                };
            });
        });
        i++;
    });
    return Promise.all(products).then(result => {
        fs.writeFileSync(resolve('../public/home/diapers.json'), JSON.stringify(result));
    });
});

req('catalog/products?categories:in=172,34&is_visible=true&include_fields=id,brand_id,name,reviews_rating_sum,price,custom_url').then(result => {
    var products = [], i = 0;
    JSON.parse(result).data.map(product => {
        products[i] = req(`catalog/products/${product.id}/images`).then(result => {
            JSON.parse(result).data.map(image => {
                if(image.is_thumbnail) {
                    product.thumbnail = image;
                }
            });
            return req(`catalog/brands/${product.brand_id}`).then(result => {
                product.brand = JSON.parse(result).data;
                return {
                    id: product.id,
                    name: product.name,
                    brand: product.brand.name || null,
                    brand_url: product.brand.custom_url.url || null,
                    rating: product.reviews_rating_sum || 0,
                    thumbnail: product.thumbnail.url_thumbnail || null,
                    url: product.custom_url.url
                };
            });
        });
        i++;
    });
    return Promise.all(products).then(result => {
        fs.writeFileSync(resolve('../public/home/puree.json'), JSON.stringify(result));
    });
});

// .then((products) => {
//     console.log('Got the Diaper Products.');
//     var diapers = [];
//     var products = JSON.parse(products);
//     products.data.map((product, i) => {
//         req.get(
//             prefix(`catalog/brands/${product.brand_id}`)
//         ).then((brand) =>{
//             console.log(`Got the brand for product ${product.id}.`);
//             const data = {
//                 id: product.id,
//                 name: product.name,
//                 brand: JSON.parse(brand).data.name,
//                 rating: product.reviews_rating_sum,
//                 url: product.custom_url.url
//             };
//             console.log(`Pushed product ${product.id} into diapers.`);
//         }).catch(function (err) {
//             console.error(err);
//         });
//         console.log(data);
//         diapers.push(data);
//     });
//     fs.writeFileSync(resolve('../public/home/diapers.json'), JSON.stringify(diapers));
// }).catch(function (err) {
//     console.error(err);
// });
// , (error, response, body) => {
//     if(!error) {
//     } else {
//         return console.error(error);
//     }
// });
// console.log('Diapers successfully exported.');
// request({
//     url: prefix('catalog/products?categories:in=142&is_visible=true&include_fields=id,brand_id,name,reviews_rating_sum,price,custom_url'), headers: commonHeaders
// }, (error, response, body) => {
//     console.log(error);
//     console.log(response);
//     console.log(body);
//     fs.writeFileSync(resolve('../public/home/diapers.json'), body);
// });