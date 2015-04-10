'use strict';

describe('Chunker', function () {

  it('should accept and return a matrix', function(){
    var matrix = [1, 2, 3, 4];
    var expected = [[1, 2], [3, 4]];
    var result = chunk(2, 2, matrix);

    expect(result).toEqual(expected);
  });

});

describe('Counter', function () {
  
  it('should accept and return a matrix', function(){
    var matrix = [[]];
    var result = danger(matrix);
    expect(result).toBe(matrix);
  });

  it('should accept and return a matrix', function(){
    var matrix = [[new Tile(), new Tile(), new Bomb()]];
    var result = danger(matrix);
    expect(result[0][0].danger).toBe(0);
    expect(result[0][1].danger).toBe(1);
    // don't actually care what the bomb danger is
    // expect(result[0][2].danger).toBe(matrix);
  });

});
