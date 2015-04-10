angular.module('minesweeper', []);

var app = angular.module('minesweeper');

var MinesweeperController = ['$scope', '$q', function($scope, $q){
    var minesweeper = new Minesweeper();
    minesweeper.game.startGame(20, 20, 40);
    $scope.game = minesweeper.game;
    $scope.tiles = $scope.game.tiles;

    $scope.title = function(){
        if ($scope.game.state == 'lose'){
            return 'Lose!';
        }
        if ($scope.game.state == 'win'){
            return 'Winner!';
        }

        return 'Minesweeper';
    }

    $scope.tileClass = function(tile){
        var result = '';

        if ($scope.game.state == 'lose'){
            if (tile.isBomb)
            {
                return 'bomb';
            }
        }

        if ($scope.game.state == 'win'){
            if (tile.isBomb)
            {
                return 'safe';
            }
        }

        if (tile.clicked){
            result += ' clicked';

            if (tile.danger){
                result += ' danger_' + tile.danger;
            }
        }

        return result;
    };

    $scope.loop = function(tile){
        $scope.game.loop(tile);
    }

    $scope.showDanger = function(tile){
        if (tile.clicked && tile.danger){
            return tile.danger;
        }
    }
}];

app.controller('MinesweeperController', MinesweeperController);

app.directive('minesweeperTile', function(){
    return {
        restrict: 'A',
        link: function link(scope, elem, attrs){

            var tile = scope.tile;

            scope.titleClass = function(){
                console.log(elem);
            }

            if (tile.clicked){
                elem.attr('disabled', 'disabled');
                elem.addClass('clicked');

                if (tile.danger) {
                    elem.html(scope.tile.danger);
                }
            }

            if (scope.game.state == 'lose') {
                if (tile.isBomb){
                    elem.addClass('bomb');
                    elem.html('x');
                }
            }

            elem.bind("click", function(){
                var tile = scope.tile;
                scope.game.loop(tile);
                scope.$apply();
            });
        }
    };
});