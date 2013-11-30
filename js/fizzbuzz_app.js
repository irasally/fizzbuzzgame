(function(){
  var FizzBuzzGame = Backbone.Model.extend({
    defaults: function() {
      return {
        number: this.getRandom()
      };
    },
    getRandom: function(){
      return 1 + parseInt(100 * Math.random()); // rand
    },
    getFizzBuzzType: function () {
      var number = this.get('number'); // or "buzz" or "fizzbuzz" or "others"
      var isFizz = (number % 3) === 0;
      var isBuzz = (number % 5) === 0;
      if (isFizz && isBuzz) return 'fizzbuzz';
      if (isFizz) return 'fizz';
      if (isBuzz) return 'buzz';
      return 'others';
    },
    regenerate: function () {
      this.set('number', this.getRandom());
    }
  });
  var Result = Backbone.Model.extend({
    defaults: {
      message: 'hello'
    }
  });
  var ResultView = Backbone.View.extend({
    tagName: 'p',
    template: _.template($('#result-template').html()),
    render: function(){
      var template = this.template(this.model.toJSON());
      this.$el.html(template);
      return this;
    }
  });

  var GameView = Backbone.View.extend({
    el: $('#game'),
    initialize: function(){
      this.model.on('change', this.showNum, this);
    },
    events: {
      "click #fizz": "checkFizzBuzz",
      "click #buzz": "checkFizzBuzz",
      "click #fizzbuzz": "checkFizzBuzz",
      "click #others": "checkFizzBuzz",
      "click #regenerate": "regenerate"
    },
    showNum: function(){
      $('#number').html(this.model.get('number'));
    },
    checkFizzBuzz: function (e) {
      var type = e.target.id;
      var num = this.model.get('number');
      var answer = this.model.getFizzBuzzType();
      var message = (type == answer) ? '正解' : 'ブッ、ブー！！！';
      var result = new Result({message: message});
      console.log(message);
      var resultView = new ResultView({model: result});
      this.$el.children('#result').html(resultView.render().el);
    },
    regenerate: function() {
      this.model.regenerate();
    }
  });

  var game = new FizzBuzzGame();
  var gameView = new GameView({model: game});
  game.regenerate();
})();
