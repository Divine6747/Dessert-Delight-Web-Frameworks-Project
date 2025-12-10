const mongoose = require('mongoose');
const About = mongoose.model('About');
const request = require('request');

const apiOptions = {
  server: 'http://localhost:3000'
};
if (process.env.NODE_ENV === 'production') {
  apiOptions.server = 'https://helloexpree-do-dessert-delight-web.onrender.com';
}

// Helper function to render the about page
const renderAboutPage = (req, res, aboutData) => {
  res.render('dessert-text', {
    title: 'About Dessert Delight',
    about: aboutData
  });
};

// GETTING all about data and rendering it on the page
const aboutPage = (req, res) => {
  const path = '/api/about';
  const requestOptions = {
    url: apiOptions.server + path,
    method: 'GET',
    json: {}
  };

  request(requestOptions, (err, response, body) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error fetching about data');
    } else if (response.statusCode === 200) {
      renderAboutPage(req, res, body);
    } else {
      console.error(`API response: ${response.statusCode}`);
      res.status(response.statusCode).send('Error fetching about data');
    }
  });
};

module.exports = { aboutPage };
