
var app = angular.module('easyReceipts', [
  'ngAnimate',
  'ngMaterial',
  'ngRoute',
  'ui.router',

  'accountControllers',
  'accountServices',
  'accountDirectives'
]);

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/login', {
        templateUrl: 'partials/accounts/login.html',
        controller: 'LoginPageController'
      }).
      when('/home', {
        templateUrl: 'partials/home.html'
      }).
      otherwise({
        redirectTo: '/login'
      });
  }]);

  app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider',
        '$httpProvider',
    function($stateProvider, $urlRouterProvider, $locationProvider,
            $httpProvider) {

        var partialsPath = 'partials/';

        /*
        Notes on extra fields:
        hiHideFooter    the footer directive checks for this, and hides if it is
                        truthy.
        */
        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: partialsPath + 'home.html'
            })
            .state('login', {
                url: '/login',
                templateUrl: partialsPath + 'accounts/login.html'
            });

        // $urlRouterProvider.otherwise('/');

        var errorInterceptor = ['$q', '$injector', function($q, $injector) {
            return {
                'responseError': function(rejection) {
                    if(rejection.status == 500) {
                        $injector.get('$state').transitionTo('error.servererror');
                    }
                    // rejection --- what an ugly word!
                    return $q.reject(rejection);
                }
            };
        }];

        $httpProvider.interceptors.push(errorInterceptor);
        $urlRouterProvider.otherwise('/');
    }
])

  app.constant('apiConstants', {

      localURL : 'http://api.easyreceipts.com/EasyReceipt/api'

  });
