
module.exports = function (app, express) {
  var wordsRouter = express.Router();

  app.use('/api/words', wordsRouter);

  // inject our routers into their respective route files
  require('../words/wordsRoutes.js')(wordsRouter);

};
