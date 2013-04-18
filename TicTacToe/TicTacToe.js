var HumanPlayer = function(mark) {
  this.mark = mark;
};


var Game = function() {
  this.board = [[null, null, null],[null, null, null],[null, null, null]];
};

var Controller = function(player1, player2) {
  this.player1 = player1;
  this.player2 = player2;
  this.currentPlayer = this.player1;
  this.game = new Game();
};


Game.prototype.renderBoard = function() {
  for(i = 0; i < 3; i++) {
    for(j = 0; j < 3; j++) {
      display_text = this.board[i][j] == null ? "" : this.board[i][j];
      $("[data-row='" + i + "'][ data-col='" + j + "'] label").text(display_text);
    }
  }
};

Game.prototype.over = function() {
  return this.isWon() || this.isDraw();
}

Game.prototype.isDraw = function() {
  for(i = 0; i < 3; i++) {
    for(j = 0; j < 3; j++) {
      if(this.board[i][j] == null) {
        return false;
      }
    }
  }
  return true;
}

Game.prototype.isWon = function() {
  return (this.verticalWin() || this.horizontalWin() || this.diagonalWin());
};

Game.prototype.verticalWin = function() {
  for(i = 0; i < 3; i++) {
    var column = [this.board[0][i], this.board[1][i], this.board[2][i]]
    if(column[0] == column[1] && column[1] == column[2] && column[0] !== null) {
      return true;
    }
  }
  return false;
};

Game.prototype.horizontalWin = function() {
  for(i = 0; i < 3; i++) {
    var row = this.board[i];
    console.log(row);
    console.log(i);
    if(row[0] == row[1] && row[1] == row[2] && row[0] !== null) {
      return true;
    }
  }
  return false;
};

Game.prototype.diagonalWin = function() {
  var diagonal1 = [this.board[0][0], this.board[1][1], this.board[2][2]];
  var diagonal2 = [this.board[0][2], this.board[1][1], this.board[2][0]];
  if(diagonal1[0] == diagonal1[1] &&
     diagonal1[1] == diagonal1[2] &&
     diagonal1[0] !== null) {
    console.log("diag1");
    return true;
  }
  if(diagonal2[0] == diagonal2[1] &&
     diagonal2[1] == diagonal2[2] &&
     diagonal2[0] !== null) {
    console.log("diag2");
    return true;
  }
  return false;
};

Game.prototype.validMove = function(row, col) {
  return this.board[row][col] == null;
};

Game.prototype.markBoard = function(row, col, mark) {
  this.board[row][col] = mark;
};

Controller.prototype.setClickListener = function() {
  var that = this;
  $(".square").on("mousedown", function() {
    $(this).addClass("selected");
  });

  $(".square").on("mouseup", function() {
    $(this).removeClass("selected");
    that.tryMove($(this));
  });
};

Controller.prototype.tryMove = function(square) {

  var row = square.attr("data-row");
  var col = square.attr("data-col");

  if (this.game.validMove(row,col)) {
   this.game.markBoard(row, col, this.currentPlayer.mark);
   this.game.renderBoard();
   if(this.game.over()) {
     this.showGameOverMessage();
     this.setPlayAgainListener();
   } else {
     this.currentPlayer =
       this.currentPlayer == this.player1 ? this.player2 : this.player1;
   }
  }
};

Controller.prototype.setPlayAgainListener = function() {
  var that = this;
  $("button.reset").on("click", function() {
    that.game = new Game();
    that.game.renderBoard();
    $(this).remove();
    $("label#winner").remove();
  });
};

Controller.prototype.showGameOverMessage = function() {

  var message = this.game.isWon() ? this.currentPlayer.mark + " Player Wins!" : "Draw";
  $("table").after("<label class='big' id='winner'>" + message +
    "</label><br><button class='reset'>Play again</button>");
};

$(document).on("ready", function() {
  var player1 = new HumanPlayer("X");
  var player2 = new HumanPlayer("O");
  var controller = new Controller(player1, player2);
  controller.setClickListener();
});