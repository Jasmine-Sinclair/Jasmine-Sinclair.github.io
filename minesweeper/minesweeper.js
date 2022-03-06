document.addEventListener('DOMContentLoaded', startGame)
document.addEventListener('contextmenu', checkForWin)
document.addEventListener('click', checkForWin)

// Define your `board` object here!
var board = {
  cells: [
    { // 1
      row: 0,
      col: 0,
      isMine: true,
      hidden: true,
    },
    { // 2
      row: 0,
      col: 1,
      isMine: false,
      hidden: true,
    },
    { // 3
      row: 0,
      col: 2,
      isMine: false,
      hidden: true,
    },
    { //4
      row: 1,
      col: 0,
      isMine: false,
      hidden: true,
    },
    { //5
      row: 1,
      col: 1,
      isMine: false,
      hidden: true,
    },
    { //6
      row: 1,
      col: 2,
      isMine: false,
      hidden: true,
    },
    { //7
      row: 2,
      col: 0,
      isMine: false,
      hidden: true,
    },
    { //8
      row: 2,
      col: 1,
      isMine: true,
      hidden: true,
    },
    { //9
      row: 2,
      col: 2,
      isMine: false,
      hidden: true,
    },
  ]
}

function startGame () {
  // write a for loop that will go through the array of cells in the board object
  // the only job of the loop should be to call the countSurroundingMines function for each cell in the board
  for (let i = 0; i < board.cells.length; i++){
    // console.log("number of board cells") //logs 9 times, once for each item in the cells array
    // call the countSurroundingMines function using i as the index, since i changes with each loop iteration and the loop iterates based on the length of the cells array
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
    // assigns the cell the property of surroundingMines, and sets the value of that property to the count value returned by the countSurroundingMines function
  }
  
  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
// needs to loop through all the board.cells
// for each cell (so, board.cells[i]) it needs to check if a cell is a mine and if it is marked
// -if it isn't then just use return as it will break out of the function and any of the following statements won't be read
// if a cell is marked, but there are cells with the hidden property set to true(board.cells[i] === true), then return out
// otherwise play the winner message

for (let i = 0; i < board.cells.length; i++) {
  if (board.cells[i].isMine && !board.cells[i].isMarked) return
  if (board.cells[i].hidden && !board.cells[i].isMine) return
}
  lib.displayMessage('You win!')
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//  var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  // a for loop which combs through the cell objects in the surrounding array
  var surrounding = lib.getSurroundingCells(cell.row, cell.col) // every time the countSurroundingMines functions is called from the above i loop, it creates this local variable, which then uses the cell argument (given to it from the above loop) to get the cells surrounding that cell (using the get surrounding cells). so, every time this is called the surrounding variable changes since it has been declared locally.

  //will return an array of the cells surrounding the one used as an argument to call this function from the above loop
  //loop through that array to check conditions to see if any of the surrounding cells have the isMine = true
  //if = true, then add to a counter

  let count = 0;

  for (let i = 0; i < surrounding.length; i++) {
    //for the length of the array surrounding (which is an array of the cells surrounding the chosen cell)
    //needs to evaluate if any of the surrounding have isMine = true
    if (surrounding[i].isMine){ // for each surrounding cell
      // console.log("it's a mine") // logs 8 times, which is the number of cells surrounding the ones with the mines
      count++;
      //console.log(count, cell, "1") //shows us the count (number of mines surrounding the cell), and also which cell.
    }
  }
  return count
}