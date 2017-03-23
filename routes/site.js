var User = require('../models/user-model'),
    siteController = require('../controllers/siteController');

// Site landing page
exports.index = function(req, res) {
  res.render('index', {
    logged: res.locals.logged,
    user: res.locals.user,
    displayName: res.locals.displayName,
    avatar: res.locals.avatar
  });
};

// Get images from a certain user
exports.loadImages = function(req, res) {
  siteController.getAllImages(function(imagesJSON) {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end(JSON.stringify(imagesJSON));
  });
};

// Adds an image from a user
exports.addUserImage = function(req, res) {
  console.log('reached route');
  siteController.addImage(req.params.user, req.body.title, req.body.url,
    function(newImage) {
      //res.writeHead(200, { 'Content-Type': 'text/plain' });
      //res.end(JSON.stringify(newImage));
      res.redirect('/');
    });
};
