
// var setBindings = function() {
//   $( "td" ).on("hover", function() {
//       $(this).toggleClass("highlight");
//     });
// };

var stacks = [[3,2,1],[],[]];
var moves = [];

var addToMoves

var moveDisc = function(origin, dest){
  if(origin.length > 0 &&
    (dest.length == 0 || origin[origin.length-1] < dest[dest.length-1])) {
      dest.push(origin.pop());
  } else {
    console.log("invalid move!");
  }
};

var drawStack = function(stack, stackEl) {
  var discString = ""
  for(i = 0; i < stack.length; i++) {
    discString = discString + discize(stack[stack.length - i - 1]);
  }

  stackEl.html(discString);
};

var discize = function(id){
  return "<div class='disc' id='disc" + id + "'></div>";
};


var checkForHighlights = function(){
  $("td").hover( function()
    {
      $(this).addClass("highlight");
    },
    function()
    {
      $(this).removeClass("highlight");
    }
  );
};

var conductMove = function() {
  moveDisc(stacks[moves[0]], stacks[moves[1]]);
  drawStack(stacks[moves[0]], $("td#stack"+moves[0]));
  drawStack(stacks[moves[1]], $("td#stack"+moves[1]));
}

var checkForWin = function() {
  if(stacks[1].length == 3 || stacks[2].length == 3) {
    $("table").append("<label>You Win!</label>")
              .append("<button class='reset'>Reset</button>");

    prepareForReset();
  }
};

var resetGame = function(){
  stacks = [[3,2,1],[],[]];
  drawStack(stacks[0], $("td#stack0"));
  drawStack(stacks[1], $("td#stack1"));
  drawStack(stacks[2], $("td#stack2"));
};

var selectStack = function() {
  $("td").on("click", function() {
      $(this).addClass("selected");
      moves.push($(this).attr("id").slice(5));
      if(moves.length == 2) {
        conductMove();
        moves = [];
        $("td").removeClass("selected");
        checkForWin();
      }

    });
};

var prepareForReset = function(){
  $("button").on("click", function() {
      console.log('reset clicked');
      console.log($(this));
      $(this).remove();
      $("label").remove();
      resetGame();
    });
};

$(document).on("ready", function() {
  // setBindings();

  checkForHighlights();
  selectStack();
  console.log("Everything loaded!")

  // $("td").on("hover", function() {
//     console.log($(this));
//     $(this).toggleClass("highlight");
//   });
//
//   selectOrigin()
//
//   $("td").on("click", function() {
//     console.log($(this));
//     $(this).toggleClass("selected");
//     var stackId = $(this).class.slice(5);
//
//   });
});