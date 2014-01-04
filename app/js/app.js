'use strict';


// Declare app level module which depends on filters, and services
angular.module('myApp', ['ngRoute', 'myApp.filters', 'myApp.services', 'myApp.directives', 'myApp.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {templateUrl: 'partials/home.html', controller: 'homeCtrl'});
    $routeProvider.when('/view/:id', {templateUrl: 'partials/view.html', controller: 'viewCtrl'});
    $routeProvider.when('/create', {templateUrl: 'partials/create.html', controller: 'createCtrl'});
    $routeProvider.when('/newReview/:id', {templateUrl: 'partials/newReview.html', controller: 'newReviewCtrl'});
    $routeProvider.when('/about', {templateUrl: 'partials/about.html', controller: 'aboutCtrl'});
    $routeProvider.when('/contact', {templateUrl: 'partials/contact.html', controller: 'contactCtrl'});
    $routeProvider.when('/more', {templateUrl: 'partials/more.html', controller: 'moreCtrl'});
    $routeProvider.otherwise({redirectTo: '/home'});
    
  }]);
