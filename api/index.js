const path = require('path'),
        fs = require('fs'),
        bigCommerce = require('bigcommerce');

const resolve = dir => path.join(__dirname, "./", dir);

const App = async () => {
    let diapers = await bigCommerce.Products.Diapers();
    fs.writeFileSync(resolve('public/diapers.json'), JSON.stringify(diapers));
    console.log('Diapers written successfully.');
    let puree = await bigCommerce.Products.Puree();
    fs.writeFileSync(resolve('public/puree.json'), JSON.stringify(puree));
    console.log('Puree written successfully.');
    let subcategories = await bigCommerce.Categories.Subs();
    subcategories.map((category, i) => {
        if(category != null) {
            fs.writeFileSync(resolve('public/categories/' + i + '.json'), JSON.stringify(category));
            console.log('Category ' +  + ' successfully.');
        }
    })
    console.log(subcategories);
};

App();

// exports.inventory = functions.https.onRequest(async (req, res) => {
// });


// req('catalog/products?categories:in=142' + commonQueries).then(result => {
//     var products = [], i = 0;
//     JSON.parse(result).data.map(product => {
//         products[i] = req(`catalog/products/${product.id}/images`).then(result => {
//             JSON.parse(result).data.map(image => {
//                 if(image.is_thumbnail) {
//                     product.thumbnail = image;
//                 }
//             });
//             return req(`catalog/brands/${product.brand_id}`).then(result => {
//                 product.brand = JSON.parse(result).data;
//                 return productParse(product);
//             });
//         });
//         i++;
//     });
//     return Promise.all(products).then(result => {
//     });
// });

// req('catalog/products?categories:in=172,34' + commonQueries).then(result => {
//     var products = [], i = 0;
//     JSON.parse(result).data.map(product => {
//         products[i] = req(`catalog/products/${product.id}/images`).then(result => {
//             JSON.parse(result).data.map(image => {
//                 if(image.is_thumbnail) {
//                     product.thumbnail = image;
//                 }
//             });
//             return req(`catalog/brands/${product.brand_id}`).then(result => {
//                 product.brand = JSON.parse(result).data;
//                 return productParse(product);
//             });
//         });
//         i++;
//     });
//     return Promise.all(products).then(result => {
//         fs.writeFileSync(resolve('../public/home/puree.json'), JSON.stringify(result));
//         console.log('Puree written successfully.');
//     });
// });

// // .then((products) => {
// //     console.log('Got the Diaper Products.');
// //     var diapers = [];
// //     var products = JSON.parse(products);
// //     products.data.map((product, i) => {
// //         req.get(
// //             prefix(`catalog/brands/${product.brand_id}`)
// //         ).then((brand) =>{
// //             console.log(`Got the brand for product ${product.id}.`);
// //             const data = {
// //                 id: product.id,
// //                 name: product.name,
// //                 brand: JSON.parse(brand).data.name,
// //                 rating: product.reviews_rating_sum,
// //                 url: product.custom_url.url
// //             };
// //             console.log(`Pushed product ${product.id} into diapers.`);
// //         }).catch(function (err) {
// //             console.error(err);
// //         });
// //         console.log(data);
// //         diapers.push(data);
// //     });
// //     fs.writeFileSync(resolve('../public/home/diapers.json'), JSON.stringify(diapers));
// // }).catch(function (err) {
// //     console.error(err);
// // });
// // , (error, response, body) => {
// //     if(!error) {
// //     } else {
// //         return console.error(error);
// //     }
// // });
// // console.log('Diapers successfully exported.');
// // request({
// //     url: prefix('catalog/products?categories:in=142&is_visible=true&include_fields=id,brand_id,name,reviews_rating_sum,price,custom_url'), headers: commonHeaders
// // }, (error, response, body) => {
// //     console.log(error);
// //     console.log(response);
// //     console.log(body);
// //     fs.writeFileSync(resolve('../public/home/diapers.json'), body);
// // });