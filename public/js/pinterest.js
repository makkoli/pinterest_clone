// Once document finishes loading, load all the images from users
$(document).ready(function() {
  console.log('ready');
  $.ajax({
    url: "http://localhost:8000/loadImages",
    method: "GET",
    dataType: "json"
  }).done(function(data) {
    console.log('1 images received');
    console.log('msg:', data);
  }).fail(function() {
    $('.container').append('<p class="text-center">Error retrieving images<p>');
  });
});
