console.log('Loaded!');
app.get('/article-one',function(req,res) {
    res.send('Article one requested here');
});
var counter=0;
app.get('/counter',function(req,res){
    counter=counter+1;
    res.send(counter.toString());
});