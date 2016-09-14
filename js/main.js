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
		
		var shaftCurve = new Bezier( 92, 506,  // , 0
					     90, 412, //0,
					     147, 274, //0,
					     142, 174 // 0, 
					   );
		var glansCurve = new Bezier( 144, 110-20,
					     138, 132-20, // 155, 182-75,
					     155, 130-20, // 136,  97, // 150, 160-75,
					     144, 110-20  // 152, 208-75 // 142, 145-75
					   );
		var draw = function() {
		    drawSkeleton(shaftCurve);
                    drawCurve(shaftCurve);

		    drawSkeleton(glansCurve);
		    //drawCurve(glansCurve);

                    setColor("red");

		    // Get the four control poins (normal and anti-normal at end- and beginning point)
		    var shaftBeginNormal       = new Point(shaftCurve.normal(0.0)).scale(    formUtils.getBeginShaftNormal()   ); 
		    var shaftEndNormal         = new Point(shaftCurve.normal(1.0)).scale( formUtils.getEndShaftNormal() ); 
		    var shaftBeginAntinormal   = new Point(shaftCurve.normal(0.0)).scale( -1*   formUtils.getBeginShaftAntinormal()   ); 
		    var shaftEndAntinormal     = new Point(shaftCurve.normal(1.0)).scale( -1*formUtils.getEndShaftAntinormal() ); 
		    //console.debug( "beginNormal=" + JSON.stringify(beginNormal) );

		    var shaftBeginPoint        = new Point(shaftCurve.point(0));
		    var shaftBeginControlPoint = new Point(shaftCurve.point(1));
		    var shaftEndControlPoint   = new Point(shaftCurve.point(2));
		    var shaftEndPoint          = new Point(shaftCurve.point(3));

		    var shaft = {
			beginPoint        : shaftBeginPoint,
			beginControlPoint : shaftBeginControlPoint,
			endControlPoint   : shaftEndControlPoint,
			endPoint          : shaftEndPoint
		    };

		    var upperShaft = {
			beginPoint        : new Point( shaftBeginPoint.x+shaftBeginNormal.x,        shaftBeginPoint.y+shaftBeginNormal.y ),
		    	beginControlPoint : new Point( shaftBeginControlPoint.x+shaftBeginNormal.x, shaftBeginControlPoint.y+shaftBeginNormal.y ),
			endControlPoint   : new Point( shaftEndControlPoint.x+shaftEndNormal.x,     shaftEndControlPoint.y+shaftEndNormal.y ),
			endPoint          : new Point( shaftEndPoint.x+shaftEndNormal.x,            shaftEndPoint.y+shaftEndNormal.y )
		    };
		    var lowerShaft = {
			beginPoint        : new Point( shaftBeginPoint.x+shaftBeginAntinormal.x,        shaftBeginPoint.y+shaftBeginAntinormal.y ),
		    	beginControlPoint : new Point( shaftBeginControlPoint.x+shaftBeginAntinormal.x, shaftBeginControlPoint.y+shaftBeginAntinormal.y ),
			endControlPoint   : new Point( shaftEndControlPoint.x+shaftEndAntinormal.x,     shaftEndControlPoint.y+shaftEndAntinormal.y ),
			endPoint          : new Point( shaftEndPoint.x+shaftEndAntinormal.x,            shaftEndPoint.y+shaftEndAntinormal.y )
		    };	    

		    // Scale the control points a bit to build a bevel
		    var shaftBeginBevel = formUtils.getShaftBeginBevel();
		    upperShaft.beginControlPoint.scale( 1.0+(shaftBeginBevel)/100.0, shaftBeginControlPoint );
		    lowerShaft.beginControlPoint.scale( 1.0+(shaftBeginBevel)/100.0, shaftBeginControlPoint );
		    var shaftEndBevel   = formUtils.getShaftEndBevel();
		    upperShaft.endControlPoint.scale( 1.0+(shaftEndBevel)/100.0, shaftEndControlPoint );
		    lowerShaft.endControlPoint.scale( 1.0+(shaftEndBevel)/100.0, shaftEndControlPoint );
		    // Now build the lower and upper shaft curve (surrounding the central spline)
		    var upperShaftCurve    = new Bezier( upperShaft.beginPoint.x,        upperShaft.beginPoint.y,
							 upperShaft.beginControlPoint.x, upperShaft.beginControlPoint.y,
							 upperShaft.endControlPoint.x,   upperShaft.endControlPoint.y,
							 upperShaft.endPoint.x,          upperShaft.endPoint.y
						       );
		    var lowerShaftCurve    = new Bezier( lowerShaft.beginPoint.x,        lowerShaft.beginPoint.y,
							 lowerShaft.beginControlPoint.x, lowerShaft.beginControlPoint.y,
							 lowerShaft.endControlPoint.x,   lowerShaft.endControlPoint.y,
							 lowerShaft.endPoint.x,          lowerShaft.endPoint.y
						       );
		    drawCurve(lowerShaftCurve);
		    drawCurve(upperShaftCurve);
		    				     
						
		    // Make the normals absolute for drawing on the canvas
		    shaftBeginNormal.add(     new Point(shaftBeginPoint) );
		    shaftEndNormal.add(       new Point(shaftEndPoint)   );
		    shaftBeginAntinormal.add( new Point(shaftBeginPoint) );
		    shaftEndAntinormal.add(   new Point(shaftEndPoint)   );
		    
		    drawLine( shaftBeginNormal,     shaftCurve.getStartPoint() );
		    drawLine( shaftEndNormal,       shaftCurve.getEndPoint()   );
		    drawLine( shaftBeginAntinormal, shaftCurve.getStartPoint() );
		    drawLine( shaftEndAntinormal,   shaftCurve.getEndPoint()   );



		    // Draw glans curves
		    var lowerGlans = {
			beginPoint        : new Point(lowerShaft.endPoint), // shaftCurve.point(3)),
			beginControlPoint : new Point(shaftEndAntinormal.scale(3.0,shaft.endPoint)), // lowerShaft.endPoint).scale(2.0,shaft.endPoint), // shaftCurve.point(3)),
			endControlPoint   : new Point(glansCurve.point(3)).scale(2.4,glansCurve.point(2)),
			endPoint          : new Point(glansCurve.point(3))
		    };
		    var upperGlans = {
			beginPoint        : new Point(upperShaft.endPoint), // shaftCurve.point(3)),
			beginControlPoint : new Point(shaftEndNormal.scale(1.8,shaft.endPoint)), // lowerShaft.endPoint).scale(2.0,shaft.endPoint), // shaftCurve.point(3)),
			endControlPoint   : new Point(glansCurve.point(3)).scale(2.4,glansCurve.point(1)), // lowerGlans.beginControlPoint),
			endPoint          : new Point(glansCurve.point(3))
		    };
		    var lowerGlansCurve = new Bezier( lowerGlans.beginPoint.x,        lowerGlans.beginPoint.y,
						      lowerGlans.beginControlPoint.x, lowerGlans.beginControlPoint.y,
						      lowerGlans.endControlPoint.x,   lowerGlans.endControlPoint.y,
						      lowerGlans.endPoint.x,          lowerGlans.endPoint.y
						    );
		    var upperGlansCurve = new Bezier( upperGlans.beginPoint.x,        upperGlans.beginPoint.y,
						      upperGlans.beginControlPoint.x, upperGlans.beginControlPoint.y,
						      upperGlans.endControlPoint.x,   upperGlans.endControlPoint.y,
						      upperGlans.endPoint.x,          upperGlans.endPoint.y
						    );
		    drawCurve(lowerGlansCurve);
		    drawCurve(upperGlansCurve);
		};
		var redraw = function() {
		    reset();
		    draw();
		};
		draw();

		handleInteraction( getCanvas(), shaftCurve).onupdate = redraw;
		handleInteraction( getCanvas(), glansCurve).onupdate = redraw;
		
		$( "#bezier_canvas" ).mousemove( function(e) {
		    //console.debug( "X" );
		    var parentOffset = this.getBoundingClientRect(); // $(this).parent().offset(); 
		    //or $(this).offset(); if you really just want the current element's offset
		    var relX = e.clientX - parentOffset.left;
		    var relY = e.clientY - parentOffset.top;
		    $( "div#coords" ).empty().html( "[" + Math.round(relX) + "," + Math.round(relY) + "]" );
		} );
		$( "#bezier_canvas" ).mouseout( function(e) {
		    $( "div#coords" ).empty().html( "[,]" );
		} );

		$( "input.penisgen" ).change( redraw );
	    }
	}
    } (bindDrawFunctions(0)) );

});

