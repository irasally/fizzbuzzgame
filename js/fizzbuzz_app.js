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
      return 'others'
    }
  });

  var GameView = Backbone.View.extend({
    el: $('#game'),
    initialize: function(){
      this.showNum();
    },
    events: {
      "click #fizz" : "isFizz",
      "click #buzz" : "isBuzz",
      "click #fizzbuzz" : "isFizzbuzz",
      "click #others" : "isOthers"
    },
    showNum: function(){
      $('#number').html(this.model.get('number'));
    },
    isFizz: function(){
      var num = this.model.get('number');
      alert("Fizzを押しました。現在の数字は" + num + "です。");
    },
    isBuzz: function(){
      var num = this.model.get('number');
      alert("Buzzを押しました。現在の数字は" + num + "です。");
    },
    isFizzbuzz: function(){
      var num = this.model.get('number');
      alert("Fizzbuzzを押しました。現在の数字は" + num + "です。");
    },
    isOthers: function(){
      var num = this.model.get('number');
      alert("Othersを押しました。現在の数字は" + num + "です。");
    }
  });

  var game = new FizzBuzzGame();
  console.log(game.get('number'));
  var gameView = new GameView({model: game});
})();
