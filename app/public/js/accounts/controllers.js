'use strict';

var accountControllers = angular.module("accountControllers", ['accountServices']);

accountControllers.controller("NavbarUserController",
        function($scope, $rootScope, $state, UserServices) {

          $scope.currentUser = UserServices.getCurrentUser();

          console.log($scope.currentUser.firstName);


        });

accountControllers.controller("LoginPageController",
        function($scope) {

          $scope.isLoggingIn = false;

        });

accountControllers.controller("FormValidationController",
        function($scope) {

              $scope.validationActive = false;
              $scope.showValidation = function() {
                  $scope.validationActive = true;
              };
              $scope.hideValidation = function() {
                  $scope.validationActive = false;
              };

            });

accountControllers.controller("AuthController",
        function($scope, $rootScope, $state, AuthenticationService, UserServices) {

            $scope.login = function(loginForm) {

              if(!loginForm.$valid) {
                  return;
              }

              var loginCredentials = {
                  username: $scope.username,
                  password: $scope.password
              };

              //console.log($scope.username);

              var onSuccess = function(user) {

                $scope.isLoggingIn = false;

                UserServices.setCurrentUser(user);

                console.log(user);

                $state.go('home');

              };

              var onFailure = function(data) {

                 $scope.isLoggingIn = false;

                 console.log('error', data);

              }

              $scope.isLoggingIn = true;

              AuthenticationService.login(loginCredentials).$promise.then(onSuccess, onFailure);

            }; // end of function

        });
