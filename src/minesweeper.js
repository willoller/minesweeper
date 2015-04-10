var Bomb = function() {
    var tile = new Tile();
    tile.isBomb = true;
    return tile;
}
var Tile = function() {
    var danger = 0;
    return {
        danger:  danger,
        isBomb: false,
        clicked: false,
    }
}

var Minesweeper = function(){

    var fillTiles = function(height, width, bombs){
        var tileCount = height * width;
        var tiles = [];
        for (var i = 0; i < tileCount; i++) {
            if (i < bombs) {
                tiles.push(Bomb());
            } else {
                tiles.push(Tile());
            }
        };

        // Now randomize the whole array
        tiles = shuffle(tiles); 

        game.playableTiles = tiles.length - bombs;

        return tiles;
    }

    var generateTiles = function(height, width, bombs){
        var tiles = fillTiles(height, width, bombs);

        // Chunk it into rows (matrix)
        tiles = chunk(height, width, tiles);

        // Add dangers to the safe tiles
        tiles = danger(tiles);

        return tiles;
    };

    var clickTileByPosition = function(i, j){
        //console.log([i,j]);
        if (game.tiles[i]){
            if (game.tiles[i][j]){
                loop(game.tiles[i][j]);
            }
        }
    };

    var loop = function(tile){
        //console.log(['a', tile.x, tile.y]);
        if (game.state == 'lose') {
            return;
        }
        if (tile.isBomb) {
            game.state = 'lose';
            return;
        }
        if (tile.clicked == true) {
            return;
        }

        tile.clicked = true;

        game.playableTiles = game.playableTiles - 1; 

        if (tile.danger == 0) {
            var i = tile.x;
            var j = tile.y;
            clickTileByPosition(i,   j+1);
            clickTileByPosition(i,   j-1);
            clickTileByPosition(i+1, j);
            clickTileByPosition(i-1, j);
            clickTileByPosition(i-1, j-1);
            clickTileByPosition(i-1, j+1);
            clickTileByPosition(i+1, j-1);
            clickTileByPosition(i+1, j+1);
        }

        if (game.playableTiles <= 0) {
            game.state = 'win';
            return;
        }
    }

    var startGame = function(height, width, bombs){
        game.tiles = generateTiles(height, width, bombs);
    };

    var game = {
        playableTiles: 0,
        state: 'ongoing',
        tiles: [[]],
        fillTiles: fillTiles,
        generateTiles: generateTiles,
        loop: loop,
        startGame: startGame,
    };

    return { game: game };
};
