var express=require('express');
var app=express();
app.set("view engine","ejs");
var bodyParser=require("body-parser");
var mongoose=require("mongoose");
mongoose.connect("mongodb://localhost/yelp_camp",{useNewUrlParser: true});

//schema setup
var campgroundSchema=new mongoose.Schema({
  name:String,
  image:String,
  description:String
});
var Campground = mongoose.model("Campground",campgroundSchema);

// Campground.create({
//   name:"Skandagiri",
//   image:"https://images.unsplash.com/photo-1515444744559-7be63e1600de?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=500&q=60",
//   description:"This is a huge hill, nno bathrooms no water. just a beautiful view."
//   },function(err,campgrounds){
//   if (err) {
//     console.log(err);
//   }else {
//     console.log(campgrounds);
//   }
// })

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
  //get all campgrounds from db
  Campground.find({},function(err,allCampgrounds){
    if(err){
      console.log(err);
    }
    else {
      res.render('campgrounds',{campgrounds:allCampgrounds});
    }
  });
  //res.render('campgrounds',{campgrounds:campgrounds});
});

app.post('/campgrounds',function(req,res){
  var name=req.body.name;
  var image=req.body.image;
  var desc=req.body.description;
  var newCampground={name:name,image:image,description:desc};
  Campground.create(newCampground,function(err,newlyCreated){
    if(err){
      console.log(err);
    }else {
      res.redirect('/campgrounds');
    }
  })
  //campgrounds.push(newCampground);

});

app.get('/campgrounds/new',function(req,res){
  //This will show the form which will be provided for post request for '/campgrounds' url
  res.render("new.ejs");
});

app.get('/campgrounds/:id',function(req,res){
  //find the CampGround with provided ID
  Campground.findById(req.params.id,function(err,foundCampground){
    if (err) {
      console.log(err);
    }
    else {
      res.render("show",{campground:foundCampground});
    }
  });
  //render show template with that campground
})

app.listen(3000,function(){
  console.log("Server Started!");
});
