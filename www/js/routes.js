angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })
    .state('account', {
      url: '/account',
      templateUrl: 'templates/account.html',
      controller: 'accountCtrl'
    })
    .state('error', {
      url: '/error',
      templateUrl: 'templates/error.html',
      controller: 'errorCtrl'
    })
    ;

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
