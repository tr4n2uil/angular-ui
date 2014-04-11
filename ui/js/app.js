/**
 *	Angular UI Easy Notes Application
 *
 *	Vibhaj Rajan <vibhaj8@gmail.com>
 *
 *	Licensed under MIT License 
 *	http://www.opensource.org/licenses/mit-license.php
 *
**/

var APP = angular.module('APP', ['ngRoute', 'ngSanitize', 'Storage', 'DB'])

	.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider){

		$routeProvider
			//.when('/', {templateUrl: 'ui/tpl/home.html', controller: "init"})
			.when('/', {templateUrl: 'ui/tpl/storage.html', controller: 'book'})
			.when('/book/:id', {templateUrl: 'ui/tpl/storage.html', controller: 'book'});
		
		$httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
		$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

	}])

	.filter('reverse', function() {
		return function(items) {
			return items.slice().reverse();
		};
	})

	.controller('init', ['$scope', '$timeout', '$location', '$route', 'Storage', 'DB',
		function($scope, $timeout, $location, $route, Storage, DB) {
			$scope.minHeight=$(window).height()-3;
			$scope.headerURL = 'ui/tpl/header.html';
			$scope.footerURL = 'ui/tpl/footer.html';
			$scope.DB = DB;

			$scope.log = function(data){
				console.log(data);
				return true;
			}

			$scope.refresh = function(){
				$route.reload();
				return true;
			}

			$scope.newBook = function(){
				var book = { name: 'Untitled Notes' };
				DB.save( 'books', book );
				console.log( $scope.book );
				$location.path( '/book/' + book.id );
			}

			$scope.deleteBook = function( book ){
				DB.drop( 'book.'+ book.id +'.notes' );
				DB.remove( 'books', book );
				$location.path('/');
			}
		}
	])

	.controller('book', ['$scope', 'DB', '$routeParams', 
		function($scope, DB, $routeParams) {
			$scope.book = DB.get( $routeParams.id || 'easy-notes' );
			if( !$scope.book ){
				$scope.book = { name: 'Easy Notes' };
				DB.save( 'books', $scope.book, 'easy-notes' );
			}

			$scope.books = DB.query( 'books' );
			$scope.notes = DB.query( 'book.'+ $scope.book.id +'.notes' );
			$('#newnote').focus();
		}
	]);
