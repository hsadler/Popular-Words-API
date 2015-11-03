var Promise = require('bluebird');
var _ = require('underscore');

var Utils = require('../utils/utils');
var WordDict = require('../dictionaries/word-dict.js');


module.exports = {

  // need error handling
  getWordsList: function(req, res) {

    // set parameters to default values if not provided
    var size = parseInt(req.query.size) || 100;
    var startRank = parseInt(req.query.startrank) || 1;
    var endRank = parseInt(req.query.endrank) || WordDict.length;

    // log information
    console.log('GET request recieved for getWordsList =========================>');
    console.log('size request: ' + size);
    console.log('rankstart request: ' + startRank);
    console.log('rankend request: ' + endRank);

    // send error if any of the parameters are not numbers
    // this may not be needed...
    if(typeof size !== 'number' || typeof startRank !== 'number' || typeof endRank !== 'number') {
      res.sendStatus(500);
      return;
    }

    // confine the size, startRank, and endRank to always work with bad inputs
    size = size > 10000 ? 10000 : size;
    startRank = startRank < 1 ? 1 : startRank;
    startRank = startRank > WordDict.length ? WordDict.length : startRank;
    endRank = endRank < 1 ? 1: endRank;
    endRank = endRank < startRank ? startRank : endRank;


    var resList = [];

    while(resList.length < size) {
      resList.push(WordDict.words[Utils.randomInt(startRank, endRank)]);
    }

    res.send(resList);
  },

  getAllWords: function(req, res) {
    res.send(WordDict.words);
  },

  getAllRanks: function(req, res) {
    res.send(WordDict.ranks);
  }



};

