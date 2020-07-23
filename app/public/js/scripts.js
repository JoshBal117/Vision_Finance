/*!
 * Start Bootstrap - Creative v6.0.3 (https://startbootstrap.com/themes/creative)
 * Copyright 2013-2020 Start Bootstrap
 * Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-creative/blob/master/LICENSE)
 */
(function($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
        if (
            location.pathname.replace(/^\//, "") ==
            this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html, body").animate({
                        scrollTop: target.offset().top - 72,
                    },
                    1000,
                    "easeInOutExpo"
                );
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $(".js-scroll-trigger").click(function() {
        $(".navbar-collapse").collapse("hide");
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $("body").scrollspy({
        target: "#mainNav",
        offset: 75,
    });

    // Collapse Navbar
    var navbarCollapse = function() {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-scrolled");
        } else {
            $("#mainNav").removeClass("navbar-scrolled");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);
})(jQuery); // End of use strict

$(".register-button").on("click", function(event) {
    event.preventDefault();

    // Here we grab the form elements
    var newUser = {
        customerName: $("#registerName").val().trim(),
        customerEmail: $("#registerEmail").val().trim(),
        customerPassword: $("#registerPassword").val().trim(),
        customerPassword2: $("#registerPassword").val().trim(),
    };

    //console.log(newUser);

    // This line is the magic. It"s very similar to the standard ajax function we used.
    // Essentially we give it a URL, we give it the object we want to send, then we have a "callback".
    // The callback is the response of the server. In our case, we set up code in api-routes that "returns" true or false
    // depending on if a tables is available or not.

    $.post("/api/register", newUser, function(data) {
        // If a table is available... tell user they are booked.
        console.log(data);
        // Clear absolutely everything stored in localStorage using localStorage.clear()
        localStorage.clear();

        // Store the username into localStorage using "localStorage.setItem"
        localStorage.setItem("registeredInUser", data);
    });
});

$(".login-button").on("click", function(event) {
    event.preventDefault();

    // Here we grab the form elements
    var loginUser = {
        customerEmail: $("#loginEmail").val().trim(),
        customerPassword: $("#loginPassword").val().trim(),
    };

    console.log(loginUser);

    // This line is the magic. It"s very similar to the standard ajax function we used.
    // Essentially we give it a URL, we give it the object we want to send, then we have a "callback".
    // The callback is the response of the server. In our case, we set up code in api-routes that "returns" true or false
    // depending on if a tables is available or not.

    $.post("/api/login", loginUser, function(data) {
        // If a table is available... tell user they are booked.
        console.log(data);
        // Clear absolutely everything stored in localStorage using localStorage.clear()
        localStorage.clear();

        // Store the username into localStorage using "localStorage.setItem"
        localStorage.setItem("signedInUser", data);
    });
});