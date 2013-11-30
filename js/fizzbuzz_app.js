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
      "click #fizz" : "isFizz",
      "click #buzz" : "isBuzz",
      "click #fizzbuzz" : "isFizzbuzz",
      "click #others" : "isOthers"
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

  var game = new Game();
  console.log(game.get('number'));
  var gameView = new GameView({model: game});
})();
