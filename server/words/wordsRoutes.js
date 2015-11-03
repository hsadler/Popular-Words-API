var WordsController = require('./wordsController');

module.exports = function(route) {
  route.get('/list', WordsController.getWordsList);
  route.get('/allwords', WordsController.getAllWords);
  route.get('/allranks', WordsController.getAllRanks);
};
