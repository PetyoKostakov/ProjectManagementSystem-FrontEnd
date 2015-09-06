'use strict';

/**
 * @ngdoc function
 * @name PMS.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the PMS
 */
angular.module('PMS')
  .controller('MainCtrl', function ($scope, taskService) {
    $scope.form = {};
    $scope.showAddTask = false;

    // when landing on the page, get all tasks and show them
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
      });
    };
  });
