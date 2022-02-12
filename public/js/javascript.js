// Loading jQuery
$(document).ready(function() {

    switch (window.location.pathname) {
        case "/":
            $("body").addClass("home");
        break;
    }

    // Displaying current year in the footer
    var currentYear = (new Date).getFullYear();
    $(".current-year").text(currentYear);

    // Show/Hide Footer
     var footerToggle = $(".footer-toggle");

    footerToggle.on("click", function() {

        var toggleState = $(this).attr("data-toggle");
        var arrowLeft = $(".arrow-left");
        var arrowRight = $(".arrow-right");

        if ( toggleState === "show" ) {
            // Scrolls to the bottom of the document
            $(window).scrollTop($(document).height());
            $(this).attr("data-toggle", "hide");
            $(this).css({
                width: "36px"
            });
            arrowLeft.css({
                marginLeft: "-18px"
            });
            arrowRight.css({
                marginLeft: "-18px"
            });
        }
        else {
            // Scrolls to the top
            $(window).scrollTop(0);
            $(this).attr("data-toggle", "show");
            $(this).css({
                width: "60px"
            });
            arrowLeft.css({
                marginLeft: "-29px"
            });
            arrowRight.css({
                marginLeft: "-7px"
            });
        }
    })

    // Resizes heights on window resize
    $(window).on('resize', function (){
        windowHeight = $(window).height();
        carouselItem.height(windowHeight);
    });

  });
