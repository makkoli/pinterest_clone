var User = require('../models/user-model'),
    Image = require('../models/image-model');

// Gets all linked images from all users
exports.getAllImages = function(user, cb) {
  var query = {};
  // Return the images by date descending
  var sortOption = { date_added: -1 };

  Image.find(query).sort(sortOption).exec(function(err, docs) {
    if (err) throw err;

    // extract images from the user list
    var images = docs.map(function(image) {
        return {
          username: image.username,
          avatar: image.avatar,
          title: image.title,
          url: image.url,
          userOwnsImage: image.username === user
        };
    });

    cb(images);
  });
};

// Gets all linked images from one user
exports.getUserImages = function(username, userViewing, cb) {
  var query = { username: username };

  Image.find(query, function(err, docs) {
    if (err) throw err;

    var images = docs.map(function(image) {
        return {
          username: image.username,
          avatar: image.avatar,
          title: image.title,
          url: image.url,
          userOwnsImage: image.username === userViewing
        };
    });

    cb(images);
  });
};

// Adds a linked image to a users profile
exports.addImage = function(username, title, url, cb) {
  var newImage = new Image({
    username: username,
    title: title,
    url: url
  });

  newImage.save(function(err) {
    if (err) throw err;

    cb(newImage);
  });
};

// Deletes an image posted by a user
exports.deleteUserImage = function(username, title, cb) {
  var query = { username: username, title: title };

  Image.remove(query, function(err) {
    if (err) throw err;
    
    cb();
  })
};
