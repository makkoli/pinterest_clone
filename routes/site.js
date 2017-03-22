var User = require('../models/user-model');

// Site landing page
// Loads images from db
exports.index = function(req, res) {
  var query = {};

  User.find(query, function(err, docs) {
    if (err) throw err;

    // Send all the docs to render
    res.render('index', {
      logged: res.locals.logged,
      user: res.locals.user,
      images: images
    });
  });
};
