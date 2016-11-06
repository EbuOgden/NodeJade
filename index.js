const express = require('express');
const app = express();
const MongoClient = require('mongodb').MongoClient, assert = require('assert');
const bodyParser = require('body-parser');
const path = require('path');

const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.set('view engine', 'pug') // Jade

Genre = require('./models/genre');

Book = require('./models/books');

// Connect to Mongodb

const url = 'mongodb://localhost:27017/test';

// *****

app.get("/", function(req, res){

  MongoClient.connect(url, function(err, db){
    assert.equal(null, err);
    console.log("Connected correctly to server");

    var genres;

    Genre.findDocuments(db, function(callback){
        genres = callback;
    })

    Book.findDocuments(db, function(callback){

      const book = callback;

      res.render('index', {genres : genres, books : book});
    });


    db.close();

  })

}); /* hit the enter page */

app.get("/add", function(req, res){
  res.render('add');
})


// GENRES //

app.get("/genres", function(req, res){
  MongoClient.connect(url, function(err, db){
    assert.equal(null, err);

    Genre.findDocuments(db, function(callback){
      res.render('genre', {genres : callback});
      db.close();
    })
  })
})

app.get("/api/genres", function(req, res){

  Genre.getGenres(function (err, genres){
    if(err){
      throw err;
    }

    res.json(genres);
  });
});

app.post("/api/genres", function(req, res){
  const genre = req.body;

  MongoClient.connect(url, function(err, db){
    assert.equal(null, err);
    console.log("Connected correctly to server");

    Genre.insertGenre(db, genre, function(callback){
      if(callback){
        
        setTimeout(() => {
            res.redirect('/genres');
        }, 1000);


      }
      db.close();
    })

  })

});

app.put("/api/genres/:id", function(req, res){
  const id  = req.params.id;
  const genre = req.body;

  Genre.updateGenre(id, genre, function(err, genre){
    if(err){
      throw err;
    }

    res.json(genre);
  })
})

app.delete("/api/genres/:id", function(req, res){
  const id = req.params.id;

  Genre.deleteGenre(id, function(err, genre){
    if(err){
      throw err;
    }

    res.json(genre);
  });
});

// ***** //

// BOOKS //

app.get("/api/books", function(req, res){
  Book.getBooks(function (err, books){
    if(err){
      throw err;
    }

    res.json(books);
  })
})

app.get('/api/books/:id', function(req, res){
  Book.getBookById(req.params.id, function (err, book){
    if(err){
      throw err;
    }

    res.json(book);
  })
})

app.post("/api/books", function(req, res){
  const book = req.body;

  Book.addBook(book, function(err, book){
    if(err){
      throw err;
    }

    res.json(book);
  })
})

app.put("/api/books/:id", function(req, res){
  const id = req.params.id;
  const book = req.body;

  Book.updateBook(id, book, function(err, book){
    if(err){
      throw err;
    }

    res.json(book);
  })
})

app.delete("/api/books/:id", function(req, res){
  const id = req.params.id;

  Book.deleteBook(id, function(err, book){
    if(err){
      throw err;
    }

    res.json(book);
  });
})

// ***** //

app.listen(port);
console.log("Running on port 3000...");
