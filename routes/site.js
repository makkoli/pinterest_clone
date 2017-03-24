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
  siteController.getAllImages(res.locals.user,
    function(imagesJSON) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(JSON.stringify(imagesJSON));
    }
  );
};

// Adds an image from a user
exports.addUserImage = function(req, res) {
  if (res.locals.logged && res.locals.user === req.params.user) {
    siteController.addImage(req.params.user, req.body.title, req.body.url,
      function(newImage) {
        res.redirect('/');
      });
    }
};

// Get all images posted by one user
exports.getUserImages = function(req, res) {
  siteController.getUserImages(req.query.username, res.locals.user,
    function(imagesJSON) {
      res.writeHead(200, { 'Content-Type': 'text/plain' });
      res.end(JSON.stringify(imagesJSON));
    }
  );
};

// Deletes an image
exports.deleteUserImage = function(req, res) {
  if (res.locals.logged && res.locals.user === req.params.user) {
    siteController.deleteUserImage(req.params.user,
      req.params.title,
      function() {
        res.redirect('/');
      }
    );
  }
};
