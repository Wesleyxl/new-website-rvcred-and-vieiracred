var app = angular
  .module('myapp', [
    'ui.router'
  ]);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'views/home.htm',
      controller: 'HomeController'
    })
    .state('about', {
      url: '/about',
      templateUrl: 'views/about.htm',
      controller: 'AboutController'
    })
    .state('contact', {
      url: '/contact',
      templateUrl: 'views/contact.htm',
      controller: 'ContactController'
    });

    // Utilizando o HTML5 History API
    // $locationProvider.html5Mode(true);

});