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

$(window).load(function() {
	window.location.hash = "#home";
	
	// Populate list of section names.
	var sections = Array();
	$(".section").each(function() {
		sections.push($(this).attr("data-name"));
	});
	
	// Breadcrumb trail allows us to trace our steps back.
	var route = Array();
	route.push(0);
	
	$(".section a").click(function(event) {
		event.preventDefault();
		
		var index = sections.indexOf($(this).attr("href").replace("#", ""));
		if (index === -1) {
			if (route.length > 1) { route.pop() };
			index = route[route.length-1];
		} else {
			route.push(index)
		}
		
		window.location.hash = "#" + sections[index];
		
		var window_width = $(window).width();
		$("html").animate({
				scrollLeft: index * window_width
			},
			400
		);
	});
	
	place_sections();
});

$(window).unload(function() {
	$("html").scrollLeft(0);
});

$(window).resize(place_sections);

$(window).scroll(function() {
	$("html").css("background-position", $(window).scrollLeft()*0.8 + "px 0");
});
