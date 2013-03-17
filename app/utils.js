
/*
 *
 * Config Object
 *
 */

// basic configuration object
var Config = function(canvas){
	
	//some defaults.
	this.maxCurveAngle = 6;
	this.curveWidth = 3;
	this.canvasWidth = canvas.width;
	this.context = canvas.getContext('2d');
	this.canvasHeight = canvas.height;
  this.keys = {};
};

var config = new Config($('#gameCanvas')[0]);



window.requestAnimFrame = (function(){
    return  window.requestAnimationFrame       || 
          window.webkitRequestAnimationFrame || 
          window.mozRequestAnimationFrame    || 
          window.oRequestAnimationFrame      || 
          window.msRequestAnimationFrame     || 
          function(callback, element){
            window.setTimeout(callback, 1000 / 60);
          };
})();
