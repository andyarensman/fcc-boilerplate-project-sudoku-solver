const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver();

suite('UnitTests', () => {
  //handles a valid puzzle string of 81 characters
  test('Valid Row Placement', done => {
    var puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    assert.isTrue(solver.validate(puzzleString))
    done();
  })
  
  //handles a puzzle string with invalid characters (not 1-9 or .)
  test('Invalid Characters', done => {
    var input = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37A'
    assert.equal(solver.validate(input), false)
    done();
  })

  //handles a puzzle string that is not 81 characters in length
  test('Invalid Length', done => {
    var input = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....'
    assert.equal(solver.validate(input), false)
    done();
  })

  //handles a valid row placement
  test('Valid Row Placement', done => {
    var puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    var row = "A"
    var column = "2"
    var value =  "3"
    assert.isTrue(solver.checkRowPlacement(puzzleString, row, column, value))
    done();
  })

  //handles an invalid row placement
  test('Invalid Row Placement', done => {
    var puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    var row = "A"
    var column = "2"
    var value =  "5"
    assert.isFalse(solver.checkRowPlacement(puzzleString, row, column, value))
    done();
  })

  //handles a valid column placement
  test('Valid column Placement', done => {
    var puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    var row = "A"
    var column = "2"
    var value =  "3"
    assert.isTrue(solver.checkColPlacement(puzzleString, row, column, value))
    done();
  })

  //handles an invalid column placement
  test('Invalid column Placement', done => {
    var puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    var row = "I"
    var column = "9"
    var value =  "4"
    assert.isFalse(solver.checkColPlacement(puzzleString, row, column, value))
    done();
  })

  //handles a valid region (3x3 grid) placement
  test('Valid Region Placement', done => {
    var puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    var row = "A"
    var column = "2"
    var value =  "3"
    assert.isTrue(solver.checkRegionPlacement(puzzleString, row, column, value))
    done();
  })

  //handles an invalid region (3x3 grid) placement
  test('Invalid Region Placement', done => {
    var puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    var row = "A"
    var column = "2"
    var value =  "5"
    assert.isFalse(solver.checkRegionPlacement(puzzleString, row, column, value))
    done();
  })

  //Valid puzzle strings pass the solver
  test('Valid Puzzle String Pass', done => {
    var puzzleString = '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
    assert.notInclude(solver.solve(puzzleString), '.')
    done();
  })

  //Invalid puzzle strings fail the solver
  test('invalid Puzzle String Fail', done => {
    var puzzleString = '.99..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
    assert.include(solver.solve(puzzleString), '.')
    done();
  })

  //Solver returns the expected solution for an incomplete puzzle
  test('Solver Can Solve', done => {
    var puzzleString = '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    assert.equal(solver.solve(puzzleString), '135762984946381257728459613694517832812936745357824196473298561581673429269145378')
    done();
  })

});
