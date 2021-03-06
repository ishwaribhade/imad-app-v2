var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool=require('pg').Pool;
var crypto=require('crypto');
var config={
    username:'ishwaribhade',
    database:'ishwaribhade',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password: process.env.DB_PASSWORD
    
    
};

var app = express();
app.use(morgan('combined'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function hash(input,salt) {
    var hashed  = crypto.pbkdf2Sync(input, salt, 100000, 512, 'sha512');
    return hashed.toString('hex');
}

app.get('/hash/:input',function(req,res){
    var hashedString=hash(req.params.input,'this-is-a-random-salt');
    res.send(hashedString);
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});
app.get('/article-one',function(req,res) {
    res.send('Article one requested here');
});

app.get('ui/main.js',function(req,res){
     res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});
var counter=0;
app.get('/counter',function(req,res){
    counter=counter+1;
    res.send(counter.toString());
});

var pool=new Pool(config);
app.get('/test-db',function(req,res){
   pool.query('SELECT * FROM testdb',function(err,result){
      if(err)
      {
          res.status(500).send(err.toString());
      }
      else{
          res.send(JSON.stringify(result));
          
      }
   }) ;
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
