var APP = angular.module('APP', ['ngRoute', 'ngSanitize', 'Storage', 'DB'])

	.config(['$routeProvider', '$httpProvider', function($routeProvider, $httpProvider){

		$routeProvider
			//.when('/', {templateUrl: 'ui/tpl/home.html', controller: "init"})
			.when('/', {templateUrl: 'ui/tpl/storage.html', 
				controller: ['$scope', '$timeout', '$location', 'Storage', 'DB', function($scope, $timeout, $location, Storage, DB) {
					$scope.notes = DB.query( 'notes' );

					$scope.saveNote = function(){
						if($scope.newnote && $scope.newnote.data || false){
							DB.save( 'notes', $scope.newnote );

							$scope.notes.push($scope.newnote);
							$scope.newnote = {};
						}
					}

					$scope.removeNote = function(note, index){
						DB.remove( 'notes', note );
						$scope.notes.splice( index, 1 );
					}

					$('#newnote').focus();
				}]
			});
		
		$httpProvider.defaults.headers.post['Content-Type'] = 'application/json';
		$httpProvider.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';

	}])

	.filter('reverse', function() {
		return function(items) {
			return items.slice().reverse();
		};
	})

	.controller('init', ['$scope', '$timeout', '$location', 'Storage',

		function($scope, $timeout, $location, Storage) {
			$scope.minHeight=$(window).height()-3;
			$scope.headerURL = 'ui/tpl/header.html';
			$scope.footerURL = 'ui/tpl/footer.html';

			$scope.log = function(data){
				console.log(data);
				return true;
			}
		}

	]);
