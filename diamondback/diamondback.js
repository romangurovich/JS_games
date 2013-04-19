// _ = require("underscore")

var Game = function() {
  this.snake = new Snake();
  this.board = new Board(25, 25);
};

var Board = function(height, width) {
  this.height = height;
  this.width = width;
  this.playArea = [];
  this.makePlayArea();
  this.playArea[13][13] = "CR"; // TEST
  this.playArea[13][12] = "CR"; // TEST
  this.playArea[13][11] = "CR"; // TEST
};

var Snake = function() {
 this.moveDelta = [0,-1];
 this.corpus = [[13, 13], [13, 12], [13, 11]];
};

Board.prototype.makePlayArea = function() {
  for(i=0; i < this.height; i++) {
    var middle = [];
    for(j=0; j < this.width; j++) {
      middle.push(null);
    }
    this.playArea.push(middle);
  }
};

Board.prototype.render = function() {
  for(i=0; i < this.playArea.length; i++) {
    console.log(this.playArea[i]);
  }
  console.log("_________________________");
};

Snake.prototype.turn = function (direction) {
  var legalDirs = {south: [0, 1], north: [0, -1], east: [1, 0], west: [-1, 0]}
  if(this.validTurn(direction)) {
    this.moveDelta = legalDirs[direction];
  }
};

Snake.prototype.validTurn = function(direction) {
  legalDirs[direction][0] + this.moveDelta[0] !== 0 ||
  legalDirs[direction][1] + this.moveDelta[1] !== 0;
};

Game.prototype.step = function() {
  var newHead = [ this.snake.moveDelta[0] + this.snake.corpus[0][0],
                  this.snake.moveDelta[1] + this.snake.corpus[0][1]  ];
  this.dontLoseYourHead(newHead);
  this.dropFood();
  if (this.collisionAhead(newHead)) {
    this.youLose();
  } else {
    this.moveSnake(newHead);
  }
};

Game.prototype.dropFood = function() {
  if(Math.floor(Math.random() * 20) + 1 == 7) {
    var dropYCor = (Math.floor(Math.random() * this.board.height));
    var dropXCor = (Math.floor(Math.random() * this.board.width));
    if(this.board.playArea[dropYCor][dropXCor] == null) {
      this.board.playArea[dropYCor][dropXCor] = "aa";
    }
  }
};

Game.prototype.moveSnake = function(newHead) {
  this.snake.corpus.unshift(newHead);
  this.board.playArea[newHead[0]][newHead[1]] = "CR"; //TEST

  if (this.board[newHead] == null) {
    var snakeTail = _.last(this.snake.corpus);
    this.board.playArea[snakeTail[0]][snakeTail[1]] = null; //TEST
    this.snake.corpus.pop();
  }
};

Game.prototype.dontLoseYourHead = function(newHead) {
  console.log(newHead);
  if(newHead[0] >= this.board.height) {
    newHead[0] -= this.board.height
  } else if (newHead[0] < 0) {
    newHead[0] += this.board.height
  }
  if(newHead[1] >= this.board.width) {
    newHead[1] -= this.board.width
  } else if (newHead[1] < 0) {
    newHead[1] += this.board.width
  }
  console.log(newHead);
};

Game.prototype.collisionAhead = function(newHead) {
  var that = this;
  _.contains(that.snake.corpus, newHead);
};

Game.prototype.youLose = function() {
  console.log("you lose");
};

// g.step();




// Snake.prototype.move = function () {
//   newHead = [ this.moveDirs[0] + first(this.corpus)[0],
//               this.moveDirs[1] + first(this.corpus)[1]  ];
//
//   if board.newHead = null
//   this.corpus.pop;
//   this.corpus.unshift(newHead);
// };



