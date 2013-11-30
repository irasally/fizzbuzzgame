(function(){
  var FizzBuzzGame = Backbone.Model.extend({
    defaults: function() {
      return {
        number: this.getRandom()
      };
    },
    getRandom: function(){
      return 5; // rand
    },
    getFizzBuzzType: function () {
        return "fizz"; // or "buzz" or "fizzbuzz" or "others"
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
