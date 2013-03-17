test("a Todo begins with completed set to false", function(){
  var todo = Todos.Todo.create();
  equal(todo.get('completed'), false);
});

test("a Todo has access to the localStore store", function(){
  var todo = Todos.Todo.create();
  ok(todo.get('store') instanceof Todos.Store, "todo's store is a Store");
});

test("when a Todo's title changes it automatically saves", function(){
  var todo = Todos.Todo.create();
  var update = sinon.stub(todo.get('store'), 'update');

  Ember.run(function(){
    todo.set('title', 'a new title');
  });

  ok(update.calledOnce);

  update.restore();
});

test("when a Todo's completed status changes it automatically saves", function(){
  var todo = Todos.Todo.create();
  var update = sinon.stub(todo.get('store'), 'update');

  Ember.run(function(){
    todo.toggleProperty('completed');
  });

  ok(update.calledOnce);

  update.restore();
});

test("the Todo constructor has access to the store", function(){
  ok(Todos.Todo.store instanceof Todos.Store, "Todo store is a Store");
});

test("creating a Todo proxies to the store", function(){
  var create = sinon.stub(Todos.Todo.store, 'createRecord'),
      properties = {title: 'hi'};
  Todos.Todo.createRecord(properties);

  ok(create.calledOnce);
  create.restore();
});

test("destroying a Todo proxies to the store", function(){
  var destroy = sinon.stub(Todos.Todo.store, 'destroy'),
      todo = Todos.Todo.createRecord();

  Todos.Todo.destroy(todo);
  ok(destroy.calledOnce);
  destroy.restore();
});

test("asking for all todos proxies to the store", function(){
  var all = sinon.stub(Todos.Todo.store, 'all');
  Todos.Todo.all();

  ok(all.calledOnce);
  all.restore();
});