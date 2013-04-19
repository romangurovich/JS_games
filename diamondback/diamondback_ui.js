var Controller = function() {
  this.game = new Game();
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
+
      switch(this.game.board.playArea[i][j]) {
        case null:
          classToAdd = "empty";
          break;
        case "aa":
          classToAdd = "fruit";
          break;
        case "CR":
          classToAdd = "snake";
          break;
        default:
          classToAdd = "shit";
        }
      var squareEl = "<td data-row='" + i +
                       "' data-col='" + j + "'></td>";


      $(squareEl).removeClass();
      $(squareEl).addClass(classToAdd);
    }
  }

};

$(document).ready(function() {
  controller = new Controller();
  controller.buildBoard();
  controller.render();
});