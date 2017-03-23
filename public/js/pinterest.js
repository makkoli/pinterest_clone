// Once document finishes loading, load all the images from users
$(document).ready(function() {
    var ajaxURL = "http://localhost:8000"
    // Initialize masonry layout
    var $grid = $('.grid').masonry({
        // options
        itemSelector: '.grid-item',
        columnWidth: 200
    });
    $grid.imagesLoaded().progress(function() {
        $grid.masonry('layout');
    });

    $.get(ajaxURL + "/loadImages", function(data) {
        data = JSON.parse(data);

        var images = data.map(function(image) {
            var parentElem = document.createElement('div');
            parentElem.className = "grid-item";
            var imgElem = document.createElement('img');
            imgElem.src = image.url;
            imgElem.className = "img-responsive";
            var titleElem = document.createElement('h3');
            titleElem.innerText = image.title;
            var authorElem = document.createElement('h6');
            authorElem.innerText = image.username;
            parentElem.append(imgElem);
            parentElem.append(titleElem);
            parentElem.append(authorElem);

            return parentElem;
        });
        console.log(images);
        var $images = $(images);

        $grid.append($images).masonry('appended', $images);
    });
});
