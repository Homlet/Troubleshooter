function place_sections() {
    var window_width = $(window).width();
    $(".section").each(function(index) {
        var width = $(this).width();
        $(this).css(
            "left",
            (window_width - width) / 2 + window_width * index
        );
    });
}

function list_suggestions(route) {
    // Clear previous suggestions.
    $("#suggestions").css("display", "none");
    
    // Populate list of suggestion types.
    route.forEach(function(entry) {
        entry = entry[1];
        $("#suggestions[data-fault=" + entry + "]").css("display", "initial");
        /* if (entry != "") {
            if (faults.hasOwnProperty(entry)) {
                faults[entry]++;
            } else {
                faults[entry] = 1
            }
        } */
    });
}

$(window).load(function() {
    window.location.hash = "#home";
    
    // Populate list of section names.
    var sections = Array();
    $(".section").each(function() {
        sections.push($(this).attr("data-name"));
    });
    
    // Breadcrumb trail allows us to trace our steps back.
    var route = Array();
    route.push([0, ""]);
    
    $(".section a:not(#suggestions a)").click(function(event) {
        // Prevent the browser from following the link.
        event.preventDefault();
        
        // Get the index of the section.
        var section = $(this).attr("href").replace("#", "");
        var index = sections.indexOf(section);
        
        // If the section was "back", get the previous section.
        if (index === -1) {
            if (route.length > 1) { route.pop() };
            index = route[route.length-1][0];
        } else {
            var fault = "";
            if ($(this).is("[data-fault]")) {
                fault = $(this).attr("data-fault");
            }
            route.push([index, fault]);
        }
        
        // Update the hash.
        window.location.hash = "#" + section;
        
        // Scroll to the section.
        var window_width = $(window).width();
        $("html").animate({
                scrollLeft: index * window_width
            },
            400
        );
        
        if (section === "suggestions") {
            list_suggestions(route);
        }
    });
    
    // Position the sections based on window size.
    place_sections();
});

$(window).unload(function() {
    // Reset to beginning on page reload.
    $("html").scrollLeft(0);
});

$(window).resize(place_sections);

$(window).scroll(function() {
    // Create background parallax effect.
    $("html").css("background-position", $(window).scrollLeft()*0.8 + "px 0");
});
