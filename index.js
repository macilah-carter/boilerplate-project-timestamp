// index.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/:date?",(req, res)=> {
  const dateParam = req.params.date
  let now;
  if(!dateParam){
    now = new Date()

  }else{
    if(!isNaN(dateParam)){
      now = new Date(parseInt(dateParam))
    }
    else {
      now = new Date(dateParam)
    }
  }
  if(now.toString() === "Invalid Date"){
    return res.json({error: "Invalid Date"})
  }
  const unix = now.getTime();
  const utc = now.toUTCString()
  res.json({unix: unix, utc: utc})
});

app.get("/api/whoami",(req,res) => {
  const ip = req.ip
  const language = req.language
  const software = req.software

  return res.json({ip: ip, language: language, software: software})
});

// Listen on port set in environment variable or default to 3000
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
