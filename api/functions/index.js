const functions = require('firebase-functions'),
        bigCommerce = require('bigcommerce');

exports.inventory = functions.https.onRequest(async (req, res) => {
    let x = await bigCommerce.Products.Inventory();
    res.set('Access-Control-Allow-Origin', "*");
    res.set('Access-Control-Allow-Methods', 'GET');
    res.set('Cache-Control', 'public, max-age=1800, s-maxage=1800');
    res.status(200).send(JSON.stringify(x));
});