var express = require('express');
var router = express.Router();

var https = require('https');

var image_url;
var explained;

https.get('https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY', (resp) => {
  let data = '';

  // A chunk of data has been recieved.
  resp.on('data', (chunk) => {
    data += chunk;
  });

  // The whole response has been received. Print out the result.
  resp.on('end', () => {
    console.log(JSON.parse(data));
    image_url = JSON.parse(data).url;
    explained = JSON.parse(data).explanation;
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express',
  picture_url: image_url, explanation: explained});
});

module.exports = router;
