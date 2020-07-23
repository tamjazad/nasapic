var express = require('express');
var router = express.Router();

var https = require('https');

var image_url;
var explained;
var current_date;
var date_fields;
var final_datestring;

// GET request code modified from code from a twilio blog post
// link: https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html

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
    date_fields = current_date.split("-");
    final_datestring = date_fields[1] + "/" + date_fields[2] + "/" + date_fields[0];
    console.log(current_date.split("-"));
    console.log(final_datestring);
  });

}).on("error", (err) => {
  console.log("Error: " + err.message);
});


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', {
  title: "NASA's Astronomy Pic of the Day",
  picture_url: image_url,
  explanation: explained,
  today_date: final_datestring});
});

module.exports = router;
