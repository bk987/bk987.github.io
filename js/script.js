(function($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
        if (
            location.pathname.replace(/^\//, "") == this.pathname.replace(/^\//, "") &&
            location.hostname == this.hostname
        ) {
            var target = $(this.hash);
            target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
            if (target.length) {
                $("html, body").animate(
                    {
                        scrollTop: target.offset().top - 70
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
        offset: 100
    });

    // Collapse Navbar
    var navbarCollapse = function() {
        if ($("#mainNav").offset().top > 100) {
            $("#mainNav").addClass("navbar-shrink");
        } else {
            $("#mainNav").removeClass("navbar-shrink");
        }
    };
    // Collapse now if page is not at top
    navbarCollapse();
    // Collapse the navbar when page is scrolled
    $(window).scroll(navbarCollapse);

    $("#contactform").validate({
        rules: {
            name: {
                required: true,
                minlength: 2
            },
            email: {
                required: true,
                email: true
            },
            message: {
                required: true,
                minlength: 10
            }
        },
        messages: {
            name: {
                required: "Please enter your name",
                minlength: "Your name must consist of at least 2 characters"
            },
            email: "Please enter a valid email address",
            message: {
                required: "Please provide a message",
                minlength: "Your message must be at least 10 characters long"
            }
        },
        errorElement: "div",
        errorPlacement: function ( error, element ) {
            error.addClass("invalid-feedback");
            error.insertAfter( element );
        },
        highlight: function ( element, errorClass, validClass ) {
            $(element).addClass("is-invalid").removeClass("is-valid");
        },
        unhighlight: function (element, errorClass, validClass) {
            $(element).addClass("is-valid").removeClass("is-invalid");
        },
        submitHandler: function(form) {
            $(form).find("button").attr("disabled", true).text("Please wait...");
            $("#response").slideUp().removeClass("alert-success alert-danger");
            $("#response p").html("");
            var url = $(form).attr('action');
            $.ajax({
                type: "POST",
                url: url,
                data: $(form).serialize(),
                success: function (data) {
                    $("#response p").html(data);
                    $("#response").addClass("alert-success").slideDown();
                    $(form).find("button").attr("disabled", false).text("Send Message");
                    $(':input', form).not(':button, :submit, :reset, :hidden').val('').removeClass('is-valid');
                },
                error: function (data) {
                    $("#response p").html(data.responseText);
                    $("#response").addClass("alert-danger").slideDown();
                    $(form).find("button").attr("disabled", false).text("Send Message");
                }
            });
            return false;
        }
    });

})(jQuery); // End of use strict
