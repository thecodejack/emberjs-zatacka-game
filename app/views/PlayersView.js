Game.PlayersView = Ember.ContainerView.extend({
    elementId: 'playersPanel',
    anime: null,
    init : function() {
        var childViews=this.get('childViews');
        childViews.pushObject(Game.PlayerView.extend({
        }));
        childViews.pushObject(Game.PlayerView.extend({
            color:"#F00",
            upKey:107,
            downKey:108
        }));
        childViews.pushObject(Game.PlayerView.extend({
            color:"#00F",
            upKey:113,
            downKey:119
        }));
        this._super();
    },
    animate : function() {
        var controller=this.get('controller');
        var childViews=this.get('childViews');
        if(!controller.get('paused')) {
            if(childViews.filterProperty('alive', true).length>1) {
                controller.set('anime', requestAnimFrame(this.animate.bind(this)));
                childViews.forEach(function(item, index, enumerable){
                    item.move();
                },this);
            } else {
                controller.set('paused',true);
                childViews.forEach(function(item, index, enumerable){
                    item.reInitPlayer();
                },this);
            }
        } else {
            $('.startGame').text('Continue');
        }
    }.observes('controller.paused'),
    restartGame : function() {
        //location.reload();
        this.rerender();
    }.observes('controller.playing'),
    didInsertElement : function() {
        this._super();
    }
});