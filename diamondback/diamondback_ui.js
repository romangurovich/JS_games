var Controller = function() {
  this.game = new Game();
  this.paused = false;
};

Controller.prototype.step = function() {
    this.game.step();
    this.render();
};

Controller.prototype.runLoop = function() {
  var that = this;
  var gameLoopId = window.setInterval(function () {
    that.step();
    if (that.paused) {
      clearInterval(gameLoopId);
    }
  }, 150);
};

Controller.prototype.stopLoop = function() {
  this.paused = true;
};

Controller.prototype.buildBoard = function() {
  $("body").append("<table class='board'></table>");
  for(i = 0; i < this.game.board.height; i++) {
    $("table").append("<tr id='row_" + i + "'></tr>")
    for(j = 0; j < this.game.board.width; j++) {
      $("#row_" + i).append("<td data-row='" + i +
                              "' data-col='" + j + "'></td>");
    }
  }
};

Controller.prototype.render = function() {
  for(i = 0; i < this.game.board.height; i++) {
    for(j = 0; j < this.game.board.width; j++) {
      var classToAdd = "snake";

      switch(this.game.board.playArea[i][j]) {
        case null:
          classToAdd = "empty";
          break;
        case "f":
          classToAdd = "fruit";
          break;
        case "s":
          classToAdd = "snake";
          break;
        default:
          classToAdd = "shit";
        }
      var squareEl = "[data-row='" + i + "'][data-col='" + j + "']";

      $(squareEl).removeClass().addClass(classToAdd);
    }
  }
};

Controller.prototype.loadKeyStrokeListeners = function() {
  var that = this;
  $('html').keydown(function (event) {
    switch(event.keyCode){
      case 37:
        that.game.snake.turn("west");
        break;
      case 38:
        that.game.snake.turn("north");
        break;
      case 39:
        that.game.snake.turn("east");
        break;
      case 40:
        that.game.snake.turn("south");
        break;
      case 32:
        that.stopLoop();
        break;
      case 13:
        that.paused = false;
        that.runLoop();
        break;
      default:
        console.log(event.keyCode);
        break;
    }
  });
};

$(document).ready(function() {
  controller = new Controller();
  controller.buildBoard();
  controller.loadKeyStrokeListeners();
  controller.render();
  controller.runLoop();
});