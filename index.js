//Express-moduuli käyttöön
var express = require("express");
var app = express();
const cors = require('cors');

//kokeillaan tämmöstäkin
app.use('/api/user', (req, res, next)=>{
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  next();
})

//Ympäristömuuttujat
require("dotenv").config();

//Mongoose-moduuli käyttöön
var mongoose = require("mongoose");
//Tietomalli leffaan
const Movie = require("./modules/model.js");

//Tietokanta ja portti
var uri = process.env.DB_URI;
const PORT = process.env.PORT || 5000;
app.use(cors());

//Lomakedatan lukemiseen
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true }));

//Yhteys tietokantaan
const client = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });

//import './style.css'

/*****************REITIT***********************/
//Serve a form to the user
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

/*****************Return all documents in collection*********************/
app.get('/api/getall', function(req, res) {
  //jätetään toistaiseksi pois tää...
//  res.sendFile(__dirname + '/index.html');
    async function connect() {
        try {
            const movies = await Movie.find({directors: 'Robert Rodriguez'});
            console.log("All the movies loaded");
            res.status(200).json(movies);
        } catch (error) {
            res.status(500).json("Connection error");
            console.error(`Connection error: ${error.stack} on Worker process: ${process.pid}`);
        } finally {
            console.log("Loading successful. Rodriguez now rules the world.");
        }
    }
    connect();
  });

 
/*******************Return one item with the given id**************/
//Esimerkki-id: 573a13bef29313caabd5cd19
  app.get("/api/:id", function (req, res) {
   var id = req.params.id;
   async function getId() {
     try {
         const query = await Movie.find({_id: id });
         console.log("Loading the requested movie");
         res.status(200).json(query);
     } catch (error) {
         res.status(500).json("Connection error");
         console.error(`Connection error: ${error.stack} on Worker process: ${process.pid}`);
     } finally {
         console.log("One of Rodriguez's finest work.");
     }
  }
  getId();
 });

 
/*********************Create a new document in the collection******************/
//POST http://myapp.com/api/add
  app.post("/api/add", function(req, res) {
    var newMovie = new Movie({
      title: req.body.title,
      year: req.body.year,
      directors: "Robert Rodriguez" 
    });

     newMovie.save().then(() => {
       res.send("Adding a new movie: " +req.body.title + "(" + req.body.year +")");
     }).catch((err) => {
       console.log(err);
     })
  
    console.log("Added a new movie: " + req.body.title);
  });
  
  /**********************Update the document with the given id **************************/
  //PUT/PATCH http://myapp.com/api/update/:id¨
  //18.5. TÄÄ EI TOIMI VIELÄKÄÄN 
  app.put("/api/update/:id", function(req, res) {
//TÄÄ OLI KEVÄÄN 2022 VIDEOLTA MUT HERJAA ETTÄ ERR EI MÄÄRITELTY, KU EN SAANU TÄHÄN SITÄ THEN-TOIMIMAAN
    // var id = req.params.id;
    // Movie.findByIdAndUpdate(id, {title: req.body.title, year: req.body.year}, {new: true})

    //   if (err) {
    //     res.status(500).json("System error");
    //   }
    //   else {
    //     res.status(200).json(results)
    //   }
    // });
  //   then(() => {
  //     res.send("Updated Rodriguez movie with id " + req.params.id);
  //   })catch((err) => {
  //     console.log(err);
  //   })
  //   console.log("Movie " + req.params.id + " updated")
  // });

  //20.5.TÄÄ OLI SE JONKA PALAUTIT paitsi poistin querystää kaarisulkeet koska hei
       var query = req.params.id;
       var newdata = { title: req.body.title, year: req.body.year };
       var options = { new: true };
 //Ajetaan funktio
       Movie.findOneAndUpdate(
         query,
         newdata,
         options).then(() => {
           res.send("Updated the movie with id " + req.params.id);
         }).catch((err) => {
           console.log(err);
         })
       
         console.log("Update completed.")
         });


  // app.put("/api/update/:id", function(req, res) {
  //     Movie.find({directors: 'Robert Rodriguez'});
  //     const filter = { _id: req.body.id};
  //     const update = {title : req.body.title, year: req.body.year};
  //     const doc = Movie.findOneAndUpdate(filter, update, {
  //       new: true
  //     });
  //     doc.title;
  //     doc.year;

  
  //   res.send("Update a movie with the given id: " + req.params.id);
  // });
  

  /********************Delete the item with the given id ********/
  // tää o yks hypnoticeista: 644e2d69eb3548598e676263
  app.delete("/api/delete/:id", function(req, res) {
    res.send("Delete a movie item with the given id: " + req.params.id);
  });
  
/************* * Web-palvelimen luonti Expressin avulla ******************/
  app.listen(PORT, function() {
    console.log("Kuunnellaan porttia " + PORT);
  });  
      
      
