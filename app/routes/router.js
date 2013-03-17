Game.Router.map(function() {
  this.resource("play", {path: "/"});
});


Game.PlayRoute = Ember.Route.extend({

  model: function(){
    //return Todos.Todo.all();
  },

  renderTemplate: function() {
    /*this.render('zatacka',{
      into: 'application',          // the template to render into
      outlet: 'sidepanel'       // the name of the outlet in that template
      //controller: 'blogPost'  // the controller to use for the template
    });*/
  },

  /*
    Events that can occur in any Todo state.
    If a matching event name is not implemented
    on a controller, it will bubble to here.
  */
  events: {
    
   }

});
