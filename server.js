var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
var request = require("request");
var cheerio = require("cheerio");
var db = require("./models");
var PORT = 3000;
var app = express();

// Use morgan logger for logging requests
app.use(logger("dev"));
// Use body-parser for handling form submissions
app.use(bodyParser.urlencoded({
    extended: true
}));
// Use express.static to serve the public folder as a static directory
app.use(express.static("public"));

// Connect to the Mongo DB
// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://heroku_1pcdckx7:9tnq25erm9kmscl3j7ae7t77am@ds149960.mlab.com:49960/heroku_1pcdckx7";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// mongoose.connect("mongodb://localhost/newsScraper");

// Routes

// A GET route for scraping the website
app.get("/scraped", function (req, res) {
    
    // First, we grab the body of the html with request
    request("http://www.laineygossip.com", function (error, response, html) {

        if (!error && response.statusCode == 200) {
            var $ = cheerio.load(html);
            var result = [];

            $("article.article-type-standard").each(function (i, element) {
                var article = {};
                var a = $(this);
                article.headline = a.find("h2").text();
                article.summary = a.find("p").text();
                article.url = "http://www.laineygossip.com" + a.find("h2").find("a").attr("href");
                result.push({ 
                    headline: article.headline, 
                    summary: article.summary, 
                    url: article.url
                });
            });
        };
        console.log('pushed result', result);
        db.Article.create(result).then(function(dbArticle) {
            console.log('dbarticle', dbArticle);
            console.log('result', result);
        });
        res.json(result);
    });
});

app.get("/api/articles/", function(req, res) {
    db.Article.find({})
    .then(function(dbArticle) {
        res.json(dbArticle);
    }).catch(function(err) {
        res.json(err);
    });
});

app.post("/articles/saved", function(req, res) {
    db.Article.update({
        saved: false
    },
    {
        $set: {saved: true}
    });
});

app.get("/articles/:id", function(req, res) {
    db.Article.findOne({
        _id: req.params.id
    }).populate("note")
    .then(function(dbArticle) {
        res.json(dbArticle);
        console.log(dbArticle);
    }).catch(function(err) {
        res.json(err);
    });
});

//Pseudocoding Everything:
//When SCRAPE is clicked, on the backend: scrape from website and store info into database the send res.json.
//On front end: grab json sent from server and display on client screen. 
//When user clicks on article, backend: searches DB for that article and sends json to client side. Frontend: gets response, displays that article and buttons: save & add note & delete note.
//When SAVE is clicked under ADD NOTE modal after adding notes, it sends saved notes to the server. Server stores in DB. 
//Need to build a DELETE NOTE button then set up .ajax method DELETE and update on server (delete the note).
//Also, could use some CSS prettiness. 
//And, fix the deployment to Heroku. 



// // Route for saving/updating an Article's associated Note
// app.post("/articles/:id", function (req, res) {
//     // Create a new note and pass the req.body to the entry
//     db.Note.create(req.body)
//         .then(function (dbNote) {
//             // If a Note was created successfully, find one Article with an `_id` equal to `req.params.id`. Update the Article to be associated with the new Note
//             // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
//             // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
//             return db.Article.findOneAndUpdate({
//                 _id: req.params.id
//             }, {
//                 note: dbNote._id
//             }, {
//                 new: true
//             });
//         })
//         .then(function (dbArticle) {
//             // If we were able to successfully update an Article, send it back to the client
//             res.json(dbArticle);
//         })
//         .catch(function (err) {
//             // If an error occurred, send it to the client
//             res.json(err);
//         });
// });

// Start the server
app.listen(PORT, function () {
    console.log("App running on port " + PORT + "!");
});