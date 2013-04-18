var Game = function(){
  this.stacks = [[3,2,1],[],[]];
};

var Controller = function(){
  this.game = new Game();
  this.moves = [];
};

Game.prototype.moveDisc = function(origin, dest){
  if( origin.length > 0 &&
      (dest.length == 0 || origin[origin.length - 1] < dest[dest.length - 1]) ) {
      dest.push(origin.pop());
  } else {
    console.log("invalid move!");
  }
};

Game.prototype.isWon = function() {
  return (this.stacks[1].length == 3 || this.stacks[2].length == 3);
};


Controller.prototype.drawStacks = function() {
  for(j = 0; j < 3; j++) {
    var stack = this.game.stacks[j];
    var discString = "";

    for(i = 0; i < stack.length; i++) {
      discString = discString + this.discize(stack[stack.length - i - 1]);
    }

    $("[data-stack-id='" + j + "']").html(discString);
  }
};

Controller.prototype.discize = function(stackId){
  return "<div class='disc' id='disc" + stackId + "'></div>";
};

Controller.prototype.checkForHighlights = function(){
  $("td").hover(function() {
      $(this).addClass("highlight");
    }, function() {
      $(this).removeClass("highlight");
    }
  );
};

Controller.prototype.conductMove = function() {
  this.game.moveDisc(this.game.stacks[this.moves[0]], this.game.stacks[this.moves[1]]);
  this.drawStacks();
};


Controller.prototype.setWinningMessage = function() {
    $("table").append("<label>You Win!</label>")
              .append("<button class='reset'>Reset</button>");

    this.prepareForReset();
};


Controller.prototype.resetGame = function(){
  this.game = new Game();
  $("td").removeClass();
  this.drawStacks();
};

Controller.prototype.setupSelectStackHandler = function() {
  var that = this;

  $("td").on("click", function() {
      tdEl = $(this);
      tdEl.addClass("selected");
      that.addMoveToQueue(tdEl);
    });

};

Controller.prototype.addMoveToQueue = function(that) {
  this.moves.push(that.attr("data-stack-id"));
  if(this.moves.length == 2) {
    this.conductMove();
    this.moves = [];
    $("td").removeClass("selected");

    if (this.game.isWon()) {
      this.setWinningMessage();
    }
  }
};

Controller.prototype.prepareForReset = function(){
  var that = this;
  $("button").on("click", function() {
      $(this).remove();
      $("label").remove();
      that.resetGame();
    });
};


$(document).on("ready", function() {
  var controller = new Controller();
  controller.checkForHighlights();
  controller.setupSelectStackHandler();
  console.log("Everything loaded!");
});