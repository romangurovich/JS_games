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
  this.playArea[13][13] = "s";
  this.playArea[13][12] = "s";
  this.playArea[13][11] = "s";
};

var Snake = function() {
 this.moveDelta = [1,0];
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

Snake.prototype.turn = function (direction) {
  var legalDirs = {south: [1, 0], north: [-1, 0], east: [0, 1], west: [0, -1]};

  if(this.validTurn(direction, legalDirs)) {
    this.moveDelta = legalDirs[direction];
  }
};

Snake.prototype.validTurn = function(direction, legalDirs) {
  if (legalDirs[direction][0] + this.moveDelta[0] !== 0 ||
    legalDirs[direction][1] + this.moveDelta[1] !== 0) {
      return true;
  }
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
      this.board.playArea[dropYCor][dropXCor] = "f";
    }
  }
};

Game.prototype.moveSnake = function(newHead) {
  if (this.board.playArea[newHead[0]][newHead[1]] == null) {
    var snakeTail = _.last(this.snake.corpus);
    this.board.playArea[snakeTail[0]][snakeTail[1]] = null;
    this.snake.corpus.pop();
  }

  this.snake.corpus.unshift(newHead);
  this.board.playArea[newHead[0]][newHead[1]] = "s";
};

Game.prototype.dontLoseYourHead = function(newHead) {
  if(newHead[0] >= this.board.height) {
    newHead[0] -= this.board.height;
  } else if (newHead[0] < 0) {
    newHead[0] += this.board.height;
  }
  if(newHead[1] >= this.board.width) {
    newHead[1] -= this.board.width;
  } else if (newHead[1] < 0) {
    newHead[1] += this.board.width;
  }
};

Game.prototype.collisionAhead = function(newHead) {
  var that = this;

  console.log("newhead");
  console.log(newHead);

  console.log("snake corpus");
  console.log(that.snake.corpus);
  console.log(_(that.snake.corpus).contains(newHead));
  return _(that.snake.corpus).contains(newHead);
};

Game.prototype.youLose = function() {
  console.log("you lose");
};
