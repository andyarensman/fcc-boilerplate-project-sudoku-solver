const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
  //Solve a puzzle with valid puzzle string: POST request to /api/solve
  test('SOLVE: Puzzle with valid string', done => {
    chai.request(server)
    .post('/api/solve')
    .send({
      puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
    })
    .end((error, res) => {
      assert.isObject(res.body)
      done();
    })
  })

  //Solve a puzzle with missing puzzle string: POST request to /api/solve
  test('SOLVE: Missing puzzle string', done => {
    chai.request(server)
    .post('/api/solve')
    .send({
      puzzle: ''
    })
    .end((error, res) => {
      assert.equal(res.body.error, 'Required field missing')
      done();
    })
  })

  //Solve a puzzle with invalid characters: POST request to /api/solve
  test('SOLVE: Invalid Character', done => {
    chai.request(server)
    .post('/api/solve')
    .send({
      puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37A'
    })
    .end((error, res) => {
      assert.equal(res.body.error, 'Invalid characters in puzzle')
      done();
    })
  })


  //Solve a puzzle with incorrect length: POST request to /api/solve
  test('SOLVE: Incorrect Length', done => {
    chai.request(server)
    .post('/api/solve')
    .send({
      puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37'
    })
    .end((error, res) => {
      assert.equal(res.body.error, 'Expected puzzle to be 81 characters long')
      done();
    })
  })

  //Solve a puzzle that cannot be solved: POST request to /api/solve
  test('SOLVE: Cannot Be Solved', done => {
    chai.request(server)
    .post('/api/solve')
    .send({
      puzzle: '.99..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..'
    })
    .end((error, res) => {
      assert.equal(res.body.error, 'Puzzle cannot be solved')
      done();
    })
  })

  //Check a puzzle placement with all fields: POST request to /api/check
  test('CHECK: All Fields Pass', done => {
    chai.request(server)
    .post('/api/check')
    .send({
      puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
      coordinate: 'A1',
      value: '7'
    })
    .end((error, res) => {
      assert.isTrue(res.body.valid)
      done();
    })
  })

  //Check a puzzle placement with single placement conflict: POST request to /api/check
  test('CHECK: Single Placement Conflict', done => {
    chai.request(server)
    .post('/api/check')
    .send({
      puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
      coordinate: 'A4',
      value: '9'
    })
    .end((error, res) => {
      assert.isFalse(res.body.valid)
      assert.include(res.body.conflict, 'row')
      done();
    })
  })

  //Check a puzzle placement with multiple placement conflicts: POST request to /api/check
  test('CHECK: Multiple Placement Conflict', done => {
    chai.request(server)
    .post('/api/check')
    .send({
      puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
      coordinate: 'B3',
      value: '4'
    })
    .end((error, res) => {
      assert.isFalse(res.body.valid)
      assert.include(res.body.conflict, 'row')
      assert.include(res.body.conflict, 'region')
      done();
    })
  })

  //Check a puzzle placement with all placement conflicts: POST request to /api/check
  test('CHECK: All Placement Conflict', done => {
    chai.request(server)
    .post('/api/check')
    .send({
      puzzle: '..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..',
      coordinate: 'A1',
      value: '5'
    })
    .end((error, res) => {
      assert.isFalse(res.body.valid)
      assert.include(res.body.conflict, 'row')
      assert.include(res.body.conflict, 'column')
      assert.include(res.body.conflict, 'region')
      done();
    })
  })

  //Check a puzzle placement with missing required fields: POST request to /api/check
  test('CHECK: Missing Fields', done => {
    chai.request(server)
    .post('/api/check')
    .send({
      puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.'
    })
    .end((error, res) => {
      assert.equal(res.body.error, 'Required field(s) missing')
      done();
    })
  })

  //Check a puzzle placement with invalid characters: POST request to /api/check
  test('CHECK: Invalid Character', done => {
    chai.request(server)
    .post('/api/check')
    .send({
      puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37A',
      coordinate: 'A2',
      value: '3'
    })
    .end((error, res) => {
      assert.equal(res.body.error, 'Invalid characters in puzzle')
      done();
    })
  })

  //Check a puzzle placement with incorrect length: POST request to /api/check
  test('CHECK: Incorrect Length', done => {
    chai.request(server)
    .post('/api/check')
    .send({
      puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37',
      coordinate: 'A2',
      value: '3'
    })
    .end((error, res) => {
      assert.equal(res.body.error, 'Expected puzzle to be 81 characters long')
      done();
    })
  })

  //Check a puzzle placement with invalid placement coordinate: POST request to /api/check
  test('CHECK: Invalid Placement Coords', done => {
    chai.request(server)
    .post('/api/check')
    .send({
      puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
      coordinate: 'Z2',
      value: '3'
    })
    .end((error, res) => {
      assert.equal(res.body.error, 'Invalid coordinate')
      done();
    })
  })

  //Check a puzzle placement with invalid placement value: POST request to /api/check
  test('CHECK: Invalid Placement Value', done => {
    chai.request(server)
    .post('/api/check')
    .send({
      puzzle: '1.5..2.84..63.12.7.2..5.....9..1....8.2.3674.3.7.2..9.47...8..1..16....926914.37.',
      coordinate: 'A2',
      value: 'B'
    })
    .end((error, res) => {
      assert.equal(res.body.error, 'Invalid value')
      done();
    })
  })

});

