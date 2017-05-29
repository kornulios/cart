var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var News = require('./model/news');

var app = express();
var router = express.Router();

var port = process.env.API_PORT || 3001;

//db config
mongoose.connect('mongodb://admin:admin@ds151451.mlab.com:51451/lux-cart');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res, next) {
 res.setHeader('Access-Control-Allow-Origin', '*');
 res.setHeader('Access-Control-Allow-Credentials', 'true');
 res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
 res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
//and remove cacheing so we get the most recent comments
 res.setHeader('Cache-Control', 'no-cache');
 next();
});

router.get('/', function(req,res) {
  res.json({ message: 'API Initialized' });
});

router.route('/news')
.get(function(req,res) {
  News.find(function(err, news) {
    if (err) res.send(err);
    res.json(news);
  }).sort({$natural:-1});
})
.post(function(req,res) {
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
.put(function(req,res) {
  News.findById(req.params.news_id, function(err, news){
    if (err) res.send(err);
    (req.body.author) ? news.author = req.body.author : null;
    (req.body.text) ? news.text = req.body.text : null;
    (req.body.title) ? news.title = req.body.title : null;
    news.save(function(err) {
      if (err) res.send(res);
      res.json({ message: 'News updated' });
    });
  });
})
.delete(function(req,res) {
  News.remove({ _id: req.params.news_id }, function(err, news){
    if (err) res.send(err);
    res.json({ message: 'News have been deleted' });
  });
});

//comment modified
app.use('/api', router);

app.listen(port, function() { 
  console.log('api running on port ' + port); 
});

//mode comms