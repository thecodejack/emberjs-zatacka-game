Game.ZatackaController = Ember.Controller.extend({
	name:"Adi",
	FPS : 60,
	MAX_FRAME_SKIP : 5,
	SKIP_TICKS : 1000/60, // FPS=60
	//context : config.context,
	anime : null,
	paused : true,
	playing : false,
	scoreUpdate : 1,
	keyMaps:[
		{
			label: '<-/->',
			up: 37,
			down: 39,
			inUse: false,
			color: '#f00',
		},
		{
			label: 'A/S',
			up: 65,
			down: 83,
			inUse: false,
			color: '#ff0',
		},
		{
			label: 'G/H',
			up: 71,
			down: 72,
			inUse: false,
			color: '#0ff',
		},
		{
			label: 'K/L',
			up:75,
			down:76,
			inUse: false,
			color:'#f0f',
		}
	],
	hittest: function(newx,newy){
			if (
				//if curve has hit the right end
				newx > config.canvasWidth ||
				// if curve has hit the left end
				newx < 0 ||
				//if curve has hit the bottom end
				newy > config.canvasHeight ||
				//if the curve has hit top end
				newy < 0 ||
				//if the curve hit another curve or itself
				config.context.getImageData(newx,newy,1,1).data[3] > 100) {
				//return true -> inidicates that the curve hit something.
				return true;
			}
			//did not hit anything
			return false;
	},
	startGame: function(){
		this.set('paused',false);
		this.set('playing', true);
	},
	init : function() {
	}
});