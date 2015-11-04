var Promise = require('bluebird');
var _ = require('underscore');

var Utils = require('../utils/utils');
var WordDict = require('../dictionaries/word-dict1.js');


module.exports = {

  getWordList: function(req, res) {
    var verbose = req.query.verbose === 'true';
    var minRank = parseInt(req.query.minrank) || 1;
    var maxRank = parseInt(req.query.maxrank) || WordDict.length;

    minRank = minRank < 1 ? 1 : minRank;
    minRank = minRank > WordDict.length ? WordDict.length : minRank;
    maxRank = maxRank < 1 ? 1: maxRank;
    maxRank = maxRank < minRank ? minRank : maxRank;

    var resList = [];
    for (var i = minRank; i <= maxRank; i++) {
      if(verbose) {
        resList.push({ word: WordDict.words[i], rank: i });
      } else {
        resList.push(WordDict.words[i]);
      }
    }

    console.log('res: ' + resList);
    res.json(resList);
  },

  // construct random word list given query parameters
  getRandomWordList: function(req, res) {

    // set parameters to default values if not provided
    var size = parseInt(req.query.size) || 100;
    var verbose = req.query.verbose === 'true';
    var minRank = parseInt(req.query.minrank) || 1;
    var maxRank = parseInt(req.query.maxrank) || WordDict.length;

    // confine the size, minRank, and maxRank to always work with bad inputs
    size = size > 10000 ? 10000 : size;
    minRank = minRank < 1 ? 1 : minRank;
    minRank = minRank > WordDict.length ? WordDict.length : minRank;
    maxRank = maxRank < 1 ? 1: maxRank;
    maxRank = maxRank < minRank ? minRank : maxRank;

    // build the response list and return
    var resList = [];
    var currItem = null;
    var currRand = null;
    var currWord = null;
    if(verbose) {
      while(resList.length < size) {
        currRand = Utils.randomInt(minRank, maxRank);
        currWord = WordDict.words[currRand];
        currItem = {
          word: currWord,
          rank: WordDict.ranks[currWord]
        };
        resList.push(currItem);
      }
    } else {
      while(resList.length < size) {
        resList.push(WordDict.words[Utils.randomInt(minRank, maxRank)]);
      }
    }

    console.log('res: ' + resList);
    res.json(resList);
  },

  // get the rank of a given word
  getRankByWord: function(req, res) {
    var word = req.query.word || null;
    var verbose = req.query.verbose === 'true';
    if(!word) {
      res.status(500).send('ERROR: the "word" field was not provided');
      return;
    }
    var rank = WordDict.ranks[word];
    var result = null;
    if(rank === undefined) {
      res.json(null);
    } else if(verbose) {
      result = { word: word, rank: rank };
    } else {
      result = rank;
    }
    console.log('res: ' + result);
    res.json(result);
  },

  getWordByRank: function(req, res) {
    rank = parseInt(req.query.rank) || null;
    var verbose = req.query.verbose === 'true';
    if(!rank) {
      res.status(500).send('ERROR: the "rank" field was not provided');
    }
    var word = WordDict.words[rank];
    var result = null;
    if(word === undefined) {
      res.json(null);
    } else if(verbose) {
      result = { word: word, rank: rank };
    } else {
      result = word;
    }
    console.log('res: ' + result);
    res.json(result);
  },

  // get the entire dictionary of words
  getAllWords: function(req, res) {
    res.send(WordDict.words);
  },

  // get the entire dictionary of ranks
  getAllRanks: function(req, res) {
    res.send(WordDict.ranks);
  }

};

