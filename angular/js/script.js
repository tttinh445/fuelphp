var scotchApp = angular.module('scotchApp', ['ngRoute','ngAnimate',]);

// configure our routes
scotchApp.config(function($routeProvider) {
    $routeProvider
        // route for the home page
        .when('/', {
                templateUrl : 'pages/home.html',
                controller  : 'mainController'
        })

        // route for the about page
        .when('/about', {
                templateUrl : 'pages/about.html',
                controller  : 'aboutController'
        })

        // route for the contact page
        .when('/contact', {
                templateUrl : 'pages/contact.html',
                controller  : 'contactController'
        })
        
        .when('/login', {
                templateUrl : 'pages/login.html',
                controller  : 'mainController'
        });
});

// create the controller and inject Angular's $scope
scotchApp.controller('mainController', function($scope, $location, $http) {
    // create a message to display in our view
    $scope.message = 'Everyone come and see how good I look!';
    $scope.txtlogin = '';
    
    i = 0;
    
    username = 'abc';
    password = 'abc';
    
    $scope.login = function(){
        
        $http.post('login.php', { 'username': username, 'password': password }).
            success(function(data, status, headers, config){
                alert(data);
                if(data == 'success'){
                    $location.path('/login');
                }else{
                    $location.path('/contact');
                }
            }).
            error(function(data, status){

            })
    };
});

scotchApp.controller('aboutController', function($scope, $http) {
    $scope.message = 'Look! I am an about page.';
    $scope.datas = {};
    
    $scope.main = {
        page: 1,
        take: 2
    };
    
    $http.get('paging.php?page=' + $scope.main.page + '&take=' + $scope.main.take).success(function(data){
        // users from your api
        $scope.main.users = data.post;

        // number of pages of users
        $scope.main.pages = data.pages;
    });
    
    $scope.loadPage = function() {
        // You could use Restangular here with a route resource.
        $http.get('paging.php?page=' + $scope.main.page + '&take=' + $scope.main.take).success(function(data){
            // users from your api
            $scope.main.users = data.post;

            // number of pages of users
            $scope.main.pages = data.pages;
        });
    };
    
    $scope.nextPage = function() {
        if ($scope.main.page < $scope.main.pages) {
            $scope.main.page++;
            $scope.loadPage();
        }
    };

    $scope.previousPage = function() {
        if ($scope.main.page > 1) {
            $scope.main.page--;
            $scope.loadPage();
        }
    };
            
});

scotchApp.controller('contactController', function($scope, $http) {
    $scope.datas = {};
    $scope.message = 'Contact us! JK. This is just a demo.';
    $scope.textChange = function(){
        $scope.result = $scope.text;
    };
        
    $http.get('data.php').success(function(data, status, headers, config){
        //alert(data);
        $scope.datas = data;
    });

    $scope.formData = {};
    
    $scope.processForm = function(){
        
        //window.alert($scope.formData.name + ' - ' + $scope.formData.superheroAlias);
        
        // process the form    
        $http.post('process.php', { 'name': $scope.formData.name, 'alias': $scope.formData.superheroAlias, 'file': $scope.formData.file }).
        success(function(data, status, headers, config){
            alert(data);
            
            $http.get('data.php').success(function(data, status, headers, config){                
                $scope.datas = data;
            });
        }).
        error(function(data, status){
            
        })
    };
    
    $scope.clickDelete = function(item){
        $http.post('delete.php', { 'id': item.id }).
        success(function(data, status, headers, config){
            //alert(data);
            $scope.datas = data;
        }).
        error(function(data, status){
            
        })
    };
    
    $scope.clickUpdate = function(item){
        $scope.divEdit = true;
        $scope.formData.name = item.name;
        $scope.formData.id = item.id;
    }
    
    $scope.processEditForm = function(){
        //alert($scope.formData.id + ' - ' + $scope.formData.name);
        $http.post('update.php', { 'id': $scope.formData.id,'name': $scope.formData.name }).
        success(function(data, status, headers, config){
            //alert(data);
            $scope.datas = data;
            $scope.divEdit = false;
        }).
        error(function(data, status){
            
        })
    }    
  
});