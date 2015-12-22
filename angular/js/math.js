angular.module('Math', []).controller('MathController', ['$scope', function($scope) {
        $scope.total = 0;

        $scope.addTodo = function() {
            $scope.todos.push({text:$scope.todoText, done:false});
            $scope.todoText = '';
        };       

        $scope.Calculate = function() {
            var soa = $scope.soa;
            var sob = $scope.sob;
            var total = parseInt(soa) + parseInt(sob);
            $scope.total = total;
        };
    }]
);

