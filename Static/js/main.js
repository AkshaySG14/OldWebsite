$(function() {
    // Gets navbar height for later calculations.
    const navbarHeight = $("#main-navbar").outerHeight();
    // Boolean for determining if window is at the bottom of the page.
    var pageBottom = false;
    // For moving elements below the navbar
    $(window).resize(function () {
        $('body').css('padding-top', $('#main-navbar').height() + 10);
    });
    $(window).load(function () {
        $('body').css('padding-top', $('#main-navbar').height() + 10);
    });
    // Upon clicking on the horizontal bar, scrolls to respective element.
    $("#summary-link").click(function() {
        $('html body').animate({
            scrollTop: $("#summary").offset().top - navbarHeight
        }, 500);
    });

    $("#screenshots-link").click(function() {
        $('html body').animate({
            scrollTop: $("#screenshots").offset().top - navbarHeight
        }, 500);
    });

    $("#code-link").click(function() {
        $('html, body').animate({
            scrollTop: $("#code").offset().top - navbarHeight
        }, 500);
    });

    $("#video-link").click(function() {
        $('html, body').animate({
            scrollTop: $("#video").offset().top - navbarHeight
        }, 500);
    });

    $("#links-link").click(function() {
        $('html, body').animate({
            scrollTop: $("#links").offset().top - navbarHeight
        }, 500);
    });
    // Changes the active element on the horizontal bar depending on whenever the screen has currently been
    // scrolled to using the waypoint jQuery library.
    $("#summary").waypoint(function(direction) {
            setActiveLink($("#summary-pill"));
        }
    );
    $("#screenshots").waypoint(function(direction) {
            setActiveLink($("#screenshots-pill"));
        },
        {
            offset: navbarHeight
        }
    );
    $("#video").waypoint(function(direction) {
        if (direction === 'down') {
            setActiveLink($("#video-pill"));
        }
        else {
            setActiveLink($("#screenshots-pill"));
        }
        },
        {
            offset: navbarHeight
        }
    );
    $("#code").waypoint(function(direction) {
            if (direction === 'down') {
                setActiveLink($("#code-pill"));
            }
            else {
                if ($("#video-pill").length) {
                    setActiveLink($("#video-pill"));
                }
                else if ($("#screenshots-pill").length) {
                    setActiveLink($("#screenshots-pill"));
                }
                else {
                    setActiveLink($("#summary-pill"));
                }
            }
        },
        {
            offset: navbarHeight
        }
    );

    // Sets only specific horizontal navbar element to active.
    function setActiveLink(element) {
        $("#summary-pill").removeClass("active");
        $("#links-pill").removeClass("active");
        $("#screenshots-pill").removeClass("active");
        $("#video-pill").removeClass("active");
        $("#code-pill").removeClass("active");
        element.addClass("active")
    }

    // Gets document height based on browser.
    function getDocHeight() {
        var D = document;
        return Math.max(
            D.body.scrollHeight, D.documentElement.scrollHeight,
            D.body.offsetHeight, D.documentElement.offsetHeight,
            D.body.clientHeight, D.documentElement.clientHeight
        );
    }
    // Checks if user has scrolled to the bottom of the page. Note the use of throttling to prevent over
    // use of script.
    $(window).scroll(_.throttle(function() {
        if ($(window).scrollTop() + $(window).innerHeight() >= getDocHeight()) {
            pageBottom = true;
            setActiveLink($("#links-pill"));
        }
        else if (pageBottom) {
            pageBottom = false;
            setActiveLink($("#code-pill"));
        }
    }, 100));
});