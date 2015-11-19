
module.exports = function (app, express) {
  var wordsRouter = express.Router();
  var pingRouter = express.Router();

  app.use('/api/words', wordsRouter);
  app.use('/api/ping', pingRouter);

  // inject our routers into their respective route files
  require('../words/wordsRoutes.js')(wordsRouter);
  require('../ping/pingRoutes.js')(pingRouter);
};
