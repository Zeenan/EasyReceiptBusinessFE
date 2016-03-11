'use strict';

var accountServices = angular.module('accountServices', ['ngResource']);

accountServices.factory('AuthenticationService', ['$resource', 'apiConstants',
        function($resource, apiConstants) {
    return $resource(apiConstants.localURL + '/users/login', {}, {
        login: {
            method: 'POST',
            isArray: false,
            withCredentials: true
        },
        logout: {
            method: 'DELETE',
            isArray: false,
            withCredentials: true
        }
    });
}]);

accountServices.factory('UserServices', [function() {

    var currentUser= {};

    var setCurrentUser = function(user) {

        currentUser = user;
    };

    var getCurrentUser = function() {

      return currentUser;

    };

    return {
      setCurrentUser: setCurrentUser,
      getCurrentUser: getCurrentUser
    };
}]);
