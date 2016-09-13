/**
 * A simple 3D point class.
 * 
 * @author  Ikaros Kappler
 * @date    2016-09-04 
 * @version 1.0.0
 **/

(function() {
    "use strict";

    var Point = function( _x, _y, _z ) {
	// Inspired by bezier.js constructor
	var args = (coords && coords.forEach) ? coords : [].slice.call(arguments);
	var coordlen = false;
	if(typeof args[0] === "object") {
	    coordlen = args.length;
	    var newargs = [];
	    args.forEach(function(point) {
		['x','y','z'].forEach(function(d) {
		    if(typeof point[d] !== "undefined") {
			newargs.push(point[d]);
		    }
		});
	    });
	    args = newargs;
	} 

	if( args.length == 1 ) {
	    this.x = args[0].x;
	    this.y = args[0].y;
	    this.z = args[0].z;
	} else { // 3?
	    this.x = args[0]; // _x;
	    this.y = args[1]; // _y;
	    this.z = args[2]; // _z;
	}

	if( this.x == null || typeof this.x == "undefined" ) this.x = 0;
	if( this.y == null || typeof this.y == "undefined" ) this.y = 0;
	if( this.z == null || typeof this.z == "undefined" ) this.z = 0;
    };
    
    Point.prototype = {

	clone : function() {
	    return new Point( this.x, this.y, this.z );
	},
	normalize : function() {
	    var len = this.length();
	    this.x = this.x/len;
	    this.y = this.y/len;
	    this.z = this.z/len;
	},
	length : function() {
	    return Math.sqrt( this.x*this.x + this.y*this.y + this.z*this.z );
	},
	add : function(p) {
	    this.x += p.x;
	    this.y += p.y;
	    this.z += p.z;
	    // Return this for chaining
	    return this;
	},

	scale : function(factor,origin) {
	    if( typeof origin == "undefined" )
		origin = new Point(0,0,0);
	    this.x = origin.x + (this.x-origin.x)*factor;
	    this.y = origin.y + (this.y-origin.y)*factor;
	    this.z = origin.z + (this.z-origin.z)*factor;
	    // Return this for chaining
	    return this;
	}
    }

    window.Point = Point;

})();
