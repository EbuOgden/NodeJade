const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient, assert = require('assert');

// Schema

const genreSchema = mongoose.Schema({
  name : {
    type : String,
    required : true
  },

  createDate : {
    type : Date,
    default: Date.now
  }
});

//const Genre = module.exports = mongoose.model('Genre', genreSchema);

// Get Genre

module.exports.getGenres = function(callback, limit){
  Genre.find(callback).limit(limit);
};

module.exports.addGenre = function(db, genre, callback){
  var collection = db.collection('genres');

  collection.insert({
    name : genre.name
  })

};

module.exports.updateGenre = function(id, genre, options, callback){
  const query = {_id : id};
  const update = {
    name : genre.name
  };

  Genre.findOneAndUpdate(query, update, options, callback);
};

module.exports.deleteGenre = function(id, callback){
  const query = {_id : id};
  Genre.findOneAndRemove(query, callback);
}

module.exports.insertGenre = function(db, genre, callback){

  const collection = db.collection('genres');

  collection.insert(genre, function(err, records){
    assert.equal(err, null);
    callback(records);
  })
}

module.exports.findDocuments = function(db, callback){
    var collection = db.collection('genres');

    collection.find({}).toArray(function(err, docs){
      assert.equal(err, null);
      callback(docs);
    })
};
