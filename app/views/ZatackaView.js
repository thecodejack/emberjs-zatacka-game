Game.ZatackaView = Ember.View.extend({
	elementId: 'sidePanel',
	template: Ember.Handlebars.compile('<h1>Play</h1>'),
	init : function() {
		this._super();
	},
	keyDown : function(e) {
		console.log("Key Pressed");
	},
	click : function(e) {
		if($(e.target).hasClass('startGame')) {
			config.context.clearRect(0, 0, config.canvasWidth, config.canvasHeight);
				this.get('controller').startGame();
		} else if($(e.target).hasClass('resetGame')) {
			//****players rerender would be better option(have to work on that)
			location.reload();
		}
	},
	didInsertElement : function() {
		this._super();
		Ember.run.next(function(){
			$('#Zatacka').on({
				keydown : function(e) {
					console.log('KeyDown');
					var key = (String.fromCharCode(e.which).toLowerCase()).charCodeAt(0);
					config.keys[key] = true;
				},
				keyup : function(e) {
					console.log('KeyUp');
					var key = String.fromCharCode(e.which).toLowerCase().charCodeAt(0);
					config.keys[key] = false;
				}
			});
		});
	}
});