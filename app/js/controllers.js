'use strict';

/* Controllers */

angular.module('myApp.controllers', [])
  .controller('LandingPageController', [function() {

  }])
  .controller('WaitlistController', ['$scope', 'authService', 'partyService', function($scope, authService, partyService) {
    authService.getCurrentUser().then(function(user) {
      if (user) {
        $scope.parties = partyService.getPartiesByUserId(user.id);
      }
    })

    $scope.newParty = {
      name: '',
      phone: '',
      size: '',
      status: ''
    };

    $scope.saveParty = function() {
      console.log($scope);
      partyService.saveParty($scope.currentUser.id, $scope.newParty);
      $scope.newParty = { name: '', phone: '', size: '', status: 'Waiting' };
    }

    $scope.updateParty = function(party, status) {
      party.status = status;
      partyService.updateParty($scope.currentUser.id, party, status);
    }

    $scope.removeParty = function(party) {
      partyService.removeParty($scope.currentUser.id, party);
    }
  }])
  .controller('AuthController', ['$scope', 'authService', function($scope, authService) {
    $scope.user = {
      email: '',
      password: ''
    };

    $scope.register = function() {
      authService.register($scope.user);
    };

    $scope.login = function() {
      authService.login($scope.user);
    };

    $scope.logout = function() {
      authService.logout();
    };
  }]);
