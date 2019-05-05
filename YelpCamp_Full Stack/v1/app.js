var express=require('express');
var app=express();
app.set("view engine","ejs");
var bodyParser=require("body-parser");
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',function(req,res){
  res.render('landing')
});

var campgrounds = [
  {name:"Skandagiri",image:"https://images.unsplash.com/photo-1515444744559-7be63e1600de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
  {name:"Nandi Hills",image:"https://images.unsplash.com/photo-1537565266759-34bbc16be345?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60"},
  {name:"MaKaliDurga",image:"https://images.unsplash.com/photo-1510312305653-8ed496efae75?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"}
];

app.get('/campgrounds',function(req,res){
  res.render('campgrounds',{campgrounds:campgrounds});
});

app.post('/campgrounds',function(req,res){
  var name=req.body.name;
  var image=req.body.image;
  var newCampground={name:name,image:image};
  campgrounds.push(newCampground);
  res.redirect('/campgrounds');
});

app.get('/campgrounds/new',function(req,res){
  //This will show the form which will be provided for post request for '/campgrounds' url
  res.render("new.ejs");
});

app.listen(3000,function(){
  console.log("Server Started!");
});
