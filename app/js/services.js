'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', [])
  .value('FIREBASE_URL', 'https://austin-angular-course.firebaseio.com/')
  .factory('dataService', function($firebase, FIREBASE_URL) {
    var dataRef = new Firebase(FIREBASE_URL);
    var fireData = $firebase(dataRef);

    return fireData;
  })
  .factory('authService', function($firebaseSimpleLogin, $location, $rootScope, FIREBASE_URL) {
    var authRef = new Firebase(FIREBASE_URL);
    var auth = $firebaseSimpleLogin(authRef);

    var authServiceObj = {
      register: function(user) {
        auth.$createUser(user.email, user.password).then(function(data) {
          console.log(data);
          authServiceObj.login(user);
        });
      },
      login: function(user) {
        auth.$login('password', user).then(function(data) {
          console.log(data);
          $location.path('/waitlist');
        });
      },
      logout: function() {
        auth.$logout();
        $location.path('/');
      },
      getCurrentUser: function() {
        return auth.$getCurrentUser();
      }
    };

    $rootScope.$on("$firebaseSimpleLogin:login", function(e, user) {
      $rootScope.currentUser = user;
    });

    $rootScope.$on("$firebaseSimpleLogin:logout", function() {
      $rootScope.currentUser = null;
    });

    return authServiceObj;
  })
  .factory('partyService', function(dataService) {
    var users = dataService.$child('users');

    var partyServiceObj = {
      saveParty: function(userId, party) {
        users.$child(userId).$child('parties').$add(party);
      },
      updateParty: function(userId, party) {
        users.$child(userId).$child('parties').$save(party.$id);
      },
      removeParty: function(userId, party) {
        users.$child(userId).$child('parties').$remove(party.$id)
      },
      getPartiesByUserId: function(userId) {
        return users.$child(userId).$child('parties');
      }
    };

    return partyServiceObj;
  });
