angular.module('minesweeper', []);

var app = angular.module('minesweeper');

var MinesweeperController = ['$scope', '$q', function($scope, $q){
    $scope.height = 20;
    $scope.width = 20;
    $scope.bombs = 40;

    $scope.resetGame = function(){
        var minesweeper = new Minesweeper();
        minesweeper.game.startGame($scope.height, $scope.width, $scope.bombs);
        $scope.game = minesweeper.game;
        $scope.tiles = $scope.game.tiles;
    };
    $scope.resetGame();

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

app.directive('toggleColor', function($parse) {
    return function(scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function(event) {
            scope.$apply(function() {
                event.preventDefault();
                if (element.hasClass('color')){
                    element.removeClass('color');
                }
                else {
                    element.addClass('color');
                }
            });
        });
    };
});