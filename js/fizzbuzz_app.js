(function(){
  var Game = Backbone.Model.extend({
    defaults: function() {
      return {
        number: this.getRamdom
      };
    },
    getRandom: function(){
      return 5; // rand
    }
  });
})();
