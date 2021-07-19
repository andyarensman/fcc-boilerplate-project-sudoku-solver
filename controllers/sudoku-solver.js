var regex = /\d|\./
var rowFinder = {
  'A': {startIndex: 0, endIndexPlusOne: 9},
  'B': {startIndex: 9, endIndexPlusOne: 18},
  'C': {startIndex: 18, endIndexPlusOne: 27},
  'D': {startIndex: 27, endIndexPlusOne: 36},
  'E': {startIndex: 36, endIndexPlusOne: 45},
  'F': {startIndex: 45, endIndexPlusOne: 54},
  'G': {startIndex: 54, endIndexPlusOne: 63},
  'H': {startIndex: 63, endIndexPlusOne: 72},
  'I': {startIndex: 72, endIndexPlusOne: 81}
}

var letterToIndex = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I'];
var coordinateArray = ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8', 'A9', 
                        'B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B9', 
                        'C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8', 'C9', 
                        'D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 
                        'E1', 'E2', 'E3', 'E4', 'E5', 'E6', 'E7', 'E8', 'E9', 
                        'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 
                        'G1', 'G2', 'G3', 'G4', 'G5', 'G6', 'G7', 'G8', 'G9', 
                        'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'H7', 'H8', 'H9', 
                        'I1', 'I2', 'I3', 'I4', 'I5', 'I6', 'I7', 'I8', 'I9'];
var regionStartIndex = ['A1', 'A4', 'A7', 'D1', 'D4', 'D7', 'G1', 'G4', 'G7'];
var startIndexArray = [0, 3, 6, 27, 30, 33, 54, 57, 60]


//work around ---------------------------------------------
function checkRowPlacementAlt(puzzleString, row, column, value) {
  var startIndex = rowFinder[row].startIndex;
  var endIndexPlusOne = rowFinder[row].endIndexPlusOne;
  var rowToCheckStr = puzzleString.slice(startIndex, endIndexPlusOne)

  var rowToCheck = rowToCheckStr.split("")

  //This is needed if the user enters the the value that's already in the coordinate
  var squareToCheck = rowToCheck[column - 1]

  if (squareToCheck != "." && squareToCheck == value) {
    var index = rowToCheck.indexOf(squareToCheck)
    rowToCheck.splice(index, 1)
  }
  //-------------------------------

  if (rowToCheck.includes(value)) {
    return false
  } else if (!rowToCheck.includes(value)) {
    return true
  }
}

function checkColPlacementAlt(puzzleString, row, column, value) {
  var colToCheck = [];

  for (var i = column - 1; colToCheck.length < 9; i += 9) {
    colToCheck.push(puzzleString[i]);
  }

  //This is needed if the user enters the the value that's already in the coordinate ----
  var squareToCheck = colToCheck[letterToIndex.indexOf(row)]

  if (squareToCheck != "." && squareToCheck == value) {
    var index = colToCheck.indexOf(squareToCheck)
    colToCheck.splice(index, 1)
  }
  //-------------------------------

  if (colToCheck.includes(value)) {
    return false
  } else if (!colToCheck.includes(value)) {
    return true
  }
}

function checkRegionPlacementAlt(puzzleString, row, column, value) {
  var regionToCheck = [];

  var startSpot;

  switch (row) {
    case "A":
    case "B":
    case "C":
      startSpot = 0
      break;
    case "D":
    case "E":
    case "F":
      startSpot = 27
      break;
    case "G":
    case "H":
    case "I":
      startSpot = 54
      break;
    default:
      break;
  }
  
  switch (column) {
    case "1":
    case "2":
    case "3":
      break;
    case "4":
    case "5":
    case "6":
      startSpot = startSpot + 3
      break;
    case "7":
    case "8":
    case "9":
      startSpot = startSpot + 6
      break;
    default:
      break;
  }

  for (var i = startSpot; regionToCheck.length < 9; i += 9) {
    for (var j = 0; j < 3; j++ ) {
      regionToCheck.push(puzzleString[i + j]);
    }
  }

  //Needed if the user enters the the value that's already in the coordinate -----
  var startIndex = rowFinder[row].startIndex;
  var endIndexPlusOne = rowFinder[row].endIndexPlusOne;
  var rowToCheckStr = puzzleString.slice(startIndex, endIndexPlusOne)
  var rowToCheck = rowToCheckStr.split("")
  var squareToCheck = rowToCheck[column - 1]
  
  
  if (squareToCheck != "." && squareToCheck == value) {
    var index = regionToCheck.indexOf(squareToCheck)
    regionToCheck.splice(index, 1)
  }
  //-------------------------------
  //console.log(regionToCheck)
  if (regionToCheck.includes(value)) {
    return false
  } else if (!regionToCheck.includes(value)) {
    return true
  }

}

//------------------------------------------------------

class SudokuSolver {

  validate(puzzleString) {
    for (var i = 0; i < puzzleString.length; i++) {
      if (!regex.test(puzzleString[i])) {
        return false
      } else if (puzzleString.length != 81) {
      return false 
      }
    }
    return true
  }

  checkRowPlacement(puzzleString, row, column, value) {
    var startIndex = rowFinder[row].startIndex;
    var endIndexPlusOne = rowFinder[row].endIndexPlusOne;
    var rowToCheckStr = puzzleString.slice(startIndex, endIndexPlusOne)

    var rowToCheck = rowToCheckStr.split("")

    //This is needed if the user enters the the value that's already in the coordinate
    var squareToCheck = rowToCheck[column - 1]

    if (squareToCheck != "." && squareToCheck == value) {
      var index = rowToCheck.indexOf(squareToCheck)
      rowToCheck.splice(index, 1)
    }
    //-------------------------------

    if (rowToCheck.includes(value)) {
      return false
    } else if (!rowToCheck.includes(value)) {
      return true
    }
  }

  checkColPlacement(puzzleString, row, column, value) {
    var colToCheck = [];

    for (var i = column - 1; colToCheck.length < 9; i += 9) {
      colToCheck.push(puzzleString[i]);
    }

    //This is needed if the user enters the the value that's already in the coordinate ----
    var squareToCheck = colToCheck[letterToIndex.indexOf(row)]

    if (squareToCheck != "." && squareToCheck == value) {
      var index = colToCheck.indexOf(squareToCheck)
      colToCheck.splice(index, 1)
    }
    //-------------------------------

    if (colToCheck.includes(value)) {
      return false
    } else if (!colToCheck.includes(value)) {
      return true
    }
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    var regionToCheck = [];

    var startSpot;

    switch (row) {
      case "A":
      case "B":
      case "C":
        startSpot = 0
        break;
      case "D":
      case "E":
      case "F":
        startSpot = 27
        break;
      case "G":
      case "H":
      case "I":
        startSpot = 54
        break;
      default:
        break;
    }
    
    switch (column) {
      case "1":
      case "2":
      case "3":
        break;
      case "4":
      case "5":
      case "6":
        startSpot = startSpot + 3
        break;
      case "7":
      case "8":
      case "9":
        startSpot = startSpot + 6
        break;
      default:
        break;
    }

    for (var i = startSpot; regionToCheck.length < 9; i += 9) {
      for (var j = 0; j < 3; j++ ) {
        regionToCheck.push(puzzleString[i + j]);
      }
    }

    //Needed if the user enters the the value that's already in the coordinate -----
    var startIndex = rowFinder[row].startIndex;
    var endIndexPlusOne = rowFinder[row].endIndexPlusOne;
    var rowToCheckStr = puzzleString.slice(startIndex, endIndexPlusOne)
    var rowToCheck = rowToCheckStr.split("")
    var squareToCheck = rowToCheck[column - 1]
    
    
    if (squareToCheck != "." && squareToCheck == value) {
      var index = regionToCheck.indexOf(squareToCheck)
      regionToCheck.splice(index, 1)
    }
    //-------------------------------

    if (regionToCheck.includes(value)) {
      return false
    } else if (!regionToCheck.includes(value)) {
      return true
    }

  }

  solve(puzzleString) {
    var currentPuzzleArray = puzzleString.split('')
    
    
    function checkEverySquare() {
     
      var previousPuzzleArray = [...currentPuzzleArray];

      var currentRow = "A"
      var currentColumn = "1"

      for (var i = 0; i < 81; i++) {
        //does square check
        if (currentPuzzleArray[i] == '.') {
          //check if there is only one number possible
          var possibleSolutions = [];
          for (var num = 1; num < 10; num++) {  //looping through one square
            if (checkRowPlacementAlt(currentPuzzleArray.join(''), currentRow, currentColumn, num.toString())
              && checkColPlacementAlt(currentPuzzleArray.join(''), currentRow, currentColumn, num.toString())
              && checkRegionPlacementAlt(currentPuzzleArray.join(''), currentRow, currentColumn, num.toString())) {
                possibleSolutions.push(num.toString())
              }
          }
          //console.log("possible Solutions for index " + i +": " + possibleSolutions)
          if (possibleSolutions.length == 1) {
            currentPuzzleArray.splice(i, 1, possibleSolutions[0])
          }
          //--------------------
        }
        //updates coordinate
        if (i < 80) {
          currentRow = coordinateArray[i + 1][0]
          currentColumn = coordinateArray[i + 1][1]
        }
      }
      //recursion ------
      if (!currentPuzzleArray.includes('.') || currentPuzzleArray.join('') == previousPuzzleArray.join('')) {
        //end loop
        //console.log("recursion complete: Check Every Square")
      } else {
        checkEverySquare()
      }
      
    }
    
    checkEverySquare()

    /*
    function checkEveryRegion() {
      var previousPuzzleArray = currentPuzzleArray;

      //iterate through each region
      for (var m = 0; m < 9; m++) {
        var currentRow = regionStartIndex[m][0]
        var currentColumn = regionStartIndex[m][1]
        var startSpot = startIndexArray[m]

        var currentRegionArray = [];
        for (var i = startSpot; currentRegionArray.length < 9; i += 9) {
          for (var j = 0; j < 3; j++ ) {
            currentRegionArray.push(currentPuzzleArray[i + j]);
          }
        }
        //console.log("current region: " + currentRegionArray)
      }

    }

    //checkEveryRegion()*/

    return currentPuzzleArray.join('')
    
  }
}

module.exports = SudokuSolver;

