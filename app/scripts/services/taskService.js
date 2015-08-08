/**
 * Created by Petyo on 8/7/2015.
 */
angular.module('PMS')
  .factory('taskService', function ($http) {
    console.log('stask service');
    return {
      get: function (cb) {
        $http.get('/api/tasks')
          .success(function (data) {
            cb(data);
          })
          .error(function (err) {
            console.log('Error: ' + err);
          });
      },
      post: function (formData, cb) {
        $http.post('/api/tasks', formData)
          .success(function (data) {
            cb(data);
          })
          .error(function (data) {
            console.log('Error: ' + data);
          });
      },
      put: function (id, updateData, cb) {
        $http.put('/api/tasks/' + id, updateData)
          .success(function (data) {
              cb(data);
          });
      },
      delete: function (id, cb) {
        $http.delete('/api/tasks/' + id)
          .success(function (data) {
            cb && cb(data);
          })
          .error(function(data) {
            console.log('Error: ' + data);
          });
      }
    }
  });
