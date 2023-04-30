//Express-moduuli käyttöön
var express = require("express");
var app = express();

//Ympäristömuuttujat
require("dotenv").config();

//Mongoose-moduuli käyttöön
var mongoose = require("mongoose");
//Tietomalli leffaan
const Movie = require("./modules/model.js");

//Tietokanta ja portti
var uri = process.env.DB_URI;
const PORT = process.env.PORT || 5000;

//Lomakedatan lukemiseen
var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true }));

//Yhteys tietokantaan
const client = mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });


/*****************REITIT***********************/
//Serve a fom to the user
app.get('/', function(req, res) {
    res.sendFile(__dirname + '/index.html');
});

/*****************Return all documents in collection*********************/
//GET http://myapp.com/api/getall
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
//GET http://myapp.com/api/:id
//Tässä on esimerkki-id: 573a13bef29313caabd5cd19
//TÄLLÄ TÄÄ PALAUTTAA SENTÄÄN TYHJÄN VEKTORIN
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


 //SHOCKING, mutta tämä ei toimi
// app.get("api/:id", async (req, res) => {
//      var id = req.params.id;
//      await Movie.findById(id).then((err, result) => {
//      console.log(result);
//      if (err) {
//          res.send(err);
//       }
//        res.send(result);
//    })
//   });

 
/*********************Create a new document in the collection******************/
//POST http://myapp.com/api/add
  app.post("/api/add", function(req, res) {
    var newMovie = new Movie({
      _id: new mongoose.Types.ObjectId(),
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
  //PUT/PATCH http://myapp.com/api/update/:id
  app.put("/api/update/:id", function(req, res) {
      var query = { _id: req.body.id };
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
  

  //Delete the item with the given id.  Huomaa ID-arvon lukeminen 
  // tää o yks hypnoticeista: 644e2d69eb3548598e676263
  //DELETE http://myapp.com/api/delete/:id
  app.delete("/api/delete/:id", function(req, res) {
    res.send("Delete a movie item with the given id: " + req.params.id);
  });
  
  // Web-palvelimen luonti Expressin avulla
  app.listen(PORT, function() {
    console.log("Kuunnellaan porttia " + PORT);
  });  
      
      
