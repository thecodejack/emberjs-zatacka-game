Game.PlayerView = Ember.View.extend({
    classNames: ['player'],
    //Default Values
    name: 'Death',
    x:0,
    y:0,
    vx:0,
    vy:0,
    angle:0,
    color:"#0F0",
    toMove:false,
    direction:0,
    speed:2,
    hole:0,
    alive:true,
    score:0,
    playing:true,
    upKey:97,
    downKey:115,
    keyLabel:'',
    matchScore:0,

    template: Ember.Handlebars.compile('<h1>Player<span class="keys"></span>: {{view.score}}</h1>'),
    init : function() {
        this.reInitPlayer();
        this._super();
    },
    reInitPlayer : function() {
        var x = Math.round(Math.random() * (config.canvasHeight - (config.canvasWidth*0.6))) + config.canvasWidth*0.3,
        y = Math.round(Math.random() * (config.canvasHeight - (config.canvasHeight*0.6))) +  config.canvasHeight*0.3,

        //generate a random movement angle for the curve
        angle = (Math.random()*360) * Math.PI / 180,

        //calculate the angular velocity
        vx = Math.cos(angle)* this.get('speed'),
        vy = Math.sin(angle)* this.get('speed');
        this.setProperties({
            x:x,
            y:y,
            angle:angle,
            vx:vx,
            vy:vy,
            alive: true,
            matchScore: 0
        });
    },
    keyDown : function(e) {
        console.log("Key Pressed");
    },
    move: function(){
        var newx,
            newy,
            context,
            updated;

        if(this.get('alive') === false) {
            return;
        }

        context = config.context;

        // if the curve is in rotating condition right now
        // calculate the new angular velocity
        if(config.keys[this.get('upKey')]) {
            updated = true;
            this.set('angle', this.get('angle') - (3 * Math.PI/180));
        } else if(config.keys[this.get('downKey')]) {
            updated = true;
            this.set('angle', this.get('angle') + (3 * Math.PI/180));
        }

        if(updated) {
            this.set('vx', Math.cos(this.get('angle')) * this.get('speed'));
            this.set('vy', Math.sin(this.get('angle')) * this.get('speed'));
        }
        //calculate the new curve position
        newx = this.get('x') + this.get('vx');
        newy = this.get('y') + this.get('vy');
        //console.log("x: "+ newx+ ", y:" + newy);
        //check for hittest of the curve.

        if(this.get('hole') > 0) {
            if(this.get('controller').hittest(newx,newy) === true) {
                this.set('alive',false);
                console.log('Player Hit');
                this.get('controller').set('scoreUpdate',Math.random());
            }
            //create a path from the previous position to the new position
            context.beginPath();
            context.fillStyle = this.get('color');
            context.strokeStyle = this.get('color');
            context.lineWidth = config.curveWidth;
            context.moveTo(this.get('x'),this.get('y'));
            context.lineTo(newx,newy);
            context.stroke();
            var hole = this.get('hole');
            this.set('hole',hole--);
        }
        else {
            newx+=5*this.get('vx');
            newy+=5*this.get('vy');
            this.set('hole', Math.round(Math.random() * 500) + 50);
        }
        this.set('x', newx);
        this.set('y', newy);
    },
    updateScore : function() {
        if(this.get('alive')) {
            this.set('score',this.get('score')+1);
            console.log(this.get('score'));
        }
    }.observes('controller.scoreUpdate'),
    didInsertElement : function() {
        this._super();
        this.$('.keys').html(' ' + String.fromCharCode(this.get('upKey')) + ' / ' + String.fromCharCode(this.get('downKey')));
        this.$().css('color',this.get('color'));
        this.move();
    }
});