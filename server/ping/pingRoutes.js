
var PingController = require('./pingController');

module.exports = function(route) {
  route.get('/', PingController.pingService);
};
