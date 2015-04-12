# Minesweeper Clone

[Play the game](http://willoller.github.io/minesweeper/#)

The code is separated into 2 separate structures: the game and the display.

The game engine sets up the playable landscape by:

1. Taking in the game board height, width, and bomb count
2. Generate all the bomb tiles
3. Generate tiles to fill the rest of the board
4. Randomly shuffle the array of tiles
5. Turn the array of tiles into a matrix with the established height and width
6. Calculate adjacent bombs and give each tile the result

Tiles keep track of their own properties, including:
- `(bool) clicked` - has the tile been clicked?
- `(bool) isBomb` - This is the only difference between a tile and a bomb
- `(int) danger` - this is the number of adjacent bombs

The game engine has a `loop()` function which is run every time a tile is clicked.
It prevents tiles from being clicked after the game has been lost.
If the tile clicked is a bomb, the game ends in a loss. Otherwise, the tile is set to clicked, and if the tile has no danger, all adjacent tiles are also processed by `loop()`.

All the display attributes are handled by the other part of the application, written with Angular.

One part of the gameplay which I implemented in the display side is the right-click flagging feature. I decided to keep this in the display so other frontend implementations could have multiple flags (like the original windows) or no flags (to make it even harder).



