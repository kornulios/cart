
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var News = require('./model/news');
var Drivers = require('./model/drivers');
var Races = require('./model/races');

var app = express();
var router = express.Router();

var port = process.env.API_PORT || 3001;

//app specific
const POINTS = [10, 6, 4, 3, 2, 1];

//console.log(process.env.NODE_ENV);

//db config
mongoose.connect('mongodb://admin:admin@ds151451.mlab.com:51451/lux-cart');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
  //and remove cacheing so we get the most recent comments
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('build'));
}

router.get('/', function (req, res) {
  res.json({ message: 'API Initialized' });
});

router.route('/news')
  .get(function (req, res) {
    News.find(function (err, news) {
      if (err) res.send(err);
      res.json(news);
    }).sort({ $natural: -1 });
  })
  .post(function (req, res) {
    var news = new News();
    news.author = req.body.author;
    news.title = req.body.title;
    news.text = req.body.text;

    news.save(err => {
      if (err) res.send(err);
      res.json({ message: 'News successfully added!' });
    });
  });

router.route('/news/:news_id')
  .put(function (req, res) {
    News.findById(req.params.news_id, function (err, news) {
      if (err) res.send(err);
      (req.body.author) ? news.author = req.body.author : null;
      (req.body.text) ? news.text = req.body.text : null;
      (req.body.title) ? news.title = req.body.title : null;
      news.save(function (err) {
        if (err) res.send(err);
        res.json({ message: 'News updated' });
      });
    });
  })
  .delete(function (req, res) {
    News.remove({ _id: req.params.news_id }, function (err, news) {
      if (err) res.send(err);
      res.json({ message: 'News have been deleted' });
    });
  });

router.route('/drivers').get(
  (req, res) => {
    Drivers.find((err, drivers) => {
      if (err) res.send(err);
      Races.find((err, races) => {
        var raceResults = races.filter((race, i) => {
          if (race.results.length > 0) return true;
          return false;
        });

        //prepare drivers points
        drivers.forEach((driver, i) => {
          var pt = 0;
          var pp = [];
          var id = driver._id.toString();
          for (var j = 0; j < raceResults.length; j++) {
            if (raceResults[j].results.indexOf(id) > -1) {
              pt += (POINTS[raceResults[j].results.indexOf(id)] ? POINTS[raceResults[j].results.indexOf(id)] : 0);
              pp.push((POINTS[raceResults[j].results.indexOf(id)] ? POINTS[raceResults[j].results.indexOf(id)] : 0));
            } else {
              pp.push('-');
            }
          }
          driver.total = pt;
          driver.points = pp;
        });

        drivers.sort((a, b) => {
          return b.total - a.total;
        });

        res.json(drivers);

      });
    });
  }
).post(
  (req, res) => {
    let newDriver = new Drivers();
    newDriver.name = req.body.name;
    newDriver.save(err => {
      if (err) res.send(err);
      res.json({ message: 'New driver added' });
    });
  });

router.route('/drivers/:driver_id').delete(
  (req, res) => {
    Drivers.remove({ _id: req.params.driver_id }, (err, drivers) => {
      if (err) res.send(err);
      res.json({ message: 'Driver has been deleted' })
    });
  }
);

router.route('/races').get(
  (req, res) => {
    Races.find((err, races) => {
      if (err) res.send(err);
      races.sort((a, b) => {
        a = new Date(a.date);
        b = new Date(b.date);
        return a>b ? -1 : a<b ? 1 : 0;
      })
      res.json(races);
    });
  }
);

router.route('/races/:race_id').get(
  (req, res) => {
    Races.find({ _id: req.params.race_id }, (err, races) => {
      if (err) res.send(err);
      res.json(races);
    });
  }
);


//comment modified
app.use('/api', router);

app.listen(port, function () {
  console.log('api running on port ' + port);
});

//mode comms