(function(){
  var Game = Backbone.Model.extend({
    defaults: function() {
      return {
        number: this.getRandom()
      };
    },
    getRandom: function(){
      return 5; // rand
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

  var game = new Game();
  console.log(game.get('number'));
  var gameView = new GameView({model: game});
})();
