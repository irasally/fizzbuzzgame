(function(){
  var FizzBuzzGame = Backbone.Model.extend({
    defaults: function() {
      return {
        number: this.getRandom(),
        consecutiveCorrectAnswers: 0 
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

  var Timer = Backbone.Model.extend({
    defaults: function() {
      return {
        time: 100,
        rest: 100
      };
    }
  });
  var TimerView = Backbone.View.extend({
    tagName: 'p',
    template: _.template($('#timer-template').html()),
    render: function(){
      var template = this.template(this.model.toJSON());
      this.$el.html(template);
      return this;
    }
  });

  var AnswersView = Backbone.View.extend({
    tagName: 'p',
    template: _.template($('#answers-template').html()),
    render: function () {
      var template = this.template();
      this.$el.html(template);
      return this;
    }
  });

  var AnswerCountView = Backbone.View.extend({
    el: '#answerCount',
    initialize: function(){
      this.model.on('change', this.render, this);
    }
  });
  var GameView = Backbone.View.extend({
    el: $('#game'),
    initialize: function(){
      this.model.on('change', this.render, this);
    },
    events: {
      "click .answer": "checkFizzBuzz",
      "click #regenerate": "regenerate"
    },
    checkFizzBuzz: function (e) {
      var type = e.target.id;
      var num = this.model.get('number');
      var answer = this.model.getFizzBuzzType();
      var message;
      if(type == answer) {
        message = '正解';
        this.model.set('consecutiveCorrectAnswers', this.model.get('consecutiveCorrectAnswers') + 1 );
      } else {
        message = 'ブッ、ブー！！！正解は ' + answer + ' です。';
        this.model.set('consecutiveCorrectAnswers', 0);
      }
      var result = new Result({message: message});
      var resultView = new ResultView({model: result});
      this.$el.children('#controls').html(resultView.render().el);
    },
    regenerate: function() {
      this.model.regenerate();
    },
    template: _.template($('#game-template').html()),
    render: function () {
      var template = this.template(this.model.toJSON());
      this.$el.html(template);
      var ansersView = new AnswersView();
      this.$el.children('#controls').html(ansersView.render().el);

      var timer = new Timer();
      var timerView = new TimerView({model: timer});
      this.$el.children('#timer').html(timerView.render().el);

      return this;
    }
  });

  var game = new FizzBuzzGame();
  var gameView = new GameView({model: game});
  game.regenerate();
})();
