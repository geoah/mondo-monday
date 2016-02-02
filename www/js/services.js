angular.module('app.services', [])

.service('ConfigService', function($ionicViewService, $location){
  // This is a hack for anyone that tries to checkout the code without having
  // a configuration file. Part 1.
  if (!window.config) {
    $ionicViewService.nextViewOptions({
      disableBack: true
    });
    $location.path('/error', true);
  }

  return window.config
})

.service('MondoService', function($http){
  var url = "https://api.getmondo.co.uk/";
  return {
    getAccounts: function() {
      return $http({method: 'GET', url: url+'accounts'});
    },
    getBalance: function(accountId) {
      return $http({method: 'GET', url: url+'balance?account_id='+accountId});
    },
    getFeed: function(accountId) {
      return $http({method: 'GET', url: url+'feed?account_id='+accountId});
    },
    getTransactions: function(accountId) {
      return $http({method: 'GET', url: url+'transactions?account_id='+accountId});
    },
    getTransaction: function(transactionId) {
      return $http({method: 'GET', url: url+'transactions/'+transactionId});
    },
    annotateTransaction: function(transactionId, metadataArray) {
      // TODO Serialize metadataArray
      return $http({method: 'PATCH', url: url+'transactions/'+transactionId});
    }
  }
})

.filter('money', function() {
  return function(input, currency) {
    if (!currency) {
      return '';
    }
    return (input/100).toLocaleString('en-US', { style: 'currency', currency: currency });
  };
})

.filter('categoryToText', function() {
  return function(input) {
    // TODO Not sure about how Mondo does this, is there a list out there?
    // Icons would be nice to have.
    switch (input) {
      // case 'eating_out': return 'Eating out'; break;
      default: return input.replace('_', ' ')
        .replace(/\w\S*/g, function(txt){
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        });
    }
  };
})

.filter('amCalendarDate', function() {
  return function(dt) {
    // By default moment calendar includes the time of the datetime.
    // We don't really need this for what we are currently doing.
    return moment(new Date(dt)).calendar(null, {
      lastDay: '[Yesterday]',
      sameDay: '[Today]',
      nextDay: '[Tomorrow]',
      lastWeek: '[Last] dddd',
      nextWeek: '[Next] dddd',
      sameElse: 'L'
    });
  }
})

.service('APIInterceptor', function($window, $localStorage, $timeout) {
  var service = this;
  service.responseError = function(response) {
    if (response.status === 401) {
      delete $localStorage.accessToken;
      $timeout(function(){
        $window.location = window.config.location;
      });
    }
    return response;
  };
})

;
