var WordsController = require('./wordsController');

module.exports = function(route) {
  route.get('/list', WordsController.getWordList);
  route.get('/randomlist', WordsController.getRandomWordList);
  route.get('/getrank', WordsController.getRankByWord);
  route.get('/searchrank', WordsController.getWordByRank);
  route.get('/allwords', WordsController.getAllWords);
  route.get('/allranks', WordsController.getAllRanks);
};
