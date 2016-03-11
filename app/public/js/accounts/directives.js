'use strict';

var directives = angular.module('accountDirectives', ['accountControllers', 'accountServices']);

directives.directive('dashboardNavbar', function() {

    return {

      restrict: 'E',
      replace: true,
      templateUrl: 'partials/dashboard/dashboard-navbar.html',
      controller : function($scope, UserServices) {

          $scope.currentUser = UserServices.getCurrentUser();

      },
      controllerAs: 'dashboardNavbarController'


    };

});
