// shuffle cribbed from http://stackoverflow.com/a/2450976/33822
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

// Split an array into a matrix
function chunk(rows, cols, list) {
    if (rows * cols == list.length) {
        var result = new Array(rows);

        for (i = 0; i < rows; i++) {
            if (result[i] === undefined) {
                result[i] = [];
            }

            for (j = 0; j < cols; j++) {
                var tile = list.shift();
                tile.x = i;
                tile.y = j;
                result[i].push(tile);
            }
        }

        return result;
    }
}

function increment(i, j, matrix)
{
  if (matrix) {
    if (matrix[i]) {
      if (matrix[i][j]) {
        if (matrix[i][j].danger !== undefined) {
          matrix[i][j].danger++;
        }
      }
    }
  }
}

function danger(matrix) {
  var height = matrix.length;
  var width  = matrix[0].length;

  for (var i = height - 1; i >= 0; i--) {

    for (var j = width - 1; j >= 0; j--) {

      var tile = matrix[i][j];

      if (tile.isBomb) {
        increment(i,   j+1, matrix);
        increment(i,   j-1, matrix);
        increment(i+1, j,   matrix);
        increment(i-1, j,   matrix);
        increment(i-1, j-1, matrix);
        increment(i-1, j+1, matrix);
        increment(i+1, j-1, matrix);
        increment(i+1, j+1, matrix);
      }
    };

  };

  return matrix;
}