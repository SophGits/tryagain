
// OBJECTS ///////////////////////////////////////////////
var drawing = [
  {id: 1, x1: 20, y1: 20, x2: 100, y2: 100, width: 400, height: 100, color: '#ff0000'},
  {id: 2, x1: 420, y1: 170, x2: 500, y2: 400, width: 100, height: 300, color: '#00ff00'},
  {id: 3, x1: 120, y1: 220, x2: 500, y2: 400, width: 100, height: 50, color: 'blue'}
];
var bubbles = [
  {id: 1, cx: 40, cy: 30, r: 50, color: "lightyellow"}
]

// MODELS /////////////////////////////////////////////////
var Rectangle = Backbone.RelationalModel.extend({
 relations: [{
   type: Backbone.HasMany,
   key: 'circles',
   relatedModel: 'Circle',
   collectionType: 'Circles',
   reverseRelation: {
     key: 'rectangle',
     includeInJSON: 'id'
   }
 }],
 getRandomColour: function() {
   var letters = '0123456789ABCDEF'.split('');
   var color = '#';
   for (var i = 0; i < 6; i++ ) {
       color += letters[Math.floor(Math.random() * 16)];
   }
   return color;
 }
});
var Circle = Backbone.RelationalModel.extend({
  urlRoot: '/circle/',
  defaults: {
    cx: 270,
    cy: 30,
    r: 20,
    color: "lightgreen"
  },
  getRandomSize: function() {
    var radius = 0;
    for (var i = 0; i < 10; i++ ) {
        radius += Math.floor(Math.random() * 3);
    }
    return radius;
  }
});
// MODEL COLLECTIONS //////////////////////////////////////
var Circles = Backbone.Collection.extend({
  model: Circle,
  create: function(selectedRect){
    // var attributes = this.getRectCoords(selectedRect);
    var newCircle = new Circle(this.getQualities(selectedRect));
    this.add(newCircle);
    console.log(newCircle);
  },
  getQualities: function(selectedRect){
    var rectX = function(){
      return selectedRect.attributes.x1 + (Math.random() * selectedRect.attributes
        .width);
    }
    var rectY = selectedRect.attributes.y1;
    return{
      name: 'paired-circle',
      color: selectedRect.get('color'),
      rectangle: selectedRect,
      cx: rectX(),
      cy: selectedRect.attributes.y1
    }
  }
});
var circles = new Circles();

var Rectangles = Backbone.Collection.extend({
  model: Rectangle
});
var rectangles = new Rectangles(drawing);

 // VIEWS //////////////////////////////////////////////////
 // RECTANGLE VIEW //////////////////////////////
 var RectangleView  = Backbone.View.extend({
   events: {
     'click rect': 'handleClick',
     'dblclick rect': 'createBubbles'
   },
   handleClick: function(ev) {
     var id = $(ev.currentTarget).attr('id');
     var rect = this.collection.get(id);
     rect.set('color', rect.getRandomColour());
   },
   render: function() {
     var el = this.$el;
     this.collection.each(function(model) {
       var rect = document.createElementNS("http://www.w3.org/2000/svg", "rect");
       rect.setAttribute('x', model.get('x1'));
       rect.setAttribute('y', model.get('y1'));
       rect.setAttribute('width',  model.get('width'));
       rect.setAttribute('height', model.get('height'));
       rect.setAttribute('style', 'fill:' + model.get('color') + '; stroke: pink');
       rect.id = model.get('id');
       el.append(rect);
     });
     return el;
   },
  initialize: function() {
    this.listenTo(this.collection, 'change:color', this.render);
  },
  createBubbles: function(){
    // use the circles model to generate circle views
    var max = rectangles.length
    var randomRect = Math.floor(Math.random()*(max -1)+1);
    var selectedRect = rectangles.get(randomRect);
    var rectColour = selectedRect.get('color');
    circles.create(selectedRect);
  }
 });
// CIRCLE VIEW ////////////////////////////////
var CircleView = Backbone.View.extend({
  events: {
    'click #place': 'render'
  },
  render: function(){
    var el = this.$el;
    this.collection.each(function(model) {
      // console.log("What gets rendered in circle view: ");
      // console.log(model);
    var bubble = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      bubble.setAttribute('cx', model.get('cx'));
      bubble.setAttribute('cy', model.get('cy'));
      bubble.setAttribute('r', model.getRandomSize() );
      bubble.setAttribute('style', 'fill:' + model.get('color') + '; stroke:orange');
      bubble.id = model.get('id');
      // bubble.rectangle = model.get('rectangle');
      el.append(bubble);
      // console.log("bubble");
      // console.log(bubble);
    });
    return el;
  },
  initialize: function(){
     this.listenTo(this.collection, 'change', this.render);
     this.listenTo(this.collection, 'add', this.render);
  },
  checkWorks: function(){
    // console.log("the circle view works");
  }
})

$(document).ready(function() {
  var rectangleView = new RectangleView({el: $('#rectSvg'), collection: rectangles });
  rectangleView.render();
  var circleView = new CircleView({el: $('#rectSvg'), collection: circles});
  // var circleView = new CircleView({el: $('#place'), collection: circles});
  circleView.render();
});