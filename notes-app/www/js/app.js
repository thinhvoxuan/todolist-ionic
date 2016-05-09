// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('starter', ['ionic', 'mynotes.notestores']);

app.controller('ListCtrl', function($scope, $state, NoteStore){
  $scope.reordering = false;
  $scope.notes = NoteStore.list();
  $scope.addNewNote = function(){
    $state.go('add');
  }
  $scope.delete = function(noteId){
    NoteStore.delete(noteId);
  }
  $scope.move = function(note, fromIndex, toIndex){
    NoteStore.move(note, fromIndex, toIndex)
  }
  $scope.toogleReOrder = function(){
    $scope.reordering = !$scope.reordering;
  }
})

app.controller('EditCtrl', function($scope, $state, NoteStore){
  $scope.title = "Edit Note";
  $scope.note = angular.copy(NoteStore.get($state.params.nodeId));
  $scope.saveNote = function(){
    NoteStore.update($scope.note);
    $state.go('list');
  }
});

app.controller('AddCtrl', function($scope, $state, NoteStore){
  $scope.title = "Add Note";
  $scope.note = {
    id: (new Date()).getMilliseconds(),
    title: '',
    description: ''
  };
  $scope.saveNote = function(){
    NoteStore.add($scope.note);
    $state.go('list');
  }
});

app.config(function($stateProvider, $urlRouterProvider){
    $stateProvider.state('list',{
      url: '/list',
      templateUrl: 'templates/list.html',
      controller: 'AddCtrl'
    });

    $stateProvider.state('edit', {
      url: '/edit/:nodeId',
      templateUrl: 'templates/edit.html',
      controller: 'EditCtrl'
    })

    $stateProvider.state('add', {
      url: '/add',
      templateUrl: 'templates/edit.html',
      controller: 'AddCtrl'
    })

    $urlRouterProvider.otherwise('/list');
});

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})
