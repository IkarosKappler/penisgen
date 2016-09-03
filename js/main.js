/**
 * Adapted from
 *   loader.js and the main script by Pomax/bezierjs
 *   https://github.com/Pomax/bezierjs
 *
 * @modified 2016-09-03 Ikaros Kappler (removed the require() calls and added underscore.js compatibility)
 **/

$( document ).ready( function() {
    (function(drawFunctions) {
	with(drawFunctions) {
	    with(Math) {
		var curve = new Bezier( 115, 157, //0, 
				        127, 227,  // 0,
				        84, 355, //0,
				        97, 511  //, 0
				      );
		var draw = function() {
		    drawSkeleton(curve);
                    drawCurve(curve);
                    setColor("red");
                    var doc = function(c, idx) { drawCurve(c); };
                    var outline = curve.outline(45,20,60,40);
                    outline.curves.forEach(doc);
		}
		draw();
		handleInteraction( getCanvas(), curve).onupdate = function(evt) { reset(); draw(evt); };
		$( "#bezier_canvas" ).mousemove( function(e) {
		    //console.debug( "X" );
		    var parentOffset = $(this).parent().offset(); 
		    //or $(this).offset(); if you really just want the current element's offset
		    var relX = e.pageX - parentOffset.left;
		    var relY = e.pageY - parentOffset.top;
		    $( "div#coords" ).empty().html( "[" + Math.round(relX) + "," + Math.round(relY) + "]" );
		} );
		$( "#bezier_canvas" ).mouseout( function(e) {
		    $( "div#coords" ).empty().html( "[,]" );
		} );
	    }
	}
    } (bindDrawFunctions(0)) );

});

