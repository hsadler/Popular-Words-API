/* simply a ping to spin up the Heroku server when it's down */

var Utils = require('../utils/utils');


module.exports = {

  // get the entire dictionary of words
  pingService: function(req, res) {
    res.send('Ping Received.. Popular Words API server is now running..');
  }

};

