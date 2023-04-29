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

/*****************Return all documents in collection*********************/
//GET http://myapp.com/api/getall
app.get("/api/getall", function(req, res) {
    async function connect() {
        try {
          //tässä koklaan, aaltosulkeet oli siis tyhjät!
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
app.get("/api/:id", function(req, res) {
  async function connect() {
    try {
      var _id = req.params.id;
      //Huom. tässä ei nyt enää rajata vain Rodrigueziin, koska miksi suotta ku id kuitenkin tulee getallista, joten sikäli..
      const movies = await Movie.findById({ _id});
      res.status(200).json(movies);
      console.log("Loading successful. Rodriguez now rules the world.");
  } catch (error) {
      res.status(500).json("Connection error");
      console.error(`Connection error: ${error.stack} on Worker process: ${process.pid}`);
  } finally {
      console.log("Mission accomplished.");
     }
    }
connect();
  });
  
/*********************Create a new document in the collection******************/
//POST http://myapp.com/api/add
  app.post("/api/add", function(req, res) {
    res.send("Add a movie: " + req.body.title + " (" + req.body.year + ")");
  });
  
  //Update the document with the given id
  //PUT/PATCH http://myapp.com/api/update/:id
  app.put("/api/update/:id", function(req, res) {
    res.send("Update a movie with the given id: " + req.params.id);
  });
  
  //Delete the item with the given id.  Huomaa ID-arvon lukeminen 
  //DELETE http://myapp.com/api/delete/:id
  app.delete("/api/delete/:id", function(req, res) {
    res.send("Delete a movie item with the given id: " + req.params.id);
  });
  
  // Web-palvelimen luonti Expressin avulla
  app.listen(PORT, function() {
    console.log("Kuunnellaan porttia " + PORT);
  });



  //Tarviikohan tätä, en tiiä
/*
var http = require("http");
var fs = require("fs");
*/

  /*NÄÄ ON VANHAA KOODIA, VOINEE POISTAA? 27.4.
//create a server object:
http.createServer(function(request, response) {
     
    if (request.url === "/"){
        // Valitaan Content-type tarjoiltavan sisällön suhteen
        response.writeHead(200, { "Content-Type": "text/plain" });
        
        // Lähetetään tekstimuotoinen vastaus selaimelle
        response.write("Olet saapunut palvelimen juureen.");
        } 
    else if (request.url === "/helloworld"){  
        // Valitaan Content-type tarjoiltavan sisällön suhteen
        response.writeHead(200, { "Content-Type": "text/html" });
        
        // Luetaan HTML-tiedosto ja lähetetään se selaimelle
        var html = fs.readFileSync('./frontpage.html');
        response.write(html);
        } 

    else if (request.url === "/json"){
        // Valitaan Content-type tarjoiltavan sisällön suhteen
        response.writeHead(200, { "Content-Type": "text/json" });
        
        // Luetaan JSON muotoinen tiedosto ja lähetetään se selaimelle
        var json = require('./data.json');      
        response.write(JSON.stringify(json));
        } 
        
        response.end(); //HTTP vastaus päättyy
  })
  .listen(8081); // palvelin kuuntelee porttia 8081
  */
