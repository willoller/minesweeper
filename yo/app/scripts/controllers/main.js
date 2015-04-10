'use strict';

/**
 * @ngdoc function
 * @name angularjsUnitTestApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the angularjsUnitTestApp
 */
angular.module('angularjsUnitTestApp')
  .controller('MainCtrl', function ($scope) {
    $scope.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
  });
