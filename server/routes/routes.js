
module.exports = function (app, express) {
  var userRouter = express.Router();
  var wordsRouter = express.Router();

  app.use('/api/user', userRouter);
  app.use('/api/words', wordsRouter);

  // inject our routers into their respective route files
  require('../user/userRoutes.js')(userRouter);
  require('../words/wordsRoutes.js')(wordsRouter);

};
