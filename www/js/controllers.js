angular.module('app.controllers', [])

.controller('loginCtrl', function($scope, $state, $http, $localStorage, $httpParamSerializer, $window, $timeout, $localStorage, ConfigService) {
  var authUrl = 'https://auth.getmondo.co.uk/'
    +'?client_id='+ConfigService.clientId
    +'&redirect_uri='+ConfigService.callback
    +'&response_type=code'
    +'&state=jjHwiXGC7zSIa0sUhN0U';

  $scope.login = function() {
    if ($window.cordova) {
      var ref = $window.open(authUrl, '_blank', 'location=no');
      ref.addEventListener('loadstart', function(event) {
        if((event.url).startsWith(ConfigService.callback)) {
          var code = (event.url).split("code=")[1];
          ref.close();
          // TODO Use current location
          $window.location = ConfigService.location+'?code='+code;
          return
        }
      });
    } else {
      $window.location = authUrl;
      return
    }
  }

  if ($localStorage.accessToken) {
    $state.go('account', {}, {reload: true});
    return
  }

  var search = queryString.parse(location.search);
  if (search.code) {
    $scope.gotCode = true;
    var params = {
      grant_type: 'authorization_code',
      client_id: ConfigService.clientId,
      client_secret: ConfigService.clientSecret,
      code: search.code,
      redirect_uri: ConfigService.callback
    };
    $http({
      method: 'POST',
      url: ConfigService.url+'/oauth2/token',
      headers: {'Content-Type': 'application/x-www-form-urlencoded'},
      transformRequest: function(obj) {
          var str = [];
          for(var p in obj) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          }
          return str.join("&");
      },
      data: params
    }).then(function(response) {
      $localStorage.accessToken = response.data.access_token;
      $timeout(function(){
        // We redirect to get rid of the code param in the url.
        window.location = ConfigService.location+'#/account?access_token='+response.data.access_token;
      });
    })
    // TODO Error
  }
})

.controller('accountCtrl', function($scope, $window, $rootScope, $location, $state, $http, $localStorage, $timeout, ConfigService, MondoService) {
  if (!$localStorage.accessToken) {
    $state.go('login', {}, {reload: true});
    return
  }

  // TODO Switch to ng-load
  $scope.loading = true;

  $rootScope.reload = function() {
    $state.go($state.current, {}, {reload: true});
  }

  // TODO Move this to a service or configuration step
  $http.defaults.headers.common['Authorization'] = 'Bearer '+$localStorage.accessToken;

  var accountId;
  MondoService.getAccounts().then(function(response) {
    $scope.accounts = accounts = response.data.accounts;
    accountId = accounts[0].id;
    MondoService.getFeed(accountId).then(function(response) {
      $scope.feed = feed = response.data.items;
      $scope.loading = false;
    }, function(response) {
      $scope.error = response.data;
      $scope.loading = false;
    });
  }, function(response) {
    $scope.error = response.data;
    $scope.loading = false;
  });

  $scope.refresh = function() {
    MondoService.getFeed(accountId).then(function(response) {
      $scope.feed = feed = response.data.items;
      $scope.$broadcast('scroll.refreshComplete');
    }, function(response) {
      $scope.error = response.data;
      $scope.$broadcast('scroll.refreshComplete');
    });
  };

  $scope.logout = function() {
    delete $localStorage.accessToken;
    $timeout(function(){
      $window.location = ConfigService.location;
    });
  }
})

.controller('errorCtrl', function($scope, $window) {
  // This is a hack for anyone that tries to checkout the code without having
  // a configuration file. Part 2.
  // TODO Rename/Move/Do something better.
  $scope.reload = function() {
    $window.location = ConfigService.location;
  }
})
