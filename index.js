const express = require('express');
const path = require('path');
const PORT = process.env.PORT || 5000 ;

var exphbs  = require('express-handlebars');


var app = express();

const knex = require('./db/knex');


var fortune = require('./lib/fortune');

app.engine('handlebars', 
           exphbs({defaultLayout: 'main'}));

app.set('view engine', 'handlebars');

app.get('/', (req, res) => res.render('home'));

//login route
app.get('/login', (req, res) => res.render('login', {csrf: 'abc'}));

//body.parse
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended : true}));

app.post('/process', function(req,res){
  console.log('formulario:'+ req.query.form);
  console.log('nombre'+ req.body.name);
  console.log('nombre'+ req.body.email);
});



//usa modulos de la libreria fortune.js
app.get('/about', (req, res) => 
          res.render('about', {fortune: fortune.getFortune() })
       );

//archivos estáticos
app.use(express.static(path.join(__dirname,'/public')));


app.get("/user", function (req,res){
	
	knex('usuarios')
	.select()
	.then( objCollectUsers => {res.render("user/index", {objUsers: objCollectUsers});});

});


app.listen(PORT, () => console.log(`Listening on ${ PORT }`));



















