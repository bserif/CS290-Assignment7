var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 3000);

app.get('/', function(req,res){
	res.render('homepage');
})

app.get('/dataReturn',function(req,res){
  var namesAndValues = [];
  for (var p in req.query){
    namesAndValues.push({'name':p,'value':req.query[p]})
  }
  var context = {};
  context.dataList = namesAndValues;
  res.render('getDataReturn', context);
});


app.post('/dataReturn', function(req,res){
  var namesAndValues = [];
  for (var p in req.body){
    namesAndValues.push({'name':p,'value':req.body[p]})
  }
  var context = {};
  context.dataList = namesAndValues;
  res.render('postDataReturn', context);
});

app.use(function (req, res){
	res.status(404);
	res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.render('500');
});

app.listen(app.get('port'), function(){
  console.log('Express started on http://52.26.37.94:' + app.get('port') + '; press Ctrl-C to terminate.');
});