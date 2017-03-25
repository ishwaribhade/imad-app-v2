console.log('Loaded!');
app.get('/article-one',function(req,res) {
    res.send('Article one requested here');
});

app.get('/counter',function(req,res){
    counter=counter+1;
    res.send(counter.toString());
});