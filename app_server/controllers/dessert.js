const request = require('request');

const apiOptions = {
    server: 'http://localhost:3000'
};

if (process.env.NODE_ENV === 'production') {
    apiOptions.server = 'https://web-frameworks-project-xcuw.onrender.com';
}

const renderDessertList = function (req, res, responseBody) {
    res.render('dessert-info', {
        title: 'Simple Dessert Recipes',
        desserts: [],
        message: ''
    });
};
const dessertList = function (req, res) {
    const path = '/api/dessert';

    const requestOptions = {
        url: apiOptions.server + path,
        method: 'GET',
        json: {}
    };

    request(requestOptions, (err, response, body) => {
        if (err) {
            console.error('API error:', err);
            return res.status(500).send('API request failed');
        }
        if (response.statusCode !== 200) {
            return res.status(response.statusCode).send('Error from API');
        }

        renderDessertList(req, res, body);
    });
};


const renderDessertDetails = function (req, res, responseBody) {
    res.render('dessert-details', {
        title: responseBody.name,
        dessert: responseBody
    });
};

const dessertReadOne = function (req, res) {
    const path = `/api/dessert/${req.params.id}`;

    const requestOptions = {
        url: apiOptions.server + path,
        method: 'GET',
        json: {}
    };

    request(requestOptions, (err, response, body) => {
        if (err) {
            console.error('API error:', err);
            return res.status(500).send('API request failed');
        }
        if (response.statusCode !== 200) {
            return res.status(response.statusCode).send('Error from API');
        }

        renderDessertDetails(req, res, body);
    });
};

module.exports = {
    dessertList,
    dessertReadOne
};
