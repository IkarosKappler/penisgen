/**
 * Adapted from
 *   loader.js and the main script by Pomax/bezierjs
 *   https://github.com/Pomax/bezierjs
 *
 * @modified 2016-09-03 Ikaros Kappler (removed the require() calls and added underscore.js compatibility)
 **/

(function(drawFunctions) {
    with(drawFunctions) {
	with(Math) {
	    var curve = new Bezier(102, 33, 0, 
				   16, 99, 0,
				   101, 129, 0,
				   132, 173, 0
				  );
            var draw = function() {
		drawSkeleton(curve);
                drawCurve(curve);
                setColor("red");
                var doc = function(c, idx) { drawCurve(c); };
                var outline = curve.outline(5,5,25,25);
                outline.curves.forEach(doc);
            }
	    draw();
	    handleInteraction( getCanvas(), curve).onupdate = function(evt) { reset(); draw(evt); };
	    $( "#bezier_canvas" ).mousemove( function(event) {
		console.debug( "X" );
		var parentOffset = $(this).parent().offset(); 
		//or $(this).offset(); if you really just want the current element's offset
		var relX = e.pageX - parentOffset.left;
		var relY = e.pageY - parentOffset.top;
		$( "div#coords" ).clear().html( "[" + relX + "," + relY + "]" );
	    } );
	}
    }
} (bindDrawFunctions(0)) );

