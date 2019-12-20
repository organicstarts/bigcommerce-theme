require('dotenv').config();
const request = require('request-promise');

const Prefix = slug => `${process.env.BC_URL}/${slug}`;

module.exports = {
    Fetch: async url => {
        return await request(Prefix(url), {
            headers: {
                'X-Auth-Client': process.env.BC_ID,
                'X-Auth-Token': process.env.BC_ACCESS
            }
        }).then(result => JSON.parse(result).data);
    },
    Request: async url => {
        return await request(Prefix(url), {
            headers: {
                'X-Auth-Client': process.env.BC_ID,
                'X-Auth-Token': process.env.BC_ACCESS
            }
        });
    }
};