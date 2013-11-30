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
    },
    regenerate: function () {
      this.set('number', this.getRandom());
    }
  });

  var GameView = Backbone.View.extend({
    el: $('#game'),
    initialize: function(){
      this.model.on('change', this.showNum, this);
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
      this.checkFizzBuzz('fizz');
    },
    isBuzz: function(){
      this.checkFizzBuzz('buzz');
    },
    isFizzbuzz: function(){
      this.checkFizzBuzz('fizzbuzz');
    },
    isOthers: function(){
      this.checkFizzBuzz('others');
    },
    checkFizzBuzz: function(type){
      var num = this.model.get('number');
      var answer = this.model.getFizzBuzzType();
      if (type == answer) {
        alert('正解！');
      } else {
        alert('ブッ、ブー！！！');
      }
    }
  });
  var ResultView = Backbone.View.extend({
/*         <p id="result">あたりです!!!
          <input type="button" id="regenerate" value="again"/>
        </p>
           <input type="button" id="regenerate" value="again"/>
*/
    tagName: 'p'
  });

  var game = new FizzBuzzGame();
  var gameView = new GameView({model: game});
  game.regenerate();
})();
