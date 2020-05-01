var express = require('express');
var router = express.Router();

var https = require('https');

var image_url;
var explained;
var current_date;

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
    current_date = JSON.parse(data).date;
    console.log(current_date)
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
  title: "NASA's Pic of the Day",
  picture_url: image_url,
  explanation: explained,
  today_date: current_date});
});

module.exports = router;
