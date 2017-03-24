var ajaxURL = "http://localhost:8000"

// Initialize masonry layout
var $grid = $('.grid').masonry({
    // options
    itemSelector: '.grid-item',
    columnWidth: 200
});

// Once document finishes loading, set up interactivity
$(document).ready(function() {
    $.get(ajaxURL + "/loadImages", function(data) {
      data = JSON.parse(data);

      var images = data.map(function(image) {
        return prepImage(image);
      });

      // wrap the images in a jQuery object for masonry
      var $images = $(images);

      $grid.append($images).masonry('appended', $images);
      // reload layout after images load
      $grid.imagesLoaded().progress(function() {
          $grid.masonry('layout');
      });
      // Check for broken images
      $('img').on("error", imgError);
    });

    var userProfile = document.getElementById('userProfile');
    if (userProfile !== null) {
      userProfile.addEventListener("click", getUserImages);
    }
});

// Event handler for getting user images
function getUserImages(event) {
  $.ajax({
    method: "GET",
    url: ajaxURL + "/getUserImages" ,
    data: {
      username: event.target.attributes["data-user"].value
    }
  }).done(function(data) {
    data = JSON.parse(data);

    $grid.masonry('remove', $grid.masonry('getItemElements'));
    var images = data.map(function(image) {
      return prepImage(image);
    });

    var $images = $(images);
    $grid.append($images).masonry('appended', $images);
    // reload layout after images load
    $grid.imagesLoaded().progress(function() {
        $grid.masonry('layout');
    });
    // Check for broken images
    $('img').on("error", imgError);
  });
}

// Preps an image for loading by adding the image, title,
// and author
function prepImage(image) {
  // create div element to hold image info
  var parentElem = document.createElement('div');
  parentElem.className = "grid-item";

  // Image element pointing to the image
  var imgElem = document.createElement('img');
  imgElem.src = image.url;
  imgElem.className = "img-responsive";

  // Title of the image
  var titleElem = document.createElement('h3');
  titleElem.innerText = image.title;

  // User who uploaded the image
  var authorElem = document.createElement('h6');
  authorElem.innerText = image.username;
  authorElem.setAttribute("data-title", image.title);
  authorElem.setAttribute("data-user", image.username);
  authorElem.className = "label label-info pull-right";
  authorElem.addEventListener("click", getUserImages);

  // append elements to parentElem
  parentElem.append(imgElem);
  parentElem.append(titleElem);
  parentElem.append(authorElem);

  // If user owns image add a delete button
  if (image.userOwnsImage) {
    var deleteElem = document.createElement('a');
    deleteElem.href = "/" + image.username + "/delete/" + image.title;
    deleteElem.className = "close";
    var closeElem = document.createElement('span');
    closeElem.innerHTML = "&times;";
    deleteElem.appendChild(closeElem);
    titleElem.append(deleteElem);
  }

  return parentElem;
}

// Replaces a broken link with a placeholder image
function imgError(image) {
  console.log('image error');
  console.log(arguments);
  console.log(image);
  image.target.src = "https://imgoat.com/uploads/5c48cce2e2/8446.JPG";
  return true;
}
