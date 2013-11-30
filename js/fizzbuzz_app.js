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
    events: {
      "click #fizz" : "isFizz"
    },
    isFizz: function(){
      var num = this.model.get('number');
      alert("Fizzを押しました。現在の数字は" + num + "です。");
    }
  });

  var game = new FizzBuzzGame();
  console.log(game.get('number'));
  var gameView = new GameView({model: game});
})();
