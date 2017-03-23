var User = require('../models/user-model');

// Gets all linked images from all users
exports.getAllImages = function(cb) {
  var query = {};

  User.find(query, function(err, docs) {
    if (err) throw err;

    // extract images from the user list
    var images = docs.map(function(user) {
        return {
          username: user.username,
          avatar: user.avatar,
          images: user.linked_images
        };
    });

    cb(images);
  });
};

// Gets all linked images from one user
exports.getUserImages = function(username) {
  var query = { username: user };

  User.findOne(query, function(err, doc) {
    if (err) throw err;

    return doc.map(function(user) {
        return user.linked_images;
    });
  });
};

// Adds a linked image to a users profile
exports.addImage = function(username, title, link) {
  var query = { username: username };
  var update = { "$push": {
    linked_images: {
      title: title,
      link: link
    }
  }};

  User.update(query, update, null, function(err) {
    if (err) throw err;
  });
};
