'use strict';

const SudokuSolver = require('../controllers/sudoku-solver.js');

var regExCoord = /^([A-I])([1-9])$/
var regExValue = /^([1-9])$/

module.exports = function (app) {
  
  let solver = new SudokuSolver();

  app.route('/api/check')
    .post((req, res) => {
      var puzzle = req.body.puzzle;
      var coordinate = req.body.coordinate;
      var value = req.body.value;

      var responseObject = {
        valid: false,
        conflict: []
      };

      //checking the puzzle
      if (!puzzle || !coordinate || !value) {
        return res.json({ error: 'Required field(s) missing' })
      } else if (puzzle.length != 81) {
        return res.json({ error: 'Expected puzzle to be 81 characters long' })
      } else if (solver.validate(puzzle) === false) {
        return res.json({ error: 'Invalid characters in puzzle' })
      }

      //checking the coordinate
      if (!regExCoord.test(coordinate)) {
        return res.json({ error: 'Invalid coordinate'})
      }

      //checking the value
      if (!regExValue.test(value)) {
        return res.json({ error: 'Invalid value'})
      }

      var row = coordinate[0];
      var column = coordinate[1];

      var checkRowPlacement = solver.checkRowPlacement(puzzle, row, column, value);
      var checkColPlacement = solver.checkColPlacement(puzzle, row, column, value);
      var checkRegionPlacement = solver.checkRegionPlacement(puzzle, row, column, value);

      if (checkRowPlacement == false) {
        responseObject.conflict.push('row')
      }

      if (checkColPlacement == false) {
        responseObject.conflict.push('column')
      }

      if (checkRegionPlacement == false) {
        responseObject.conflict.push('region')
      }

      if (checkRowPlacement == true && checkColPlacement == true && checkRegionPlacement == true) {
        responseObject.valid = true
        delete responseObject.conflict
      }

      res.json(responseObject)

    });
    
  app.route('/api/solve')
    .post((req, res) => {
      var puzzle = req.body.puzzle;
      var responseObject = {};

      if (!puzzle) {
        return res.json({ error: 'Required field missing' })
      } else if (puzzle.length != 81) {
        return res.json({ error: 'Expected puzzle to be 81 characters long' })
      } else if (solver.validate(puzzle) === false) {
        return res.json({ error: 'Invalid characters in puzzle' })
      } else if (solver.solve(puzzle).split('').includes('.')) {
        return res.json( { error: 'Puzzle cannot be solved'})
      }

      //console.log(puzzle.split(''))
      console.log(solver.solve(puzzle))
      responseObject.solution = solver.solve(puzzle)

      res.json(responseObject)
    });
};
