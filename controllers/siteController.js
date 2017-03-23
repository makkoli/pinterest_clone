var User = require('../models/user-model'),
    Image = require('../models/image-model');

// Gets all linked images from all users
exports.getAllImages = function(cb) {
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
          url: image.url
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
exports.addImage = function(username, title, url, cb) {
  var newImage = new Image({
    username: username,
    title: title,
    url: url
  });

  newImage.save(function(err) {
    if (err) throw err;
    console.log('image added');

    cb(newImage);
  });
};
