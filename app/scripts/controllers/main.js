'use strict';

/**
 * @ngdoc function
 * @name PMS.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the PMS
 */
angular.module('PMS')
  .controller('MainCtrl', function ($scope, localStorageService, $http, taskService) {
    $scope.form = {};
    $scope.showAddTask = false;

    // when landing on the page, get all todos and show them
    $scope.getTasks = function() {
      taskService.get(function (data) {
        $scope.tasks = data;
      });
    };
    $scope.getTasks();

    // when submitting the add form, send the text to the node API
    $scope.addTask = function() {
      taskService.post($scope.form, function (data) {
        $scope.form = {}; // clear the form so our user is ready to enter another
        $scope.tasks.push(data);
      });
    };

    $scope.deleteTask = function(id, index) {
      taskService.delete(id, function() {
        $scope.tasks.splice(index, 1);
      });
    };

    $scope.setToDone = function(id, index, task) {
      task.done = !task.done;

      taskService.put(id, task, function(updatedRecord) {
        $scope.tasks[index].done = updatedRecord.done;
        console.log(updatedRecord);
      });
    };

    //var Task = $resource('/api/tasks/:id'),
    //    tasks = Task.query(function () {
    //      $scope.tasks = tasks;
    //    });
    //
    //$scope.addTask = function () {
    //  Task.save($scope.task).success(function () {
    //    debugger;
    //  });
    //};
    //
    //$scope.removeTask = function () {
    //};

    //$http.get('http://localhost:8000/api/books').
    //  then(function(response) {
    //    console.log(response);
    //    debugger;
    //    // this callback will be called asynchronously
    //    // when the response is available
    //  }, function(response) {
    //    console.log(response);
    //    debugger;
    //    // called asynchronously if an error occurs
    //    // or server returns response with an error status.
    //  });
    //var Entry = $resource('/api/books/:id');
    //
    ////var entry = Entry.get({id: $scope.id}, function() {
    ////  console.log('entry', entry);
    ////}); // get() returns a single entry
    //
    //var entries = Entry.query(function() {
    //  console.log(entries);
    //  $scope.books = entries;
    //}); //query() returns all the entries

    //var todosInStore = localStorageService.get('todos');
    //
    //$scope.todos = todosInStore || [];
    //
    //$scope.$watch('todos', function () {
    //  localStorageService.set('todos', $scope.todos);
    //}, true);
    //
    //$scope.addTodo = function () {
    //  $scope.todos.push($scope.todo);
    //  $scope.todo = '';
    //  console.log($scope.todos);
    //};
    //
    //$scope.removeTodo = function (index) {
    //   $scope.todos.splice(index, 1);
    //};
  });
