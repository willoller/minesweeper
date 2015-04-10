'use strict';

describe('Minesweeper', function () {
  
  var bombTile = function(){
    return new Bomb();
  };
  var safeTile = function(){
    return new Tile();
  };

  var game = null;

  beforeEach(function(){
    var minesweeper = Minesweeper();
    game = minesweeper.game;
  });

  it('should win when there are no more tiles you can click', function(){
    var tile = safeTile();
    game.loop(tile);
    console.log(game);
    expect(game.state).toBe('win');
  });

  it('should have tiles that are not bombs', function(){
    var tile = safeTile();
    expect(tile.isBomb).toBe(false);
    tile = bombTile();
    expect(tile.isBomb).toBe(true);
  });

  it('should have tiles that are bombs', function(){
    var tile = bombTile();
    expect(tile.isBomb).toBe(true);
  });

  it('should lose when you click a bomb', function(){
    var tile = bombTile();
    game.loop(tile);
    expect(game.state).toBe('lose');
  });

  it('should not lose when you click an empty tile', function(){
    var tile = safeTile();
    game.loop(tile);
    expect(game.state).not.toBe('lose');
  });

  it('should have a matrix of tiles', function(){
    var tile = safeTile();
    game.tiles = [[tile]];
    expect(game.tiles[0][0]).toBe(tile);
  });

  it('should create some tiles', function(){
    var tiles = game.fillTiles(7,11,8);
    expect(tiles.length).toEqual(77);
  });

});