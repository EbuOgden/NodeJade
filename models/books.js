const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient, assert = require('assert');

// Schema

const booksSchema = mongoose.Schema({
  title : {
    type : String,
    required : true
  },

  genre : {
    type : String,
    required : true
  },

  description : {
    type : String,
    required : true
  },

  pages : {
    type : String,
    required : true
  },

  imgUrl : {
    type : String,
    required : true
  },

  buyUrl : {
    type : String,
    required : true
  }
});

const Books = module.expors = mongoose.model('Books', booksSchema); // export Books object

// Get Books

module.exports.getBooks = function(callback, limit){
  Books.find(callback).limit(limit);
};

module.exports.getBookById = function(book, callback){
  Books.findById(book, callback);
};

module.exports.addBook = function(book, callback){
  Books.create(book, callback);
};

module.exports.updateBook = function(id, book, options, callback){
  const query = {_id : id};

  const update = {
    title : book.title,
    genre : book.genre,
    description : book.description,
    pages : book.pages
  };

  Books.findOneAndUpdate(query, update, options, callback);
}

module.exports.deleteBook = function(id, callback){
  const query = {_id : id};

  Books.findOneAndRemove(query, callback);
}

module.exports.findDocuments = function(db, callback){
  var collection = db.collection('books');

  collection.find({}).toArray(function(err, docs){
    assert.equal(err, null);
    callback(docs);
  })
}
