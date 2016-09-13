/**
 * Some getter and setter functions for the input form.
 *
 * @author  Ikaros Kappler
 * @date    2016-09-04
 * @version 1.0.0
 **/

var formUtils = {

    getBeginShaftNormal : function() {
	return $( "input#shaftBeginNormal" ).val();
    },

    getBeginShaftAntinormal : function() {
	return $( "input#shaftBeginAntinormal" ).val();
    },

    getEndShaftNormal : function() {
	return $( "input#shaftEndNormal" ).val();
    },

    getEndShaftAntinormal : function() {
	return $( "input#shaftEndAntinormal" ).val();
    },

    getShaftBeginBevel : function() {
	return $( "input#shaftBeginBevel" ).val();
    },

    getShaftEndBevel : function() {
	return $( "input#shaftEndBevel" ).val();
    }

};
