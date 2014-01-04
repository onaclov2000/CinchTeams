
// http://onehungrymind.com/angularjs-sticky-notes-pt-1-architecture/
/* Controllers */

angular.module('myApp.controllers', ['firebase']).
  controller('homeCtrl', function($scope,$firebase, $log, $location) {
     var ref = new Firebase("https://cinchteams.firebaseio.com/names");
      $scope.names = $firebase(ref);
      $scope.create = function(e){
      $location.path('/create');
      }
  })
  .controller('viewCtrl', function($scope,$firebase,$routeParams, $location, $log) {
     var ref = new Firebase("https://cinchteams.firebaseio.com/" + $routeParams.id);
         $scope.person = $firebase(ref);
         $scope.id = $routeParams.id;  
         $scope.newReview = function(e) {
         $location.path('/newReview/' + $scope.id);
        };
  })
  .controller('createCtrl', function($scope,$firebase,$location,$log) {
         var ref = new Firebase("https://cinchteams.firebaseio.com/schools");
         var names = new Firebase("https://cinchteams.firebaseio.com/names");
         $scope.schools = $firebase(ref);
         $scope.names = $firebase(names);
         $scope.addPerson = function(e) {
         $log.log($scope.selectedSchool);
         $log.log($scope.firstname);
         $log.log($scope.lastname);
         var temp = $scope.names.$add({"firstname" : $scope.firstname, "lastname" : $scope.lastname, "school" : $scope.selectedSchool});
         var nameString = temp.name();
         var newName = new Firebase("https://cinchteams.firebaseio.com/" + nameString);
        newName.transaction(function(currentData) {
        if (currentData === null) {
               //$log.log(temp.name());
               return {nameString : {"firstname" : $scope.firstname, "lastname" : $scope.lastname, "school" : $scope.selectedSchool} };
        } else {
               console.log('User already exists.');
               return; // Abort the transaction.
        }
         
        });
        $log.log(nameString);
         $location.path('/view/' + nameString);
        };
  })
  .controller('newReviewCtrl', function($scope,$firebase,$routeParams,$log, $location) {
     var ref = new Firebase("https://cinchteams.firebaseio.com/" + $routeParams.id);
     var ref2 = new Firebase("https://cinchteams.firebaseio.com/" + $routeParams.id + "/responses");
     var d=new Date();     
      $scope.person = $firebase(ref);
         $scope.responses = $firebase(ref2.limit(10));
         $scope.id = $routeParams.id;
         
         $scope.submit = function(e) {
        //   if (e.keyCode != 13) return;
            $scope.responses.$add({"comment" : $scope.comment,
        "communication" : $scope.communication,
        "attitude" : $scope.attitude,
        "overall" : $scope.overall,
        "time" : $scope.time,
        "ease" : $scope.ease,
        "date": String(d.toUTCString())});
            $scope.msg = "";
            $log.log(String(d.toUTCString()));
            $location.path('/view/' + $scope.id);
        };
  })
  .controller('aboutCtrl', [function() {
  }])
  .controller('contactCtrl', [function() {
  }])
  .controller('moreCtrl', [function() {
  }]);
